import React, { useEffect, useState } from 'react';
import { Col, Container, Row, FormGroup, Label, Input, Form, Card, Button,
    InputGroup, InputGroupAddon,} from 'reactstrap';
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
  // const [gameListSelected, setGameListSelected] = useState([])  POUVOIR AJOUTER PLUSIEURS JEUX A LA FOIS
  const [searchGameList, setSearchGameList] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [displayService, setDisplayService] = useState("none")
  const [displaySearchGame, setDisplaySearchGame] = useState("none")
  const [outlineSearch, setOutlineSearch] = useState("sucess")




  // ___________ useEffect ___________
  useEffect( () => {
    

    async function fetchdata (){
      // plateform from back
      const platerformResponse = await fetch("/plateform");
      const response = await platerformResponse.json()
      setPlateformList(response)
      } 
      fetchdata()
    }, [props.tokenToDisplay, props])



  //afficher les services par défaut attaché à la plateforme
    const handlePlateformeSelect = async (clickPlateform) => {
      setPlateformSelect(clickPlateform);
      setDisplaySearchGame("block");
      const serviceResponse =await fetch('/service', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `plateformSelect=${clickPlateform}`
      });
      const response = await serviceResponse.json()
      setServiceSelect(response.service[0])

      const usersresponse = await fetch('/users/finduser', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.tokenToDisplay}`
      });
      const userResponse = await usersresponse.json()
      // console.log("userResponse ",userResponse.userFind);
      

      if(userResponse.userFind.service[0]){
        setTag(userResponse.userFind.service[0].tag)
      }
        //récupéré img et service from back selon plateformeSelect
        setserviceList(response.service)
        setplateformIcon(response.img)
        setDisplaySearchGame("block")
    }; 

    //Changement dans Input JEUX
    const handleSearchGame = async (game) => {
      setSearchGame(game)
      if (searchGame.length>=2){
        setOutlineSearch("danger")
      }
    }; 
    
    // CLICK sur le bouton SEARCH
    const handleClickSearchGame = async (game) => {
      const response =await fetch('/searchgame', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `searchGame=${searchGame}&&plateforme=${plateformSelect}`
      });
  
    var searchGameresponse = await response.json()
    // console.log("searchGameresponse",searchGameresponse);

    //vérifier si chaque jeux from APi a un Cover
    for(var i = 0; i<searchGameresponse.length; i++){
      //sinon lui en rajouter un par défaut
      if (searchGameresponse[i].cover === undefined){
        var object = {...searchGameresponse[i], cover:{'url':require('../images/ghost.svg')}}
        searchGameresponse[i] = object
      } 
    }

    if (searchGameresponse.length > 0) {
      setSearchGameList(searchGameresponse)
      setModalShow(true)
      searchGameresponse = false
    } 

    if(searchGameresponse.length === 0) {
      setSearchGameList([{cover:{url:require("../images/JohnTravolta.gif")}, name: `0 jeu trouvé, tu es sûr(e) du nom?` }])
      setModalShow(true)
    }
  } 

    // ___________ CLIC ADD sur un jeux de la liste proposé par l'API
    const handleGameSelect = (gameselect) => {
      setGameName(gameselect.name)
      setCover(gameselect.cover.url)
      setAddGame(gameselect)
      // setGameListSelected(addGame)
      setModalShow(false)
      setDisplayService("block")
      // mapDispatchToProps(gameListSelected)
    }
    
    var iconGameSelected
    var gifchosen
    if (addGame  && tag!== '') {
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
      
      //envoyer le jeux au back
      const gameResponse =await fetch('/addgame', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `plateform=${plateformSelect}&&name=${gameName}&&cover=${cover}&&service=${serviceSelect}&&tag=${tag}&&token=${props.tokenToDisplay}`
      });
      const response = await gameResponse.json()
      //récupérer result from back pour redirect ou non
      if (response){
        setRedirection(true)
      }
    };

    // redirect ou non selon réponse du back
    if(Redirection){
      return( 
      <Redirect to='/screenmatchpage'/>)
    };

    // if (!props.tokenToDisplay){
    //   return <Redirect to="/"  />
    // }


// ___________ SearchGameModal MODAL ___________
const SearchGameModal= (props) => {

  return (
    <Modal
      {...props}
      centered
      style={{borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}
    >
      <Modal.Header >
        <Modal.Title>
          Recherche de Jeux
        </Modal.Title>
        <Button color="primary" onClick={props.onHide}> <img src={require('../images/cross_modal.svg')} alt=""/></Button>
      </Modal.Header>

      <Modal.Body>
          { searchGameList.map((game, i)=>( 
            <div key={i} className='divmapwithoutbr' target="_blank" style={{display: "flex", textDecoration: "none", }}> 
              <img src={`${game.cover.url}`} style={{borderRadius:"0px 0px 0px 30px", height:90, width:90,}} alt="game cover"></img>
              <p>{game.name}</p>
              <Button onClick={()=>handleGameSelect(game)} outline style={{fontSize:16, fontFamily: 'Comfortaa', paddingLeft:-35}}>Add</Button>
            </div>
            ))}
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

      <SearchGameModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Container>
        <Row xs="1" style={{justifyContent:"center"}}>
          <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" ,backgroundColor: '#010212', borderRadius: "0px 50px", flexDirection:"row", padding:"50px 70px", margin: 50}}>
            <Col>

              {/* PLATEFORME */}
              <Form > 
                <FormGroup style={{alignItems: "center"}} className="boldFont" row>
                  <Label md={2} style={{ margin:"0px", justifyContent: "start"}} >Plateforme*</Label>
                  <Col md={6}>
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
                <div  style={{display:displaySearchGame}}>
                  <FormGroup className="boldFont" style={{paddingTop: paddingData, alignItems: "center", paddingBottom: 15, }} row>
                  <Label md={2} style={{ margin:"0px" }} className="font">Jeux* </Label>
                  <Col md={6}>
                  <InputGroup>
                    <Input required style={{borderRadius:25}} onChange={(e)=> handleSearchGame(e.target.value)} type="search" placeholder="ex: GTA 5, Fortnite, ..."/>
                    <InputGroupAddon addonType="append" style={{paddingLeft:10}}>
                      <Button color={outlineSearch} outline onClick={(e) => handleClickSearchGame(e.target.value)} style={{borderRadius:25}}>
                        Résultats
                        <img   style={{height:15, paddingLeft:10}} src={require("../images/search.svg")} alt=""/>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                    
                    {iconGameSelected}
                  </Col>
                  
                </FormGroup>
                </div>
                
                
              {/* SERVICE */}
              <div  style={{display:displayService, borderTop: "1px solid #A58CA3", paddingTop: 25}}>
              <FormGroup className="boldFont" style={{alignItems: "center"}} row>
                  <Label  md={2} style={{ margin:"0px" }} className="font">Service*</Label>
                  <Col md={6}>
                    <Input style={{borderRadius:25}} onChange={(e) => setServiceSelect(e.target.value)} type="select" placeholder={serviceSelect}>
                    <option >{serviceSelect}</option>
                    { serviceList.map((service, i)=>(
                      <option key={i}>{service}</option>
                    ))}
                    </Input>
                  </Col>
                </FormGroup>

                {/* TAG */}
                <FormGroup className="boldFont" style={{paddingTop:"45px", alignItems: "center"}} row>
                  <Label md={2} style={{ margin:"0px" }} className="font" >Service ID*</Label>
                  <Col md={6}>
                    <Input style={{borderRadius:25}} onChange={(e) => setTag(e.target.value)} type="text"  placeholder={tag}/>
                  </Col>
                </FormGroup>
              </div>
              
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

