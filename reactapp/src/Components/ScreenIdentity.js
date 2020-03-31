import React, {useState, useEffect} from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Container, Card, Button, Collapse } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {Modal,} from 'react-bootstrap'  ; 
import {connect} from 'react-redux';



const ScreenIdentity = (props) => {
// inscription
  const [signUpPseudo, setSignUpPseudo] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [language, setLanguage] = useState('')
  const [avatar, setAvatar] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignup, setErrorsSignup] = useState([])
  const [token, setToken] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [classAngle, setclassAngle]= useState(false)

// modals
  const [modalAvatar, setModalAvatar] = React.useState(false);
  const [modalShow, setModalShow] = useState(false)


  const toggle = () => {
    setIsOpen(!isOpen);
    setclassAngle(!classAngle)
  };


  useEffect(() => {
    const findToken = () => {
      setToken(props.token)
      props.addToken(props.token)
    }
    findToken();
  }, [props.token, props]);

  if(token){
    return <Redirect to='/screengame'/>
  }  


  var handleSubmitSignup = async () => {
    const data = await fetch('/users/adduser', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `pseudoFromFront=${signUpPseudo}&passwordFromFront=${signUpPassword}&mailFromFront=${signUpEmail}&birthdayFromFront=${birthDate}&cpFromFront=${country}&sexeFromFront=${gender}&langueFromFront=${language}&avatarFromFront=${avatar}`
    })
    const body = await data.json()
    
    if(body.result === true){
      setUserExists(true)
      props.addToken(body.token)
    } else {
      setErrorsSignup(body.error)
    }
  }


  if(userExists){
    return <Redirect to='/screengame'/>
  }

  // Tableau de message d'erreur
  var tabErrorsSignup = listErrorsSignup.map((error,w) => {
    return(<p key={{w}} className="error">{error}</p>)
  })

  // CLICK sur un AVATAR de liste
  function clickAvatar(avatar){
    setAvatar(avatar);
    setModalAvatar(false)
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

//-----------MODAL SIGN IN-----------//
const SignInModal= (props) => {

  const [signInEmailPseudo, setSignInEmailPseudo] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignIn, setErrorsSignIn] = useState([])
  


  var handleSubmitSignIn = async () => {

    const data = await fetch('/users/connection', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `pseudoFromFront=${signInEmailPseudo}&mailFromFront=${signInEmailPseudo}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result === true){
      setUserExists(true)
      props.addToken(body.token)
      props.onHide()
      setErrorsSignIn([])
    } else {
      setErrorsSignIn(body.error)
    }
  }

  if(userExists){
    return <Redirect to='/screenuser'/>
  }

  var tabErrorsSignIn = listErrorsSignIn.map((error,i) => {
    return(<p className="error">{error}</p>)
  })

  function clickClose(){
    setErrorsSignIn([])
    props.onHide()
  }


  // --- return of modal --- 
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title >
          Connexion
        </Modal.Title>
        <Button color='primary' onClick={()=> clickClose()}>
          <img src={require('../images/cross_modal.svg')} alt=""/>
        </Button>
      </Modal.Header>

      <Modal.Body className="modalbody-footer">
        <Input onChange={(e) => setSignInEmailPseudo(e.target.value)} type="text" required placeholder="Email ou Pseudo" style={{width: 600}}/>
        <Input onChange={(e) => setSignInPassword(e.target.value)} type="password" required placeholder="Mot de passe" style={{width: 600}}/>
        {tabErrorsSignIn}
      </Modal.Body>

      <Modal.Footer style={{}}>
        <Button color='primary' onClick={() => handleSubmitSignIn()} size="sm">Connexion</Button>
      </Modal.Footer>
    </Modal>
  );
}
//---------FIN MODAL SIGN IN-----------//


  // _____________________ RETURN ________________________
  return (
    <div className="backgroundColor">

      <AvatarModal
        show={modalAvatar}
        onHide={() => setModalAvatar(false)}
      />

      <SignInModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        addToken={props.addToken}
      />

      <Row className="titleTeam">
        <img style={{height:"40px", marginRight:"30px" }} src={require('../images/java-script.svg')}  alt="team"/>
        <h1 className="heading" style={{marginBottom: 5}}>Inscription</h1>
      </Row>
      {/* gif Gandalf, voir pour l'afficher quelque seconde avant de faire apparaître le formulaire */}

      <Container>
        <Row xs="1">
          <Col>
            <Form >
              <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)",backgroundColor: '#010212', borderRadius: "0px 50px", marginTop:"20px", padding:"20px 40px 20px 40px"}}>
                <FormGroup row className="boldFont" style={{paddingTop:20}}>
                  <Label md={2}>Pseudo*</Label>
                  <Col md={4}>
                    <Input onChange={(e) => setSignUpPseudo(e.target.value)} style={{borderRadius:25}} type="text"/>
                  </Col>
                </FormGroup>

                <FormGroup row className="boldFont">
                  <Label md={2}>Email*</Label>
                  <Col md={4}>
                    <Input onChange={(e) => setSignUpEmail(e.target.value)} style={{borderRadius:25}} type="email"/>
                  </Col>
                </FormGroup>

                <FormGroup row className="boldFont">
                  <Label md={2}>Mot de passe*</Label>
                  <Col md={4}>
                    <Input onChange={(e) => setSignUpPassword(e.target.value)} style={{borderRadius:25}} type="password"/>
                  </Col>
                </FormGroup>

                {tabErrorsSignup}

                {/* BOUTON FACULTATIF */}
                <FormGroup row className="boldFont" style={{paddingTop:20}}>
                  <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem', borderRadius: 10, width: 200 }} outline>
                    <img className={`${classAngle}`} style={{heigth:"20px", width: "20px",position: "relative", left:0}} src={require("../images/angle1.svg")} alt=""/> 
                    Facultatif
                  </Button>
                </FormGroup>

                  <Collapse isOpen={isOpen}>

                  {/* DATE DE NAISSANCE */}
                  <FormGroup row className="boldFont" style={{marginTop:30}}>
                    <Label md={2}>Date de naissance</Label>
                    <Col md={4}>
                      <Input
                        onChange={(e) => setBirthDate(e.target.value)}
                        style={{borderRadius:25}}
                        type="date"
                        placeholder="vous ne pourrez pas le modifier plus tard"
                      />
                    </Col>
                  </FormGroup>

                  {/* CODE POSTAL */}
                  <FormGroup row className="boldFont">
                    <Label md={2}>Code Postal</Label>
                    <Col md={4}>
                      <Input onChange={(e) => setCountry(e.target.value)} style={{borderRadius:25}} type="number"/>
                    </Col>
                  </FormGroup>

                  {/* SEXE */}
                  <FormGroup row className="boldFont" style={{paddingBottom:20, marginBottom:0}}>
                    <Label md={2}>Sexe</Label>
                    <Col md={4} >
                      <Input style={{borderRadius:25}} onChange={(e) => setGender(e.target.value)} type="select">
                        <option>Non précisé</option>
                        <option>Homme</option>
                        <option>Femme</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {/* AVATAR */}
                  <FormGroup row className="boldFont">
                    <Label md={2}>Avatar</Label>
                    <Col md={4}>
                      <Button outline onClick={() => setModalAvatar(true)}>choisi ton avatar</Button>
                      <img src={avatar} style={{height: 20, paddingLeft: 15}} alt="" />
                    </Col>
                    
                  </FormGroup>

                  {/* LANGUE */}
                  <FormGroup row className="boldFont">
                    <Label md={2}>Langue</Label>
                    <Col md={4}>
                      <Input style={{borderRadius:25}} onChange={(e) => setLanguage(e.target.value)} type="select">
                        <option>Français</option>
                        <option>Anglais</option>
                        <option>Allemand</option>
                        <option>Arabe</option>
                        <option>Italien</option>
                        <option>Espagnol</option>
                        <option>Japonais</option>
                        <option>Chinois</option>
                        <option>Coréen</option>
                        <option>Russe</option>
                      </Input>
                    </Col>
                  </FormGroup>

                </Collapse>
              </Card>
            </Form>
          </Col>
        </Row>

        <Row style={{alignSelf: "center", justifyContent: "center",  }}>
          <FormGroup className="nextButton boldFont" style={{margin:0,  paddingTop:25, marginRight:20, justifyContent:"center"}}>
            <Button onClick={() => setModalShow(true)} color="transparent" style={{padding:0}}>
              <img style={{height:"100px", width:"100px",transform: 'rotate(180deg)'}} src={require('../images/button.svg')} alt="button start"/>
              <div className="textButton" style={{paddingLeft:16}}> inscrit?</div>
            </Button>
          </FormGroup>

          <FormGroup className="nextButton boldFont" style={{margin:0,  paddingTop:25, justifyContent:"center"}}>
            <Button onClick={() => handleSubmitSignup()} color="transparent" style={{padding:0}}>
              <img style={{height:"100px", width:"100px"}} src={require('../images/button.svg')} alt="button start"/>
              <div className="textButton" style={{paddingRight:20}}>Start</div>
            </Button>
          </FormGroup>
        </Row>
        
      </Container>
    </div>
  );
}

function mapStateToProps(state){
  return {token: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenIdentity)
