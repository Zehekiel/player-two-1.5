import React, { useEffect, useState } from 'react';
import {
  Card,  CardTitle, CardText, Button, Table,
  Row, Container, CardBody, Spinner , Progress
} from 'reactstrap';
import { Col } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';


function ScreenMatchPage(props) {
  // const [Redirection, setRedirection] = useState(false)
  const [matchList, setMatchList] = useState([])
  const [display, setDisplay] = useState('flex')
  const [user, SetUser]= useState('')
  const [error, setError]= useState('')

  useEffect( () => {
    
    if (!props.tokenToDisplay){
      return <Redirect to="/"  />
    }

    if (props.tokenToDisplay){
      async function fetchdata (){
      // plateform from back
      const response = await fetch("/findmatch", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.tokenToDisplay}`
      });
      const matchResponse = await response.json()
      // console.log("matchResponse ",matchResponse);

      setMatchList(matchResponse.matchList);
    
      if (matchResponse.error){
        setError(matchResponse.error)
        setDisplay('none')
      }

    //vérifier si User est connecté (store Redux à terme)
    
      //si oui récupérer ses info dans DBA
      const findUserResponse = await fetch('/users/finduser', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.tokenToDisplay}`
      });
      const userResponse = await findUserResponse.json()
      // console.log("userResponse", userResponse.userFind);
      SetUser(userResponse.userFind)
    }
    
    fetchdata()
  }
    }, [props.tokenToDisplay, props])

    //AJOUTER UN P2
    async function handleClickAddMatch (addP2) {
      const response = await fetch('/addMatch', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idP2=${addP2._id}&&token=${props.tokenToDisplay}`
      });
      const backResponse = await response.json()
      // console.log("backResponse", backResponse);
      if(backResponse.result === true){
        
      }
    }

    // // AJOUTER TOUS LES MATCHS
    // async function handleClickAddAllMatch(){
    //   const response = await fetch('/addAllMatch', {
    //     method: 'POST',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     body: `matchList=${matchList}` /* renvoie un String [OBJECT] */
    //   });
    //   const backAddAllResponse = await response.json()
    //   console.log("backAddAllResponse ", backAddAllResponse);
    // }

      if (matchList.length !== 0 && user !== ""){
      // TRIER PAR NB DE JEUX MATCHER
      var newMatchList = matchList.sort(function(a, b){
        return b.idGame.length - a.idGame.length
      })
      // console.log("newMatchList", newMatchList);
      



    // ____________________________________ RETURN ____________________________________
    return (
      <div className="backgroundColor">
        <Container>
            <Row className="titleTeam" style={{paddingTop:25}}>
              <Col className="cardbody">
              <h1  className="heading">Your Player Two</h1>
              {/* </Col>
              <Col>
              <Row>
              <Button style={{marginLeft:600}} onClick={(()=> handleClickAddAllMatch())} size="sm">Ajouter tout</Button>
              </Row>*/}
              </Col> 
            </Row>
  
          {newMatchList.map((map, i)=> { 
            //AFFICHER SERVICE & TAG
            var serviceTagTable = []
            for( var j=0; j<newMatchList[i].service.length ; j++){
              serviceTagTable.push(
                <CardText key={j} style={{  fontFamily: 'Comfortaa, cursive', color:" #F9F5FF"}} > {map.service[j].service} : {map.service[j].tag} </CardText>
              )
            }

            //AFFICHER Jeux cover & plateforme
            var gameCoverPlateformTable = []
            for( var l=0; l<newMatchList[i].idGame.length ; l++){

              gameCoverPlateformTable.push(
                <div>
                  <tr key={l}>
                    <td><img src={(`https:${map.idGame[l].cover}`)} alt="game cover"></img></td>
                    <td className="align-middle">{map.idGame[l].name}</td>
                    <td className="align-middle">{map.idGame[l].plateforme}</td>
                  </tr>
                </div>
              )
            }

            
            
            return ( 
          <CardBody   key={i} className="card-background" style={{marginTop: 10 }}>
            <Row style={{alignItems:"center", justifyContent:"space-between", marginLeft: 15, marginBottom:15 , padding:0}}>
            <Link to={`/screenotheruser/${map._id}`}><img height="50px" width="50px" src={require("../images/P2.svg")} alt="avateur P2" /></Link>
              <Col xs="auto">
              <Link to={`/screenotheruser/${map._id}`}><CardTitle >{map.pseudo}</CardTitle></Link>
                  <Progress animated style={{marginBottom: 10}} color="success"  value= {map.idGame.length}   max={user.idGame.length} />
              
              {serviceTagTable}
              </Col>
              <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
              <Button size="sm" onClick={()=> handleClickAddMatch(map)} >Ajouter</Button>
              </Col>
            </Row>

            <Card style={{backgroundColor:"#010212", marginBottom: 10, justifyContent:"center", padding : 15}}>
            <Table style={{color:'white'}}>
              {gameCoverPlateformTable}
              </Table>
            </Card>
          </CardBody>
          )} 
          )}
      </Container>
  
      </div>
    );
  } else {
    return (
      <div className="backgroundColor" style={{alignItems:"center", justifyContent: "center"}}>
        <span  className="heading">{error}</span>
        <Spinner  style={{display:`${display}`, height: 80, padding: 40, position:"sticky", top:"50%", left:"50%"}} color="danger" />
      </div>
      
    )
  }
  
};

function mapStateToProps(state){
  return {tokenToDisplay: state.token}
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
  mapDispatchToProps)
(ScreenMatchPage)