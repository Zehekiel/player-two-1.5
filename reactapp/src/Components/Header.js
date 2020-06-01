import React, { useState, useEffect } from "react";
// import Switch from 'react-switch';
// import 'antd/dist/antd.css';
// import { Switch } from 'antd';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '../images/logoP2.svg';
import logout from '../images/logout.svg';
import {Row, Col, Input, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal,} from 'react-bootstrap'  ; 
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

  // MODALS
    //-----------MODAL SIGN IN-----------//
    const SignInModal= (props) => {

      const [signInEmailPseudo, setSignInEmailPseudo] = useState('')
      const [signInPassword, setSignInPassword] = useState('')
      const [userExists, setUserExists] = useState(false)
      const [listErrorsSignIn, setErrorsSignIn] = useState([])

    
    
      var handleSubmitSignIn = async () => {
    console.log("handleSubmitSignIn");
    
        const data = await fetch('/users/connection', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `pseudoFromFront=${signInEmailPseudo}&mailFromFront=${signInEmailPseudo}&passwordFromFront=${signInPassword}`
        })
    
        const body = await data.json()

        if(body.result === true ){
          console.log("body.result === true");
          setUserExists(true)
          props.addtoken(body.token)
          props.onHide()
          setErrorsSignIn([])
        } else {
          console.log("else");
          setErrorsSignIn(body.error)
        }

        console.log(props.tokenToDisplay);
        console.log(userExists);
        if(userExists /*&& props.tokenToDisplay*/){
          console.log("userExists");
          return <Redirect to='/screenuser'/>
        }
      }

    
      var tabErrorsSignIn = listErrorsSignIn.map((error,i) => {
        return(<p key={i} className="error">{error}</p>)
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
            <Button onClick={()=> clickClose()}>
              <img src={require('../images/cross_modal.svg')} alt=""/>
            </Button>
          </Modal.Header>

          <Modal.Body className="modalbody-footer" style={{paddingLeft: '30%'}}>
            <Input onChange={(e) => setSignInEmailPseudo(e.target.value)} type="text" required placeholder="Email ou Pseudo" style={{width: '60%'}}/>
            <Input onChange={(e) => setSignInPassword(e.target.value)} type="password" required placeholder="Mot de passe" style={{width: '60%'}}/>
            {tabErrorsSignIn}
          </Modal.Body>

          <Modal.Footer style={{}}>
            <Button onClick={() => handleSubmitSignIn()} size="sm" >Connexion</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // modal contact
    function ContactModal(props) {
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
              Contactez-nous
            </Modal.Title>
            <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0}} onClick={props.onHide} >X</Button>
          </Modal.Header>
          <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>
            <h4>Player Two</h4>
            <p>playertwo.help@gmail.com</p>
          </Modal.Body>

        </Modal>
      </div>
        
      );
    }

    // MODAL POLITIQUE
    function PolitiqueModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
                  >
          <Modal.Header style={{backgroundColor: '#010212'}}>
            <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212'}}>
              Politique de confidentialité
            </Modal.Title>
            <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0}}onClick={props.onHide}>X</Button>
          </Modal.Header>
          <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>
  
              
  
                <h6>ARTICLE 1 : PRÉAMBULE</h6>

                  <p>Cette politique de confidentialité s'applique au site : Player Two.</p>
                  
                  
                  <p>La présente politique de confidentialité a pour but d'exposer aux utilisateurs du site :</p>
                  
                  <p>La manière dont sont collectées et traitées leurs données à caractère personnel. Doivent être considérées comme données personnelles toutes les données étant susceptibles d'identifier un utilisateur. Il s'agit notamment du prénom et du nom, de l'âge, de l'adresse postale, l'adresse mail, la localisation de l'utilisateur ou encore son adresse IP ;
                  Quels sont les droits des utilisateurs concernant ces données ;
                  Qui est responsable du traitement des données à caractère personnel collectées et traitées ;
                  A qui ces données sont transmises ;
                  Eventuellement, la politique du site en matière de fichiers "cookies".
                  
                  Cette politique de confidentialité complète les mentions légales et les Conditions Générales d'Utilisation que les utilisateurs peuvent consulter à l'adresse ci-après :
                  
                  http://www.PlayerTwo.fr/</p>
                  
                  
                  <h6>ARTICLE 2 : PRINCIPES GÉNÉRAUX EN MATIÈRE DE COLLECTE ET DE TRAITEMENT DE DONNÉES</h6>
                  
                  
                  <p>Conformément aux dispositions de l'article 5 du Règlement européen 2016/679, la collecte et le traitement des données des utilisateurs du site respectent les principes suivants :</p>
                  
                  <p>Licéité, loyauté et transparence : les données ne peuvent être collectées et traitées qu'avec le consentement de l'utilisateur propriétaire des données. A chaque fois que des données à caractère personnel seront collectées, il sera indiqué à l'utilisateur que ses données sont collectées, et pour quelles raisons ses données sont collectées ;
                  Finalités limitées : la collecte et le traitement des données sont exécutés pour répondre à un ou plusieurs objectifs déterminés dans les présentes conditions générales d'utilisation ;
                  Minimisation de la collecte et du traitement des données : seules les données nécessaires à la bonne exécution des objectifs poursuivis par le site sont collectées ;
                  Conservation des données réduites dans le temps : les données sont conservées pour une durée limitée, dont l'utilisateur est informé. Lorsque cette information ne peut pas être communiquée, l'utilisateur est informé des critères utilisés pour déterminer la durée de conservation ;
                  Intégrité et confidentialité des données collectées et traitées : le responsable du traitement des données s'engage à garantir l'intégrité et la confidentialité des données collectées.</p>
                  
                  <p>Afin d'être licites, et ce conformément aux exigences de l'article 6 du règlement européen 2016/679, la collecte et le traitement des données à caractère personnel ne pourront intervenir que s'ils respectent au moins l'une des conditions ci-après énumérées :</p>
                  
                  <p>L'utilisateur a expressément consenti au traitement ;
                  Le traitement est nécessaire à la bonne exécution d'un contrat ;
                  Le traitement répond à une obligation légale ;
                  Le traitement s'explique par une nécessité liée à la sauvegarde des intérêts vitaux de la personne concernée ou d'une autre personne physique ;
                  Le traitement peut s'expliquer par une nécessité liée à l'exécution d'une mission d'intérêt public ou qui relève de l'exercice de l'autorité publique ;
                  Le traitement et la collecte des données à caractère personnel sont nécessaires aux fins des intérêts légitimes et privés poursuivis par le responsable du traitement ou par un tiers.</p>
                  
                  <h6>ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES DANS LE CADRE DE LA NAVIGATION SUR LE SITE</h6>
                  
                  
                  <p>A. DONNÉES COLLECTÉES ET TRAITÉES ET MODE DE COLLECTE</p>
                  
                  <p>Les données à caractère personnel collectées sur le site Player Two sont les suivantes :</p>
                  
                  <p>Prénom</p>
                  <p>Nom</p>
                  <p>Adresse Mail</p>
                  <p>Mot de Passe</p>
                  <p>Date de naissance</p>
                  <p>Code postal</p>
                  <p>Langue</p>
                  <p>Sexe</p>

                  <p>Ces données sont collectées lorsque l'utilisateur effectue l'une des opérations suivantes sur le site :
                  
                  L'utilisateur se connecte sur son compte
                  
                  Le responsable du traitement conservera dans ses systèmes informatiques du site et dans des conditions raisonnables de sécurité l'ensemble des données collectées pour une durée de : 5 ans.
                  
                  La collecte et le traitement des données répondent aux finalités suivantes :
                  
                  Les données son utilisées pour filtrer le contenu correspondant à chaque utilisateur.</p>
                  
                  
                  <p>B. TRANSMISSION DES DONNÉES A DES TIERS</p>
                  
                  <p>Les données à caractère personnel collectées par le site ne sont transmises à aucun tiers, et ne sont traitées que par l'éditeur du site.</p>
                  
                  
                  <p>C. HÉBERGEMENT DES DONNÉES</p>
                  
                  <p>Le site Player Two est hébergé par : Heroku Inc, dont le siège est situé à l'adresse ci-après :
                  
                  650 7th Street, San Francisco, CA
                  
                  L'hébergeur peut être contacté au numéro de téléphone suivant : +33 1 (877) 563-4311)
                  
                  Les données collectées et traitées par le site sont exclusivement hébergées et traitées en France.</p>
                  
                  
                  <h6>ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA PROTECTION DES DONNÉES</h6>
                  
                  <p>A. LE RESPONSABLE DU TRAITEMENT DES DONNÉES</p>
                  
                  <p>Le responsable du traitement des données à caractère personnel est : Quentin GUERIN. Il peut être contacté de la manière suivante :
                  
                  Par mail : guerin.quentin@live.fr
                  
                  Le responsable du traitement des données est chargé de déterminer les finalités et les moyens mis au service du traitement des données à caractère personnel.</p>
                  
                  
                  <p>B. OBLIGATIONS DU RESPONSABLE DU TRAITEMENT DES DONNÉES</p>
                  
                  <p>Le responsable du traitement s'engage à protéger les données à caractère personnel collectées, à ne pas les transmettre à des tiers sans que l'utilisateur n'en ait été informé et à respecter les finalités pour lesquelles ces données ont été collectées.
                  
                  De plus, le responsable du traitement des données s'engage à notifier l'utilisateur en cas de rectification ou de suppression des données, à moins que cela n'entraîne pour lui des formalités, coûts et démarches disproportionnés.
                  
                  Dans le cas où l'intégrité, la confidentialité ou la sécurité des données à caractère personnel de l'utilisateur est compromise, le responsable du traitement s'engage à informer l'utilisateur par tout moyen.</p>
                  
                  
                  <p>C. LE DÉLÉGUÉ À LA PROTECTION DES DONNÉES</p>
                  
                  <p>Par ailleurs, l'utilisateur est informé que la personne suivante a été nommée Délégué à la Protection des Données : Quentin GUERIN.
                  
                  Le rôle du Délégué à la Protection des Données et de s'assurer la bonne mise en oeuvre des dispositions nationales et supranationales relatives à la collecte et au traitement des données à caractère personnel. Il est parfois appelé DPO (pour Data Protection Officer).
                  
                  Le délégué à la protection des données peut être joint de la manière suivante :
                  
                  Par mail : guerin.quentin@live.fr</p>
                  
                  
                  <h6>ARTICLE 5 : DROITS DE L'UTILISATEUR</h6>
                  
                  
                  <p>Conformément à la réglementation concernant le traitement des données à caractère personnel, l'utilisateur possède les droits ci-après énumérés.
                  
                  Afin que le responsable du traitement des données fasse droit à sa demande, l'utilisateur est tenu de lui communiquer : ses prénom et nom ainsi que son adresse e-mail, et si cela est pertinent, son numéro de compte ou d'espace personnel ou d'abonné.
                  
                  Le responsable du traitement des données est tenu de répondre à l'utilisateur dans un délai de 30 (trente) jours maximum.</p>
                  
                  
                  <p>A. PRÉSENTATION DES DROITS DE L'UTILISATEUR EN MATIÈRE DE COLLECTE ET TRAITEMENT DE DONNÉES</p>
                  
                  
                  <p>a. Droit d'accès, de rectification et droit à l'effacement</p>
                  
                  <p>L'utilisateur peut prendre connaissance, mettre à jour, modifier ou demander la suppression des données le concernant, en respectant la procédure ci-après énoncée :
                  
                  L'utilisateur doit envoyer un mail au responsable du traîtemnet des données.
                  
                  S'il en possède un, l'utilisateur a le droit de demander la suppression de son espace personnel en suivant la procédure suivante :
                  
                  L'utilisateur doit envoyer un mail au responsable du traîtement des données.</p>
                  
                  
                  <p>b. Droit à la portabilité des données</p>
                  
                  <p>L'utilisateur a le droit de demander la portabilité de ses données personnelles, détenues par le site, vers un autre site, en se conformant à la procédure ci-après :
                  
                  L'utilisateur doit envoyer un mail au responsable du traîtement des données.</p>
                  
                  
                  <p>c. Droit à la limitation et à l'opposition du traitement des données</p>
                  
                  <p>L'utilisateur a le droit de demander la limitation ou de s'opposer au traitement de ses données par le site, sans que le site ne puisse refuser, sauf à démontrer l'existence de motifs légitimes et impérieux, pouvant prévaloir sur les intérêts et les droits et libertés de l'utilisateur.
                  
                  Afin de demander la limitation du traitement de ses données ou de formuler une opposition au traitement de ses données, l'utilisateur doit suivre la procédure suivante :
                  
                  L'utilisateur doit envoyer un mail au responsable du traîtement des données.</p>
                  
                  
                  <p>d. Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un procédé automatisé</p>
                  
                  <p>Conformément aux dispositions du règlement 2016/679, l'utilisateur a le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un procédé automatisé si la décision produit des effets juridiques le concernant, ou l'affecte de manière significative de façon similaire.</p>
                  
                  
                  <p>e. Droit de déterminer le sort des données après la mort</p>
                  
                  <p>Il est rappelé à l'utilisateur qu'il peut organiser quel doit être le devenir de ses données collectées et traitées s'il décède, conformément à la loi n°2016-1321 du 7 octobre 2016.</p>
                  
                  
                  <p>f. Droit de saisir l'autorité de contrôle compétente</p>
                  
                  <p>Dans le cas où le responsable du traitement des données décide de ne pas répondre à la demande de l'utilisateur, et que l'utilisateur souhaite contester cette décision, ou, s'il pense qu'il est porté atteinte à l'un des droits énumérés ci-dessus, il est en droit de saisir la CNIL (Commission Nationale de l'Informatique et des Libertés, https://www.cnil.fr) ou tout juge compétent.</p>
                  
                  
                  <p>B. DONNÉES PERSONNELLES DES PERSONNES MINEURES</p>
                  
                  <p>Conformément aux dispositions de l'article 8 du règlement européen 2016/679 et à la loi Informatique et Libertés, seuls les mineurs âgés de 15 ans ou plus peuvent consentir au traitement de leurs données personnelles.
                  
                  Si l'utilisateur est un mineur de moins de 15 ans, l'accord d'un représentant légal sera requis afin que des données à caractère personnel puissent être collectées et traitées.
                  
                  L'éditeur du site se réserve le droit de vérifier par tout moyen que l'utilisateur est âgé de plus de 15 ans, ou qu'il aura obtenu l'accord d'un représentant légal avant de naviguer sur le site.</p>
                  
                  
                  <h6>ARTICLE 6 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ</h6>
                  
                  
                  <p>La présente politique de confidentialité peut être consultée à tout moment à l'adresse ci-après indiquée :</p>
                  
                  <p>http://www.playertwo.fr/</p>
                  
                  <p>L'éditeur du site se réserve le droit de la modifier afin de garantir sa conformité avec le droit en vigueur.</p>
                  
                  <p>Par conséquent, l'utilisateur est invité à venir consulter régulièrement cette politique de confidentialité afin de se tenir informé des derniers changements qui lui seront apportés.</p>
            
          </Modal.Body>
        </Modal>
      );
    }

    // MODAL MENTION
    function MentionModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
                  >
          <Modal.Header style={{backgroundColor: '#010212'}}>
            <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212'}}>
              Mentions Légales
            </Modal.Title>
            <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0}}onClick={props.onHide}>X</Button>
          </Modal.Header>
          <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>
            <h4>Player Two</h4>
            <p>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l’économie numérique, il est précisé aux utilisateurs du site PlayerTwo.fr l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
            <h5>Edition du site</h5>
            <p>Le site PlayerTwo.fr est édité par la société LegalPlace, société par actions simplifiée au capital de 10.051,50 euros, dont le siège social est situé 7 rue Marcel Dassault, 92100 Boulogne-Billancourt, immatriculée au registre du commerce et des sociétés sous le numéro d’identification unique 814 428 785 RCS Nanterre.</p>
            <h5>Responsable de publication</h5>
            <p>Quentin GUERIN</p>
            <h5>Hébergeur</h5>
            <p>Le site PlayerTwo.fr est hébergé par la société Amazon Web Services LLC</p>
            <p>Adresse: P.O. Box 81226, Seattle, WA 98108-1226</p>
            <p>Le stockage des données personnelles des Utilisateurs est exclusivement réalisé sur les centre de données (“clusters”) localisés dans des Etats membres de l’Union Européenne de la société Amazon Web Services LLC</p>
            <h5>Nous contacter</h5>
            <p>Par email : playertwo.help@gmail.com</p>
            <h5>CNIL</h5>
            <p>La société PlayerTwo conservera dans ses systèmes informatiques et dans des conditions raisonnables de sécurité une preuve de la transaction comprenant le bon de commande et la facture.</p>
            <p>La société PlayerTwo a fait l’objet d’une déclaration à la CNIL sous le numéro 1986932.</p>
            <p>Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur dispose d’un droit d’accès, de modification et de suppression des informations collectées par PlayerTwo. Pour exercer ce droit, il reviendra à l’Utilisateur d’envoyer un message à l’adresse suivante : playertwo@gmail.com</p>
          </Modal.Body>
        </Modal>
      );
    }


    /* // (en suspend) MODAL SHARE
    // function ShareModal(props) {
    //   return (
    //     <Modal
    //       {...props}
    //       size="lg"
    //       aria-labelledby="contained-modal-title-vcenter"
    //       centered
    //               >
    //       <Modal.Header style={{backgroundColor: '#010212'}}>
    //         <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212'}}>
    //           Share
    //         </Modal.Title>
    //         <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0}}onClick={props.onHide}>X</Button>
    //       </Modal.Header>
    //       <Modal.Body style={{color: 'white', backgroundColor: '#010212'}}>

    //       <p><img src={require('../images/facebook.png')} alt="Facebook"/></p>
    //       <br></br>
    //       <p><img src={require('../images/instagram-sketched.png')} alt="Instagram"/></p>
    //       <br></br>

    //       <p><img src={require('../images/linkedin.png')} alt="LinkedIn"/></p>

    //       <br></br>

    //       </Modal.Body>
    //       <Modal.Footer style={{color: 'white', backgroundColor: '#010212'}}>
    //       </Modal.Footer>
    //     </Modal>
    //   );
    // }
    // FIN MODAL SHARE */
  // FIN DES  MODALS



// ------------------------------------------ COMPOSANT PRESENTATION ------------------------------------------ //
function CustomIconSwitch (props) {
  const [modalShow, setModalShow] = useState(false)
  const [token, setToken] = useState(null)
  const [modalShowContact, setModalShowContact] = React.useState(false);
  const [modalShowPolique, setModalShowPolitique] = React.useState(false);
  const [modalShowMention, setModalShowMention] = React.useState(false);
  // const [modalShowShare, setModalShowShare] = React.useState(false);
  const [avatar, setAvatar] = useState("")




  useEffect(() => {
    const findToken = () => {
      setToken(props.tokenToDisplay)
      setAvatar(props.avatarToDisplay)
    }
    findToken()
  }, [props.tokenToDisplay, props.avatarToDisplay]);




  // Avatar from Back
  if(props.tokenToDisplay){
    async function userData(){
      const data = await fetch('/users/findavatar', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${props.tokenToDisplay}`
    })
    const body = await data.json()
    // console.log("header finduser respone ", body);
    setAvatar(body.userFind.avatar)
    }
    userData()
  }




  // CLICK X de la modal
  var clickCloseModal = (checkedhandle, modalShowhandle) =>{
    setModalShow(modalShowhandle)
  };




  // Gestion du Toggle
  var handleChange = () => {
    if(token === null){
      setModalShow(true)
    } else {
      setModalShow(false)
      setToken(null)
      props.logout()
      setAvatar("")
      return (<Redirect to='/'/>)
    }
  };




  var logOut = () => {
    setToken(null)
    props.logout()
    setAvatar("")
    return (<Redirect to='/'/>)
  };




  //____________________________ RETURN _________________________________
  return(
    <div>
      {/* MODAL */}
      <ContactModal
        show={modalShowContact}
        onHide={() => setModalShowContact(false)}
      />

      <PolitiqueModal
        show={modalShowPolique}
        onHide={() => setModalShowPolitique(false)}
      />

      <MentionModal
        show={modalShowMention}
        onHide={() => setModalShowMention(false)}
      />

      <SignInModal
        show={modalShow}
        onHide={() => clickCloseModal(false, false)}
        addtoken= {props.addToToken}
      />

      {/* <ShareModal
        show={modalShowShare}
        onHide={() => setModalShowShare(false)}
      /> */}
      
      {/* FIN MODAL */}

      <nav className="headerFooter" style={{display:"flex", justifyContent:"space-between"}} >
        <Col >
            <Row style={{alignItems:"center"}}>
              <Link to="/" >
                <img src={logo} style={{height:"70px", width:"90px"}} alt="logo"/>
              </Link>
              <Col style={{display:"flex", verticalAlign: "middle"}}>
              <span  className="heading">{`Player Two`}</span>
              </Col>
            </Row>
        </Col>


        <Col style={{display:"flex", flexDirection:"row-reverse", alignItems: "center", justifyItems:"center" }}>
          {/* passage en row-reverse pour aligner sur la droite. Il faut donc insérer les éléments à l'inverse dans le code ! */}
        

        {/* TOGGLE DE CONNEXION */}
        {/* <div className="react-switch" >
          <Switch
            width={100}
            height={50}
            id="icon-switch"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined style={{color:'red'}}/>}
            onClick={()=> handleChange()}
          />
        </div> */}
          {/* <label htmlFor="icon-switch" style={{paddingLeft:10, }}>
            <Switch 
            width={100}
            height={50}
              checked= {checked}
              onChange={()=> handleChange()}
              uncheckedIcon={
                <div 
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#F9F5FF",
                    paddingRight: 5,
                    paddingTop: 11,
                    paddingBottom: 19,
                  }}
                >
                  Log In
                </div>
              }
              checkedIcon={
                <img src={logout} style={{color:"#F9F5FF" ,height:15, paddingLeft:6, marginTop: 12 }} alt=""/>
              }
              className="react-switch"
              id="icon-switch"
            />
          </label> */}
          {/*fin  TOGGLE DE CONNEXION */}


          {avatar=== '' ?
                <Button onClick={()=>handleChange()} id='connexion'>Connexion</Button> 
                : 
                <img src={logout} style={{color:"#F9F5FF" ,height:20, paddingLeft:6 }} onClick={()=>logOut()} alt=""/>
              } 

          {/* Menu */}
            <UncontrolledDropdown direction="left" style={{paddingLeft: 10}}>
              <DropdownToggle outline>
                Menu
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem style={{ cursor:"pointer", }} onClick={() => setModalShowContact(true)}> 
                  Nous contacter 
                </DropdownItem>
                
                {/* <DropdownItem style={{cursor:"pointer"}} onClick={() => setModalShowShare(true)}>
                  Share
                <img style={{position: 'relative' ,rigth:5}} src={require('../images/share 1.svg')}  alt="share"/>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={() => setModalShowPolitique(true)} style={{ paddingTop:10, cursor:"pointer", }}>
                  Politique de confidentialité
                </DropdownItem>
                <DropdownItem onClick={() => setModalShowMention(true)} style={{ paddingTop:10, cursor:"pointer", }}>
                  Mentions Légales
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          {/*fin Footer */}

            
              {avatar=== '' ?
                ''
                : 
                <div>
                  <Link to="/ScreenUser">
                    <img style={{height:50, width:50, paddingTop: "0.30rem"}} src={avatar} alt=""/> 
                  </Link>
                  
                </div>
              } 
      </Col>      
    </nav>
  </div>
  );

}
    //-----------FIN COMPOSANT PRESENTATION-----------//


  function mapStateToProps(state){
    return {tokenToDisplay: state.token, avatarToDisplay: state.avatar}
  }

function mapDispatchToProps(dispatch){
  return {
    addToToken: function(token){
      dispatch({type: 'addToken', token})
    },
    logout: function(token) {
      dispatch({type: 'removeToken', token})
    },
    newAvatar: function(avatar) {
      dispatch({type: 'addavatar', avatar})
    },
    userAvatar: function(avatar) {
      dispatch({type: 'getavatar', avatar})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomIconSwitch)

