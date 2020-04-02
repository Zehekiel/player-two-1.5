var express = require('express');
var router = express.Router();
var userModel = require("../Models/Users")
var gameModel = require("../Models/Games")
var wishModel = require("../Models/Wishs")
var plateformModel = require("../Models/Plateforms")
var teamModel = require("../Models/Teams")
const request = require('sync-request')
var cheerio = require('cheerio');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/ScreenHome', { title: 'Express' });
});




// ______________ PLATEFORMS ______________ (ok)
//ajout de plateform (use postman)
router.post('/plateform', async function(req, res, next) {
  console.log("req body plateform ",req.body);
  var newPlateform = await new plateformModel ({
    plateform:   req.body.plateform,
    img:         req.body.img,
    service:     req.body.service,
  });
  
  await newPlateform.save(function(error, plateform){
    if (error){
      console.log("err",error);
      res.json({error})
    } else if (plateform){
      console.log(plateform);
      res.json({plateform})
    }
  });
});

//envoi Plateform au front
router.get('/plateform', async function(req, res, next) {
  var plateform = await plateformModel.find()
  res.json(plateform)
});

//chercher quel service/image correspond à la plateforme sélectionné en front 
router.post('/service', async function(req, res, next) {
  console.log("req body service", req.body);
  
  var findPlateform = await plateformModel.findOne({plateform: req.body.plateformSelect})
  //puis le renvoyé au front
  res.json(findPlateform)
});



// ______________ ADD GAME ______________
router.post('/addgame', async function(req, res, next) {
  console.log("reqbody addgame",req.body);

  var serviceListUserCopy = []
  var gameListUserCopy = []
  var errorMessage = []

  //trouver le joueur qui a ajouté le jeux
  var userLog= await userModel.findOne({token: req.body.token })
  console.log("userlog token" ,userLog); 
  if (userLog){
    var serviceListUserCopy = userLog.service;
    var gameListUserCopy = userLog.idGame
  }  

  // trouver un jeux qui correspond à celui sélectionner en Front
  var gameExist = await gameModel.findOne({plateforme: req.body.plateform, name: req.body.name})
  
  //____ plateform & game ____
  //vérifier si champs vide plateform et name sont vide
  if(req.body.plateform==""||req.body.name==""){
    errorMessage.push(" plateform OU game vide")
    res.json(errorMessage)
  
  // //si pas de champs vide, ajouter un jeux dans DBA si n'existe pas
  } else if (!gameExist) {
    
    var newGame = await new gameModel ({ 
    plateforme:   req.body.plateform,
    name:         req.body.name,
    cover:        req.body.cover,
    count:        1
  });
  await newGame.save(async function(error, game){
    if (error){
      console.log("err",error);
      res.json({error})
    
  // si bien ajouter, attacher idgame au User
    } else if (game){
      gameListUserCopy.push(game._id)
      var addGameToUser = await userModel.updateOne({token: req.body.token }, {
        idGame: gameListUserCopy
      })
      var result = true
      res.json({result})
    }
  });
  //si le jeux existe déjà en DBA
  }else{
    var idGameUserExist = false

  // vérifier si jeux existe déjà chez l'User
    for(let i=0; i<gameListUserCopy.length; i++){
      if (gameListUserCopy[i].equals(gameExist._id) /*pas de = car des ID*/ ){
        idGameUserExist = true
      } 
    }

  // si non, on attache l'id à l'utilisateur
    if(idGameUserExist == false){
      gameListUserCopy.push(gameExist._id)
      var addGameToUser = await userModel.updateOne( {token: req.body.token }, {
      idGame: gameListUserCopy
      })
      console.log("addGameToUser ",addGameToUser);

      //ajouter +1 au count 
      var copyCountGameExist = gameExist.count;
      copyCountGameExist = copyCountGameExist + 1;
      var addNewCount = await gameModel.updateOne({_id: gameExist._id}, {count: copyCountGameExist})
      console.log("addNewCount", addNewCount);
      
      var result= true
      res.json(result)
    }
    
  };



  //____ Service & Tag ____
  console.log("service - tag ",req.body.service," - " ,req.body.tag );
  
  var serviceUserExist = false
  var tagUserExist = false
  //vérifier si user à déjà un service ataché
  console.log("serviceListUserCopy[0].service", serviceListUserCopy);
  
  for(let i=0; i<serviceListUserCopy.length; i++){
        if (serviceListUserCopy[i].service == req.body.service){
          serviceUserExist = true
        }
      }
      for(let i=0; i<serviceListUserCopy.length; i++){
        if (serviceListUserCopy[i].tag == req.body.tag){
          tagUserExist = true
        }
      }

  console.log("serviceUserExist ",serviceUserExist);
  console.log("tagUserExist ", tagUserExist);
  //vérifier si champs vide
  if(req.body.service=="..." || req.body.tag==""){
    console.log("serviceListUserCopy champs vide",serviceListUserCopy);
    res.json({error: " SERVICE ou TAG vide"})

  //si pas de champs vide, ajouter un service+tag dans DBA si n'existe pas
  } else if (!serviceUserExist) {
    serviceListUserCopy.push({service:req.body.service, tag: req.body.tag})
    var addServiceToUser = await userModel.updateOne( {token: req.body.token }, {
    service: serviceListUserCopy
    })
    result = true
    console.log("addServiceToUser", addServiceToUser);
    res.json(result)
  } else if (tagUserExist && serviceUserExist){
    result = true
    res.json(result)
  }   else { 
    result= false
    res.json({ error: 'déjà un identifiant service'})
  } 
});



//API IGBD
router.post('/searchgame', async function(req, res, next) {

// tableau d'ID Igbd par plateforme
  var PlatformFromId = [
    {name:"Playstation 3", id: 9},
    {name:"Playstation 4", id: 48},
    {name:"Playsation 5", id: 167},
    {name:"Xbox 360", id: 12},
    {name:"Xbox One", id: 49},
    {name:"Xbox Series X", id: 169},
    {name:"Nintendo Switch", id: 49},
    {name:"Nintendo DS", id: 20},
    {name:"PC", id: 6}
  ]

  // trouver une concordance entre la plateforme choisi en front et la plateforme chez IGBD qui se fait par un ID
  var idPlatform = "";
  for (let platform of PlatformFromId){
    if (platform.name == req.body.plateforme){
      idPlatform = platform.id
    }
  }
  //AXIOS
  const axios = require('axios').default;

  const API_KEY = "ac88a62afeaf7bb87d3575ea917f9d91";

  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': API_KEY,
    }
  }

  async function getGames(gameName) {
    const config = header;
    config.data = `
      search "${req.body.searchGame}";
      limit 20;
      fields name,genres,cover,rating,url,cover.url, platforms, category;
      where category = 0 & version_parent = null; 
    `;

    try {
      const response = await axios("https://api-v3.igdb.com/games", config);
      var searchGameList = await response.data
      gameWithPlatform= [];
      gameMatchIdPlatform= [];

      // push dans un tableau game avec une plateforme
      for (let game of searchGameList){
        console.log(game.name);
        console.log(game.platforms);
        if (game.platforms !== undefined){
          gameWithPlatform = [...gameWithPlatform, game]
        } 
      }

      // push dans un nouveau tableau ceux qui correspondent à la plateforme sélectionné en front
      for(let game of gameWithPlatform){
        if(game.platforms.indexOf(idPlatform)!== -1){
          gameMatchIdPlatform = [...gameMatchIdPlatform, game]
        }
      }  
      res.json(gameMatchIdPlatform)
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
  getGames(req.body.searchGame)
  
});



// ________ FIND A MATCH ________
router.post('/findmatch', async function(req, res, next) {
  console.log("req body findmatch", req.body);
  var error =[]
  var userFind = await userModel.findOne({token:req.body.token})

  // trouver les joueurs qui ont au moins un jeux en commun (pas de doublon)
  var matchList = await userModel.find({token: {$ne : req.body.token}, idGame:{ $in : userFind.idGame} }).populate('idGame')
  //supprimer dans la matchList les jeux qui ne sont pas en commun
  for (var y = 0;  y<matchList.length; y++ ){
    for (var z = matchList[y].idGame.length-1;  z>=0; z-- ){
      for (var x = matchList[y].idGame[z].length-1;  x>=0; x-- ){
        if (userFind.idGame.indexOf(matchList[y].idGame[z]._id) === -1 ){
          matchList[y].idGame.splice(z, 1)
        }
      }
    }  
  }

  console.log("matchList.length", matchList.length);
  
  if(matchList.length>0){
    res.json({matchList}) 
  } else {
    error.push("pas de match")
    res.json({matchList, error})
  }

  
})



// AJOUTER UN MATCH
router.post('/addMatch', async function(req, res, next) {
  console.log(req.body.idP2);
  console.log(req.body.token);
  var error = []
  var result

  var userFind = await userModel.findOne({token: req.body.token})
  var matchFind = await userModel.findById(req.body.idP2)
  // console.log("userFind ", userFind);
  // console.log("matchFind ", matchFind);
  
  if (userFind.playerTwo.indexOf(req.body.idP2)== -1){
    //ajoute un ObjectID P2 chez userFind
    copyPlayerTwo = userFind.playerTwo
    // console.log('copyPlayerTwo', copyPlayerTwo);
    copyPlayerTwo.push(req.body.idP2)
    var addP2ToUser = await userModel.updateOne( {token: req.body.token}, 
      {playerTwo: copyPlayerTwo}
    )
    console.log("addP2ToUser ",addP2ToUser);

    if(addP2ToUser){
      result = true
      error.push("ajouté dans la DBA")
      res.json({result , error});
    } 
  }else {
    result = true
    error.push("déjà ajouté dans la DBA")
    res.json({result , error})
    
  }
})



  router.post('/addAllMatch', async function(req, res, next) {
    console.log(req.body);
    var error = []
    var result
    res.json(req.body)
    // var userFind = await userModel.findById(req.body.userId)
    // var matchFind = await userModel.findById(req.body.idP2)
    // console.log("userFind ", userFind);
    // console.log("matchFind ", matchFind);
    
    // if (userFind.playerTwo.indexOf(req.body.idP2)== -1){
    //   result = true
    //   error.push("déjà ajouté dans la DBA")
    //   res.json({result , error})
    // }else {
    //   //ajoute un ObectID P2 chez userFind
    // copyPlayerTwo = userFind.playerTwo
    // console.log('copyPlayerTwo', copyPlayerTwo);
    // copyPlayerTwo.push(req.body.idP2)
    // var addP2ToUser = await userModel.updateOne( {_id:req.body.userId}, {
    //   playerTwo: copyPlayerTwo
    // })
    // console.log("addP2ToUser ",addP2ToUser);
  
    // if(addP2ToUser){
    //   result = true
    //   error.push("ajouté dans la DBA")
    //   res.json({result , error});
    // } 
  })



  // TOP 5  DES JEUX PRISEE SUR P2
  router.get('/top5fromP2', async function(req, res, next) {
    // Récupérer les jeux qui ont un count > 1
    var allGame = await gameModel.find({count: {$gte: 1}})

    // trier par ordre décroissant
    var top5 = allGame.sort(function(a, b) {
      return b.count -a.count ;
    });
    
  res.json(top5)
  })

    
  




module.exports = router;





//route /screenuser pour afficher le profil de l'utilisateur
//rouger.get('/screenUser', function(req,res,next){
//aller chercher l'avatar de l'utilisateur (pas stocké en base de donnée pour le moment), son 'pseudo', la liste de 'playerTwo',
//sa liste de jeux 'idGame'
//aller chercher la liste des ID des jeux de l'utilisateur et les stocker dans un tableau

//pour la liste de PlayerTwo, chercher l'avatar, le pseudo, leur liste 'idGame'

// res.json('screenUser')
// })




// ______________ TEAMS ______________
// router.post('/addteam', async function(req, res, next) {
//   console.log("req body addteam",req.body);
  
//   var newTeam = new teamModel ({
//     idGame:       req.body.idGame,
//     idWish:       req.body.idWish,
//     name:         req.body.name,
//     avatar:       req.body.avatar,
//     philosophie:  req.body.philosophie,
//     description:  req.body.description,
//     admin:        req.body.admin,
//     sousadmin:    req.body.sousadmin,
//     regular :     req.body.regular,
//     actu:         req.body.actu,
//   });
  
//   newTeam.save(function(error, team){
//     if (error){
//       console.log("err",error);
//       res.json({error})
//     } else if (team){
//       console.log(team);
//       res.json({team})
//     }
//   });
// });

// ______________ WISHS ______________
// router.post('/addwish', async function(req, res, next) {
//   console.log("req body wish ",req.body);
  
//   var newWish = await new wishModel ({
//     plateforme:     req.body.plateforme,
//     mode:           req.body.mode,
//     age:            req.body.age,
//     disponibility:  req.body.disponibility,
//     sexe:           req.body.sexe,
//     langue:         req.body.langue,
//     team :          req.body.team,
//     idGame:         req.body.idGame
//   });
  
//   await newWish.save(function(error, wish){
//     if (error){
//       console.log("err",error);
//       res.json({error, result: false})
//     } else if (wish){
//       console.log(wish);
//       res.json({wish, result: true})
//     }
//   });
// });

//TESTS
  // let newMatchList = [...new Set(matchList._id)]
  // console.log("SET... ", newMatchList) 
  // console.log("SET.length ", newMatchList.length) 
  // console.log(matchList.find(matchList._id == matchList._id));

  // var match = {}
  // var matchList = []
  // var matchListId= []
  // var matchListGame= []

  //pour chaque jeux/plateforme d'un user; je veux vérifier dans tous les utilisateurs si quelqu'un à le même jeux
  // for (var k = 0;  k<userFind.idGame.length; k++ ){
  //   var match = await userModel.find({_id: {$ne : req.body.userId}, idGame: userFind.idGame[k] })
    
  //   if (match.length !== 0 && matchList.length == 0){
  //     console.log("match._id",match[0]._id);
  //     matchListId = match[0]._id;
  //     console.log("matchListId",matchListId);
      
  //     console.log("userFind.idGame[k] ",userFind.idGame[k]);
  //     matchListGame = userFind.idGame[k];
  //     console.log("matchListGame",matchListGame);

  //     matchList = Array.prototype.push.apply(matchListId, matchListGame)
  //     console.log("matchList", matchList);
      
  //   }else if ( match.length > 1) {
  //     for (var o =0; o<match.length; o++){
  //       var matchList = [...matchList, match[o]]
  //     }
  //   }
  // }

   //tentative AGGREGATE
// var aggregate = userModel.aggregate();
// aggregate.match({"idGame": userFind.idGame, })
// console.log("aggregate",aggregate);

// aggregate.group({ _id : "$idGame", });
// var data = await aggregate.exec();
// console.log("data", data);


  //TROUVER via IDGAME les jeux en communs de tous Matchs
  // for(var i = 0; i<matchList.length; i++){
  //   for(var j=0; j<matchList[i].idGame.length; j++)
  //   // console.log(matchList[i].idGame[j]);
  //   var findGames = await gameModel.find(matchList[i].idGame[j])
  //   findGames = findGames.sort()
  // }


  //pour chaque jeux/plateforme d'un user; je veux vérifier dans tous les utilisateurs si quelqu'un à le même jeux
  // for (var k = 0;  k<userFind.idGame.length; k++ ){
  //   var match = await userModel.find({_id: {$ne : req.body.userId}, idGame: userFind.idGame[k] })
  //   if (match.length !== 0 && matchList.length == 0){
  //     matchList = match
  //   }else if ( match.length > 1) {
  //     for (var o =0; o<match.length; o++){
  //       var matchList = [...matchList, match[o]]
  //     }
  //   }
  // }

  // EVITER les DOUBLONS
  // var sortmatchlist =  matchList.sort()
  // var matchpush =[]

  // if(sortmatchlist.length>1){
  //   for (let a = 0; a < sortmatchlist.length; a++){ 
  //     if(sortmatchlist[a+1]){
  //     }
  //     if(!sortmatchlist[a+1] || !sortmatchlist[a]._id.equals(sortmatchlist[a+1]._id)){
  //       matchpush.push(sortmatchlist[a])
  //     }
  //   }    
  // }
  // console.log("matchpush", matchpush.length);



  //TEST FIN