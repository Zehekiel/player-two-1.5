import React,{useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Col, Row, CardTitle,CardImg, CardText,CardSubtitle, CardBody, Container,
Table,  Form, FormGroup, Label, Input, Button,
ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Card, Modal,} from 'react-bootstrap'  ; 
import 'bootstrap/dist/css/bootstrap.min.css';
import threeDots from '../images/three_dots.svg';
import { connect } from 'react-redux';


//---------- MODAL  Mon actualité ----------//
function ArticlesModal(props) {

  const [articlesList, setArticlesList] = useState ([])

  useEffect(() => {

    const findArticle = async () => {
      const data = await fetch('/myArticles')
      const body = await data.json()
      setArticlesList(body.myArticles)
    }
    findArticle()
  }, [props.tokenToDisplay, props])

  var cardArticle = articlesList.map((article,i) => {
    return (
      <div key={i} style={{padding:5, color: 'white', backgroundColor: '#010212', borderBottom: "1px solid #A58CA3", borderTop: "1px solid #A58CA3", margin: 0}}>
          <a href={article.link} style={{display: "flex", textDecoration: "none"}}>
            <img width="30%" src={article.image} style={{borderRadius: "10px"}} alt="article"/>
            <div style={{alignSelf: "center"}}>
              <p style={{marginLeft: 35, color: 'white'}}>{article.title}</p>
              <p style={{marginLeft: 35, marginBottom: 0, color: 'white'}}>{article.subTitle}</p>
            </div>
          </a>
      </div>

    )
  })

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)",}}
              >
      <Modal.Header style={{backgroundColor: '#010212'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212', justifyContent: 'center' }}>
        Actualité des jeux vidéo
        </Modal.Title>
        <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0,}} onClick={props.onHide}> 
          <img src={require('../images/cross_modal.svg')} alt="modal cross"/>
        </Button>
      </Modal.Header>
      <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>

        {cardArticle}

      </Modal.Body>
      <Modal.Footer style={{color: 'white', backgroundColor: '#010212'}}>
      </Modal.Footer>
    </Modal>
  );
}
//---------- FIN MODAL Mon actualité ----------//



function ScreenUser(props) {
  //info user
    const [user, setUser]= useState('')
    const [pseudo, setPseudo] = useState("")
    const [userGamesList, setUserGamesList] = useState([])
    // const [description, setDescription] = useState([])
    const [playerTwo, setPlayerTwo] = useState([])
    const [avatar, setAvatar]= useState(require("../images/P1.svg"))
    const [newAvatar, setNewAvatar] = useState('')
    // const [token, setToken]= React.useState("VTfCgktjclTvW1V0UR6vOdeRYVKs0IPq") /*redux15 */
    const [mail, setMail] = useState("")
    const [CP, setCP] = useState("")
    const [myArticlesList, setMyArticlesList] = useState ([])
    const [token, setToken]= useState('')
  //modals
    const [newsModalShow, setNewsModalShow] = React.useState(false);
    const [userManagementModal,setuserManagementModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false);
    const [modalAvatar, setModalAvatar] = React.useState(false);
    const [closeAll, setCloseAll] = useState(false);
  //Listes
    const [listSuccess, setListSuccess] = useState([])
    const [listErrors, setListErrors] = useState([])


  //la fonction d'appel MongoDB pour les UserData
  useEffect(() => {

  //vérifier si User est connecté (store Redux)
  if(props.tokenToDisplay){
    
    console.log('tokenToDisplay token', props.tokenToDisplay);
    setToken(props.tokenToDisplay)
    console.log('token', token);
      
      //si oui récupérer ses info dans DBA
      async function userData(){
        const response = await fetch('/users/finduser', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `token=${props.tokenToDisplay}`
        });
        const userResponse = await response.json()
        // console.log("useeffect userResponse ", userResponse );


        // setDescription(userResponse.userFind.description)
        setPseudo(userResponse.userFind.pseudo)
        setUser(userResponse.userFind)
        setUserGamesList(userResponse.userFind.idGame)
        setPlayerTwo(userResponse.playerTwo)
        setAvatar(userResponse.userFind.avatar)
        setMail(userResponse.userFind.mail)
        setCP(userResponse.userFind.CP)
      }
      userData()
      //    RECUPERATION DE MES ACTUALITÉS    //
      async function articleData(){
        const data = await fetch('/myArticles')
        const body = await data.json()
        setMyArticlesList(body.myArticles)
      }
      articleData()
    } 
  }, [props.tokenToDisplay, token])


  // LISTE DES ARTICLES
  var cardArticle = [];
  var max = myArticlesList.length > 4? 4 : myArticlesList.length;
  for( var q=0; q<max ; q++){
    cardArticle.push(
      <div key={q} style={{padding: 5, color: 'white', backgroundColor: '#010212', borderBottom: "1px solid #A58CA3", borderTop: "1px solid #A58CA3", margin: 0}}>
        <a target="_blank" href={myArticlesList[q].link} rel="noopener noreferrer" style={{display: "flex", textDecoration: "none"}}>
          <img width="25%" src={myArticlesList[q].image} style={{borderRadius: "10px"}} alt=""/>
          <div style={{alignSelf: "center", fontSize: "13px", padding: 5}}>
            <p style={{marginLeft: 35, color: 'white'}}>{myArticlesList[q].title}</p>
          </div>
        </a>
      </div>
    )
  }    

    
  // LSTE DES SERVICES ATTACHEE A L'UTILISATEUR 
  if(user !== "" ){
    var serviceList = []
    for (var s=0; s<user.service.length; s++){
      serviceList.push(
        <CardText key={s} style={{marginLeft:20}}>
          <span style={{fontWeight:"bold"}}>{user.service[s].service}</span>: <span style={{fontStyle:"italic"}}> {user.service[s].tag} </span>  
        </CardText>
      )
    }
  }


  // supprimer un jeux
  async function clickSupprGame(game){
    const response = await fetch('/users/supprGame', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.tokenToDisplay}&gameId=${game}`
    });
    const supprResponse = await response.json()
    // console.log('supprResponse ', supprResponse)
    setUserGamesList(supprResponse.idGame)
  }

  // supprimer un P2 de sa liste 
  async function clickSupprP2(P2){
    const response = await fetch('/users/supprP2', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.tokenToDisplay/*token*/}&p2=${P2}`
    });
    const supprP2Response = await response.json()
    // console.log('supprP2Response ', supprP2Response)
    setPlayerTwo(supprP2Response.playertwo)
    if (playerTwo.length === 0){
      setPlayerTwo([])
    }
  }

  // NESTED MODAL
  const NestedModalShow = (props) => {

    const toggleAll = () => {
      setNestedModal(!nestedModal);
      setListSuccess([])
      setCloseAll(true);
    }
    if(listSuccess.length>0){
      var ListSuccessMap = listSuccess[0]
      var tabListSuccess = ListSuccessMap.map((success,i) => {
        return (
          <div key={i}>
            <span  className="success">{success}</span>
            <br></br>
          </div>
        
        )
      })
    }



    return (
      <div>
        <Modal show={nestedModal} 
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)",}}
        >

          <ModalHeader style={{backgroundColor: '#010212', color:"#F9F5FF"  }}>
            Modifications effectuées:
          </ModalHeader>

          <ModalBody className="modalbody-footer"> 
            {tabListSuccess} 
          </ModalBody>
      
          <ModalFooter style={{backgroundColor: '#010212', color:"#F9F5FF",borderRadius: "0px 0px 100px 0px" ,justifyContent:"center"}}>
            <Button color="secondary" outline onClick={toggleAll}>Fermer</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }


  // CLICK sur un AVATAR de liste
  function clickAvatar(choice){
    setNewAvatar(choice);
    setModalAvatar(false)
    setuserManagementModal(true)
  }

  // modal Avatar
  function AvatarModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header style={{backgroundColor: '#010212'}}>
            <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212'}}>
              Avatars
            </Modal.Title>
            <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0}} onClick={props.onHide}>X</Button>
          </Modal.Header>

          <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>
            <img onClick={() => clickAvatar("/Avatar/icons8-bad-piggies-100.png")}                src={require("../images/Avatar/icons8-bad-piggies-100.png")} alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-bishop-100.png")}                     src={require("../images/Avatar/icons8-bishop-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-bullbasaur-100.png")}                 src={require("../images/Avatar/icons8-bullbasaur-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-counter-strike-100.png")}             src={require("../images/Avatar/icons8-counter-strike-100.png")} alt=""  />
            <img onClick={() => clickAvatar("/Avatar/icons8-crash-bandicoot-100.png")}            src={require("../images/Avatar/icons8-crash-bandicoot-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-cuphead-100.png")}                    src={require("../images/Avatar/icons8-cuphead-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-minecraft-main-character-100.png")}   src={require("../images/Avatar/icons8-minecraft-main-character-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-ninja-head-100.png")}                 src={require("../images/Avatar/icons8-ninja-head-100.png")} alt=""  />
            <img onClick={() => clickAvatar("/Avatar/icons8-pikachu-pokemon-100.png")}            src={require("../images/Avatar/icons8-pikachu-pokemon-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-skyrim-100.png")}                     src={require("../images/Avatar/icons8-skyrim-100.png")} alt=""  />
            <img onClick={() => clickAvatar("/Avatar/icons8-sonic-the-hedgehog-100.png")}         src={require("../images/Avatar/icons8-sonic-the-hedgehog-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-spider-man-new-100.png")}             src={require("../images/Avatar/icons8-spider-man-new-100.png")}  alt="" />
            <img onClick={() => clickAvatar("/Avatar/icons8-super-mario-100.png")}                src={require("../images/Avatar/icons8-super-mario-100.png")} alt=""  />
            <img onClick={() => clickAvatar("/Avatar/icons8-minecraft-sword-100.png")}            src={require("../images/Avatar/icons8-minecraft-sword-100.png")}  alt="" />
          </Modal.Body>
        </Modal>
  </div>
    
  );
}
//fin modal avatar

  
  // ---------------- MODAL USERMANAGER -----------------
  //modifier les infos User
    function UserManagementModal (props){
    const [newPseudo, setNewPseudo] = useState('')
    const [newMail, setNewMail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newCP, setNewCP] = useState('')


    const toggleNested = () => {
      setNestedModal(!nestedModal);
      setuserManagementModal(false)
      setCloseAll(false);
    }

    async function clickValider(){
      const data = await fetch('/users/usermanager', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `pseudoFromFront=${newPseudo}&token=${token}&mailFromFront=${newMail}&passwordFromFront=${newPassword}&cpFromFront=${newCP}&avatarFromFront=${newAvatar}` /*&langueFromFront=${language}&*/
      })
      const body = await data.json()

      // affiche newpseudo si modifier
      if(body.userFind.pseudo){
        setPseudo(body.userFind.pseudo)
      }
      // affiche newmail si modifier
      if (body.userFind.mail){
        setMail(body.userFind.mail)
      }

      // affiche newCP si modifier
      if (body.userFind.CP){
        setCP(body.userFind.CP)
      }
      // affiche newAvatar si modifier
      if (body.userFind.avatar){
        setAvatar(body.userFind.avatar)
      }

      // afficher les erreurs du back s'il y en a
      if(body.error.length>0){
        setListErrors([...listErrors, body.error]);
        // sinon afficher les modifications faite en back avec succès, s'il y en a
      } else if (body.success.length>0){
        setListSuccess([...listSuccess, body.success]);
        toggleNested()
        // sinon fermer la modal et réinitialiser la listErrors
      } else {
        setListErrors([])
        props.onHide()
      }
    }

    // remettre à zéro la ListErrors et fermer la modal UserManager
    function clickClose (){
      setListErrors([])
      props.onHide()
    }

    // s'il a au moins une erreur, .map pour afficher le(s) message(s) d'erreurs
    if(listErrors.length>0){
      var listErrorsMap = listErrors[0] /*[0] car je push un tableau dans un tableau */
      
      var tabListError = listErrorsMap.map((error,j) => {
        return (
          <div key={j}>
            <span  className="error"> {error} </span>
            <br></br>
          </div>
        )
      })
    }

    function ClickSetAvatar(){
      setuserManagementModal(false)
      setModalAvatar(true)
    }

    var displayAvatar = avatar
    if (newAvatar !== ""){
      displayAvatar = newAvatar
    }

    // ---- return -----
    return (
      <div>
        <NestedModalShow
          show={nestedModal}
          onHide={() => setNestedModal(false)}
        />

      <AvatarModal
        show={modalAvatar}
        onHide={() => setModalAvatar(false)}
      />

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)",}}
      >
        <Modal.Header style={{backgroundColor: '#010212'}}>
          <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212', justifyContent: 'center' }}>
          Modifier mes informations
          </Modal.Title>
          <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0,}} onClick={()=>clickClose()}> 
            <img src={require('../images/cross_modal.svg')} alt="modal cross"/>
          </Button>
        </Modal.Header>
  
        <Modal.Body className="modalbody-footer">
  
          <Form >
            <Card style={{ backgroundColor: '#010212', marginTop:"20px", padding:"20px 40px 20px 40px"}}>
              
              {/* PSEUDO */}
              <FormGroup row className="boldFont" style={{paddingTop:20}}>
                <Label md={4}>Nouveau Pseudo</Label>
                <Col md={5}>
                  <Input onChange={(e) => setNewPseudo(e.target.value)} style={{borderRadius:25}} type="text" placeholder={"actuel: "+pseudo} />
                </Col>
              </FormGroup>

              {/* MAIL */}
              <FormGroup row className="boldFont">
                  <Label md={4}>Nouveau Email</Label>
                  <Col md={5}>
                    <Input onChange={(e) => setNewMail(e.target.value)} style={{borderRadius:25}} type="email" placeholder={"actuel: "+mail}/>
                  </Col>
                </FormGroup>

                {/* PASSWORD */}
                <FormGroup row className="boldFont">
                  <Label md={4}>Mot de passe</Label>
                  <Col md={5}>
                    <Input onChange={(e) => setNewPassword(e.target.value)} style={{borderRadius:25}} type="password" placeholder= "nouveau mot de passe"/>
                  </Col>
                </FormGroup>

                {/* CODE POSTAL */}
                <FormGroup row className="boldFont">
                  <Label md={4}>Code Postal</Label>
                  <Col md={5}>
                    <Input onChange={(e) => setNewCP(e.target.value)} style={{borderRadius:25}} type="number" placeholder={"actuel: "+CP}/>
                  </Col>
                </FormGroup>

                {/* AVATAR */}
                <FormGroup row className="boldFont">
                    <Label md={4}>Avatar</Label>
                    <Col md={5}>
                      <Button outline onClick={() => ClickSetAvatar()}>Modifie ton avatar</Button>
                      <img src={displayAvatar} style={{height: 20, paddingLeft: 15}} alt="new avatar" />
                    </Col>
                  </FormGroup>

            </Card>
          </Form>
        {tabListError}

        </Modal.Body>
        <Modal.Footer style={{color: 'white', justifyContent:"center", backgroundColor: '#010212', borderRadius: "0px 0px 120px 60px"}}>
          <Button  color="secondary" onClick={()=>clickValider()} outline>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
  console.log("props.tokenToDisplay end ", props.tokenToDisplay);

  if (!props.tokenToDisplay){
    return <Redirect to="/"  />
  }

  // ___________________________________ RETURN ___________________________________
  return (
  <div className="backgroundColor">
    <UserManagementModal
      show={userManagementModal}
      onHide={() => setuserManagementModal(false)}
    />


    <Row >
      <Col>
        {/*__________ USER CARD __________*/}
        <Card style={{ backgroundColor: '#060122', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", padding:"15px"}}>
          <Row style={{padding: "5px 20px", display:"flex", alignItems: "center", marginBottom: "10px", alignContent:"space-between"}}>
              <CardImg src={avatar} style= {{ height:50, width: 50, marginRight:15 }} alt="userAvatar" />
              <CardTitle style={{margin:0, padding:0}}>{pseudo} </CardTitle>
              <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                <CardImg onClick={()=> setuserManagementModal(true)} style={{height:30, width:30, marginLeft: 5, cursor: "pointer"}} src={require('../images/adjust 1.svg')}/>
              </Col>  
          </Row>

          {/* <CardSubtitle style={{padding:'10px'}}>Description</CardSubtitle>
            <CardText style={{padding:'10px'}}>{description}</CardText> */}
          <CardSubtitle style={{padding:'10px'}}>Mes Services en ligne</CardSubtitle>
          {serviceList}
          {/*<Row style={{alignItems: "center"}}>              
            <CardSubtitle >Team : </CardSubtitle>
            <Link to="/ScreenteamAdmin"><Button style={{marginLeft:"15px"}} size="sm">Créer</Button></Link>
            <Link to="/ScreenteamView"><Button style={{marginLeft:"15px"}} size="sm">Rejoindre</Button></Link>
          </Row>  */}
          {/* <CardSubtitle>Mes Teams:</CardSubtitle>
            <CardText>Les Invincibles</CardText>
            <CardText>Team Choucroute</CardText> */}
        </Card>
        <br></br>

        {/*__________ LISTE DE MES JEUX __________*/}
        <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}>
          <CardTitle style={{ alignSelf: 'center'}}>Liste de mes jeux 
            <Link to="/screengame"> <img style={{height:"20px", width:"20px", margin: "0px 10px"}} src={require('../images/add 1.svg')} alt="add"/> </Link> 
          </CardTitle>

          <Col className="cardbody">
            <Table style={{color:'white'}}>
              <tbody>
              {userGamesList.map((idGame,x)=>(
                <tr key={x}>
                  <td className="align-middle"><img src={idGame.cover} style={{borderRadius: "10px"}} alt="game cover"/></td>
                  <td className="align-middle">{idGame.plateforme}</td>
                  <td className="align-middle">{idGame.name}</td>
                  <td className="align-middle"><img onClick={()=>clickSupprGame(idGame._id)} style={{height: "20px" ,backgroundColor:"transparente"}} src={require("../images/waste.svg")} alt="trash" /></td>
                </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Card>

        <br></br>

        {/*__________ Mon fil d'actualité __________*/}
        <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
          <Col className="cardbody">
            <CardTitle className="text-center">Mon fil d'actualité</CardTitle>
            {cardArticle}
            <div style={{marginTop: 20, display: "flex", justifyContent: "center"}}>
              <img style={{width: 50, cursor: "pointer"}} alt="" src={threeDots} onClick={() => setNewsModalShow(true)}/>
            </div>

            <ArticlesModal
              show={newsModalShow}
              onHide={() => setNewsModalShow(false)}
            />
          </Col>
        </Card>
      </Col>

      {/* __________ Je coupe ma page en deux ici __________*/}

      <Col>
        {/*__________ MES PLAYER TWO __________*/}
        <Container className="card-background" style={{boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor:"#010212", marginTop:"-10px", paddingBottom: "20px", marginBottom: "20px"}}>
          <Card style={{ borderRadius:"0 50", backgroundColor:"transparent", marginTop: "10px"}}>
            <CardTitle style={{ alignSelf: 'center', }} >Mes Player Two 
              <Link to="/screenmatchpage"> 
                <img style={{height:"20px", width:"20px", margin: "0px 10px"}} src={require('../images/add 1.svg')} alt="add"/> 
              </Link>
            </CardTitle>
          
            {/* Map les jeux des P2 */}
            {playerTwo.map((map, i)=> {
              var P2GameList = []
              for (var m = playerTwo[i].idGame.length-1; m>=0; m--){
                P2GameList.push(
                  <tr key={m}>
                    <td><img src={(`https:${map.idGame[m].cover}`)} style={{borderRadius: "10px"}} alt="game cover"></img></td>
                    <td className="align-middle">{map.idGame[m].plateforme}</td>
                    <td className="align-middle">{map.idGame[m].name}</td>
                  </tr>
                )
              }

              //afficher les P2 et leurs jeux
              return(
                <CardBody key={i*100} className="card-background" style={{ borderRadius:"0 50", backgroundColor:"transparente", marginBottom:10}}>
                  <Row style={{paddingInline: "20px", display:"flex", alignItems: "center", marginBottom: "10px", alignContent:"space-between"}}>
                    <img  src={map.avatar} style={{height:"55px", width:"55px",paddingLeft: "15px", paddingBottom:"12px"}} alt="avateur P2" />
                    <Col xs="auto">
                      <Link to={`/screenotheruser/${map._id}`}>
                        <CardTitle> {map.pseudo} </CardTitle>
                      </Link> 
                    </Col>
                    <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                      <img onClick={()=>clickSupprP2(map._id)} style={{height: "20px" ,backgroundColor:"transparente"}} src={require("../images/waste.svg")} alt="" />
                    </Col>
                  </Row>
                  <Table>
                    <tbody>
                      {P2GameList}
                    </tbody>
                  </Table>
                </CardBody>
              )
            })}
          </Card>
        </Container>
      </Col>
    </Row>
  </div>

  );
};

function mapStateToProps(state){
  return {tokenToDisplay: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    handleClickViewuser: (p2) => {
      dispatch({type : 'viewP2', p2:p2})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenUser)
