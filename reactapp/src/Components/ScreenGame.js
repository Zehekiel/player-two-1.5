import React, { useEffect, useState } from 'react';
import { Col, Container, Row, FormGroup, Label, Input, Form, Card, Button, Table,} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {Modal,} from 'react-bootstrap';

function ScreenGame(props) {

  const [plateformList, setPlateformList]= useState([])
  const [plateformSelect, setPlateformSelect]= useState([])
  const [serviceList, setserviceList]= useState([])
  const [plateformIcon, setplateformIcon]= useState('')
  const [serviceSelect, setServiceSelect] =useState('...')
  const [Redirection, setRedirection] = useState(false)
  const [tag, setTag]= useState("")
  const [searchGame, setSearchGame]= useState("")
  const [addGame, setAddGame]= useState("")
  const [cover, setCover]= useState("")
  const [gameName, setGameName]= useState("")
  const [gameListSelected, setGameListSelected] = useState([])
  const [searchGameList, setSearchGameList] = useState([])
  const [modalShow, setModalShow] = useState(false)

  // ___________ useEffect ___________
  useEffect( () => {
    console.log("token 1 ", props.tokenToDisplay);
    

    async function fetchdata (){
    // plateform from back
    const platerformResponse = await fetch("/plateform");
    const response = await platerformResponse.json()
    setPlateformList(response)

    //vérifier si User est connecté (store Redux)
    if(props.tokenToDisplay === ""){
      setRedirection(false)
    }
    } 
    fetchdata()
    }, [props.tokenToDisplay, props])

  //afficher les services par défaut attaché à la plateforme
    const handlePlateformeSelect = async (clickPlateform) => {
      setPlateformSelect(clickPlateform)
      const serviceResponse =await fetch('/service', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `plateformSelect=${clickPlateform}`
      });
      const response = await serviceResponse.json()
      console.log("serviceresponse", response );
      setServiceSelect(response.service[0])

      const usersresponse = await fetch('/users/finduser', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.tokenToDisplay}`
      });
      const userResponse = await usersresponse.json()
      console.log("userResponse ",userResponse.userFind);

      if(userResponse.userFind.service[0]){
        setTag(userResponse.userFind.service[0].tag)
      }
        //récupéré img et service from back selon plateformeSelect
        setserviceList(response.service)
        setplateformIcon(response.img)
    }; 

    //Changement dans Input JEUX
    const handleSearchGame = async (game) => {
      setSearchGame(game)
    }; 
    
    // CLICK sur le bouton SEARCH
    const handleClickSearchGame = async (game) => {
      const response =await fetch('/searchgame', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `searchGame=${searchGame}&&plateforme=${plateformSelect}`
      });
  
    var searchGameresponse = await response.json()
    console.log("searchGameresponse",searchGameresponse);

    //vérifier si chaque jeux from APi a un Cover
    for(var i = 0; i<searchGameresponse.length; i++){
      //sinon lui en rajouter un par défaut
      if (searchGameresponse[i].cover === undefined){
        var object = {...searchGameresponse[i], cover:{'url':''}}
        searchGameresponse[i] = object
      } 
    }
    
    if (searchGameresponse) {
      console.log("passe par if searchGameresponse");
      setSearchGameList(searchGameresponse)
      setModalShow(true)
      searchGameresponse = false
    }
  }

    // ___________ CLIC ADD sur un jeux de la liste proposé par l'API
    const handleGameSelect = (gameselect) => {
      console.log("gameselect ",gameselect);
      setGameName(gameselect.name)
      setCover(gameselect.cover.url)
      setAddGame(gameselect)
      setGameListSelected(addGame)
      setModalShow(false)
      // mapDispatchToProps(gameListSelected)
    }
    console.log("gameListSelected ",gameListSelected);
    console.log("addGame.cover.url", addGame);
    
    var iconGameSelected
    var gifchosen
    if (addGame !== '') {
      iconGameSelected = <img src={`${addGame.cover.url}`} style={{padding:'5px', height: '50px', width:'50px', borderRadius: "10px", marginRight: "10px"}} alt=""/>
      gifchosen = <img src="https://media.giphy.com/media/X0F1Tw5ZcIYkU/giphy.gif" style={{position: "relative", left:"28%"}} alt=""/>
    }


  //afficher le logo de la plateforme
    let plateformIconaffiche = "";
    let paddingData= "45px"
    
    if(plateformIcon !== ""){
      plateformIconaffiche = <img src={plateformIcon} style={{padding:'5px', height:"45px"}} alt="platform icon"/>
      paddingData= "0px"
      } 
    


    // ___________ ON CLICK START ___________
    async function OnclickStartGame(){
      
      console.log("serviceselect", serviceSelect);
      console.log("tag", tag);

      //envoyer le jeux au back
      const gameResponse =await fetch('/addgame', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `plateform=${plateformSelect}&&name=${gameName}&&cover=${cover}&&service=${serviceSelect}&&tag=${tag}&&token=${props.tokenToDisplay}`
      });
      const response = await gameResponse.json()
      console.log("gameresponse", response);
      //récupérer result from back pour redirect ou non
      if (response){
        setRedirection(true)
      }
    };

console.log(Redirection);

    // redirect ou non selon réponse du back
    if(Redirection){
      return( 
      <Redirect to='/screenmatchpage'/>)
    };


// MODAL 
const MyVerticallyCenteredModal= (props) => {

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}
              >
      <Modal.Header style={{backgroundColor: '#010212'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212'}}>
          Recherche de Jeux
        </Modal.Title>
        <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0,}} onClick={props.onHide}><img src={require('../images/cross_modal.svg')} alt=""/></Button>
      </Modal.Header>

        <Modal.Body style={{color: 'white', backgroundColor: '#010212', alignContent:"center", borderBottomLeftRadius:50}}>

    <Table style={{color:'white'}}>
      { searchGameList.map((game, i)=>( 
        <tbody key={i}>
          <tr >
          <td><img src={`${game.cover.url}`} alt="game cover"></img></td>
          <td className="align-middle">{game.name}</td>
          <td className="align-middle"> 
            <Button onClick={()=>handleGameSelect(game)} outline style={{fontSize:16, fontFamily: 'Comfortaa'}}>Add</Button>
          </td>
        </tr>
        </tbody>        
        ))}
    </Table>
    </Modal.Body>
    </Modal>
  );
}



  // __________________________________ RETURN __________________________________
  return (
    <div className="backgroundColor">

      <Row className="titleTeam" style={{marginTop:30, alignItems:"center"}}>
        <img style={{height:"60px", marginRight:"30px" }} src={require('../images/joystick1.svg')}  alt="team"/>
        <h1  className="heading" style={{marginBottom: 5}}>Ajoute un jeux</h1>
      </Row>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Container>
        <Row xs="1" style={{justifyContent:"center"}}>

          <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" ,backgroundColor: '#010212', borderRadius: "0px 50px", flexDirection:"row", padding:"50px 70px", margin: 50}}>

            <Col>
              {/* PLATEFORME */}
              <Form > 
                <FormGroup style={{alignItems: "center"}} row>
                  <Label style={{ margin:"0px", justifyContent: "start"}} >Plateforme*</Label>
                  <Col>
                  <Input required style={{borderRadius:25}}  onChange={(e) => handlePlateformeSelect(e.target.value) } type="select" >
                    <option> ... </option> 
                    { plateformList.map((plateform, i)=>(
                      <option onClick={(e) => handleGameSelect(e.target.value) } key={i}>{plateform.plateform}</option>
                    ))}
                    
                  </Input>
                    {plateformIconaffiche}

                  </Col>
                </FormGroup>

                {/* JEUX */}
                <FormGroup style={{paddingTop: paddingData, alignItems: "center"}} row>
                  <Label style={{ margin:"0px" }} className="font">Jeux*</Label>
                  <img onClick={(e) => handleClickSearchGame(e.target.value)}  style={{height:25, paddingLeft:25}} src={require("../images/search.svg")} alt=""/>
                  <Col>
                    <Input required style={{borderRadius:25}} onChange={(e)=> handleSearchGame(e.target.value)} type="search">
                    </Input>
                    {iconGameSelected}
                  </Col>
                  
                </FormGroup>
                
              </Form>
              
            </Col>
            
            {/* SERVICE */}
            <Col style={{marginLeft:"30px"}}>
              <Form>
              <FormGroup style={{alignItems: "center"}} row>
                  <Label style={{ margin:"0px" }} className="font">Service*</Label>
                  <Col>
                    <Input style={{borderRadius:25}} onChange={(e) => setServiceSelect(e.target.value)} type="select" placeholder={serviceSelect}>
                    <option >{serviceSelect}</option>
                    { serviceList.map((service, i)=>(
                      <option key={i}>{service}</option>
                    ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup style={{paddingTop:"45px", alignItems: "center"}} row>
                  <Label style={{ margin:"0px" }} className="font" >Service ID*</Label>
                  <Col>
                    <Input style={{borderRadius:25}} onChange={(e) => setTag(e.target.value)} type="text"  placeholder={tag}/>
                  </Col>
                </FormGroup>
              </Form>
            </Col>

          </Card>

        </Row>
        {gifchosen}

         {/* START BUTTON */}           
        <Row className="nextButton boldFont" style={{margin:0, paddingTop:25,}}>
          <Button color="transparent" onClick={OnclickStartGame} style={{padding: 0}}>
            <img style={{height:"100px", width:"100px"}} src={require('../images/button.svg')} alt="button start"/>
            <div className="textButton">Start</div>
          </Button>
        </Row>

      </Container>

    </div>

    );
}

// REDUX
function mapStateToProps(state){
  return {tokenToDisplay: state.token}
}

function mapDispatchToProps(dispatch) {
  return {
    onStartGameClick: function(data) { 
        dispatch({type: 'savegame', data}) 
    },
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    },
  } 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenGame);

