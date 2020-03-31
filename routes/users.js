var express = require('express');
var router = express.Router();

var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var userModel = require("../Models/Users");
var gamesModel = require("../Models/Games");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// _____________________ SIGN UP (inscription) _____________________
router.post('/adduser', async function(req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const pseudoExists = await userModel.findOne({
    pseudo: req.body.pseudoFromFront
  })

  if(pseudoExists != null){
    error.push('Pseudo déjà présent')
  }

  const emailExists = await userModel.findOne({
    mail: req.body.mailFromFront
  })

  if(emailExists != null){
    error.push('Email déjà présent')
  }

  if(req.body.pseudoFromFront == ''
  || req.body.mailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Champs vides')
  }

  if(req.body.passwordFromFront.length<5){
    error.push('le mot de passe doit contenir au moins 6 caractères')
  }

  if(error.length == 0){
    var salt = uid2(32)
    var newUser = new userModel({
      pseudo:       req.body.pseudoFromFront,
      password :    SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      mail:         req.body.mailFromFront,
      birthday:     req.body.birthdayFromFront,
      CP:           req.body.cpFromFront,
      sexe:         req.body.sexeFromFront,
      langue:       req.body.langueFromFront,
      avatar:       req.body.avatarFromFront,
      salt :        salt,
      token:        uid2(32)
    })

    const saveUser = await newUser.save()

    if(saveUser){
      result = true
      token = saveUser.token
    }
  }
  
  res.json({result, saveUser, error, token});
});


// _____________________ SIGN IN (connexion) _____________________
router.post('/connection', async function(req, res, next) {

  var error = []
  var result = false
  var pseudoExists = null
  var emailExists = null
  var token = null

  if(req.body.pseudoFromFront == ''
  || req.body.mailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Champs vides')
  }

  if(error.length == 0){
      const pseudoExists = await userModel.findOne({
      pseudo:      req.body.pseudoFromFront,
    })
      const emailExists = await userModel.findOne({
      mail:        req.body.mailFromFront,
    })

    if(pseudoExists){
      const passwordEncryptFromPseudo = SHA256(req.body.passwordFromFront + pseudoExists.salt).toString(encBase64)
      if(passwordEncryptFromPseudo == pseudoExists.password){
        result = true
        token = pseudoExists.token
      } else {
        result = false
        error.push('Mot de passe incorrect')
      }
    } else if(emailExists){
      const passwordEncryptFromEmail = SHA256(req.body.passwordFromFront + emailExists.salt).toString(encBase64)
      if(passwordEncryptFromEmail == emailExists.password){
        result = true
        token = emailExists.token
      } else {
        result = false
        error.push('Mot de passe incorrect')
      }
    } else {
      error.push("Email ou pseudo invalide")
    }
  }
  res.json({result, pseudoExists, emailExists, error, token,});
});



// _____________________ LOG OUT (déconnexion) _____________________
router.get('/logout', function(req, res, next) {
  res.json('logout OK');
});



// _____________________ FIND a User _____________________
router.post('/finduser', async function(req, res, next) {
  console.log("req.body finduser", req.body);
  var userFind = await userModel.findOne({token: req.body.token}).populate("idGame").exec()
  var playerTwo = await userModel.find({_id: userFind.playerTwo}).populate("idGame").exec()
  res.json({userFind, playerTwo})
});



// TROUVER un P2
router.post('/findP2', async function(req, res, next) {
  console.log("req.body findP2", req.body);
  if(req.body){
    var userFind = await userModel.findById(req.body.P2Id).populate("idGame").exec()
  console.log('P2 FIND _______', userFind);
    res.json(userFind)
  }
});



// suppr un jeux de la liste user
router.post('/supprGame', async function(req, res, next) {
  console.log("reqbody supprgame", req.body);

  var userFind = await userModel.findOne({token: req.body.token})
  console.log("userFind",userFind);
  
  var copyIdGame= userFind.idGame
  console.log("copyIdGame ",copyIdGame);

  for (var i=0; i<copyIdGame.length; i++){
    if (userFind.idGame[i]._id == req.body.gameId){
      copyIdGame.splice(i,1)
    }
  }
  console.log("copyIdGame après",copyIdGame);

  var supprGameToUser = await userModel.updateOne({token: req.body.token }, {
    idGame: copyIdGame
  })
  var userFind2 = await userModel.findOne({token: req.body.token})
  res.json(userFind2)
})



// suppr un P2 de la liste user
router.post('/supprP2', async function(req, res, next) {
  //trouver l'utilisateur
    var userFind = await userModel.findOne({token: req.body.token})
  //copier son tableau de playerTwo pour pouvoir le modifier
    var copyPlayerTwo = userFind.playerTwo
  //trouver le P2 que l'user veut supprimer
    for (var l=0; l<copyPlayerTwo.length; l++){
      if (userFind.playerTwo[l]._id == req.body.p2){
      //et le supprimer de la copy
        copyPlayerTwo.splice(l,1)
      }
    }
  // update playerTwo chez le bon user
    var supprP2ToUser = await userModel.updateOne({token: req.body.token }, {
      playerTwo: copyPlayerTwo
    })
  //renvoyé l'user au front après l'update
    var userFind2 = await userModel.findOne({token: req.body.token})
  
  res.json(userFind2)
})



// SUPPRIMER un GAME
router.post('/supprGame', async function(req, res, next) {
  var userFind = await userModel.findOne({token: req.body.token})
  var copyIdGame= userFind.idGame
  for (var i=0; i<copyIdGame.length; i++){
    if (userFind.idGame[i]._id == req.body.gameId){
      copyIdGame.splice(i,1)
    }
  }
  var supprGameToUser = await userModel.updateOne({token: req.body.token }, {
    idGame: copyIdGame
  })
  var userFind2 = await userModel.findOne({token: req.body.token})
  res.json(userFind2)
})



// MODIFIER les informations
router.post('/usermanager', async function(req, res, next) {
  console.log("req.body userManager ", req.body);
  var error = []
  var success = []
  

  //trouver l'utilisateur
  var userFind = await userModel.findOne({token: req.body.token})
  console.log("userFind usermanager",userFind);
  
  console.log("req.body.pseudoFromFront", req.body.pseudoFromFront);
  console.log("userFind Pseudo usermanager",userFind.pseudo);
  //Vérifier s'il veut changer son pseudo
  if(req.body.pseudoFromFront !== ''){
    //vérifier que ce nouveau pseudo n'est pas déjà utilisé
    var pseudoExists = await userModel.findOne({pseudo: req.body.pseudoFromFront })
    console.log("pseudoExists", pseudoExists);
    
    //si oui, le modifier
    if(!pseudoExists){
      await userModel.updateOne({token: req.body.token }, {
      pseudo: req.body.pseudoFromFront
    })
    success = [...success, "pseudo modifié"]
    // sinon envoyer un message d'erreur
    } else {
      error=[...error, "pseudo déjà existant"]
    }
  }

    //Vérifier s'il veut changer son mail
    if(req.body.mailFromFront !==""){
      //vérifier que ce nouveau mail n'est pas déjà utilisé
      var mailExists = await userModel.findOne({mail: req.body.mailFromFront })
      //si oui, le modifier
      if(!mailExists){
        await userModel.updateOne({token: req.body.token }, {
          mail: req.body.mailFromFront
      })
      success = [...success, "mail modifé"]
      // sinon envoyer un message d'erreur
      } else {
        error=[...error, "mail déjà existant"]
      }
    }

    //Modifier le mot de passe
    if (req.body.passwordFromFront !== ''){
      if(req.body.passwordFromFront.length<5){
      error.push('le mot de passe doit contenir au moins 6 caractères')
      }else {
        await userModel.updateOne({token: req.body.token }, {
          password:  SHA256(req.body.passwordFromFront+ userFind.salt).toString(encBase64),
      })
        success= [...success, 'mot de passe modifié']
      }
    } 

    //Modifier le CP
    if (req.body.cpFromFront !==''){
      await userModel.updateOne({token: req.body.token }, {
        CP:  req.body.cpFromFront,
    })
    success= [...success, 'Code Postal modifié']
    }

    //modifier l'avatar
    if (req.body.avatarFromFront.length>0){
      await userModel.updateOne({token: req.body.token }, {
        avatar:  req.body.avatarFromFront,
    })
    success= [...success, 'avatar modifié']
    }

  userFind = await userModel.findOne({token: req.body.token})
  res.json({userFind, error, success})
})



// // SUPPRIMER le compte de l'utilisateur
// router.post('/usermanager', async function(req, res, next) {
//   console.log("req.body userManager ", req.body);
  
//   //trouver l'utilisateur
//     var userFind = await userModel.findOne({token: req.body.token})
  
//   res.json()
// })

module.exports = router;
