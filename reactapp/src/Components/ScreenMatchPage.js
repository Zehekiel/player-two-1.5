import React, { useEffect, useState } from 'react';
import {
  Card,  CardTitle, CardText, Button, Table,
  Row, Container, CardBody, Spinner , Progress, 
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

    if (!props.tokenToDisplay){
      return <Redirect to="/"  />
    }

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
            <Row style={{paddingTop:25}}>
              <h1  className="heading">Your Players Two</h1>
              {/* <Row>
              <Button style={{marginLeft:600}} onClick={(()=> handleClickAddAllMatch())} size="sm">Ajouter tout</Button>
              </Row>*/}
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
            function NbPair(Nb){
              if(Nb/2 == Math.round(Nb/2)) return true;
              else return false;
            }

            if (NbPair(newMatchList[i].idGame.length) == false ) {
              var ColumnCompensation =
                  <Row>
                    <p style={{height:85, width:85,borderRadius:"0px 0px 0px 40px"}} ></p>
                  </Row>
                
              } 
            
              for( var l=0; l<newMatchList[i].idGame.length ; l++){
                gameCoverPlateformTable.push(
                  <Row className="divmapmatch" >
                    <img src={(`https:${map.idGame[l].cover}`)} style={{height:85, width:85,borderRadius:"0px 0px 0px 40px"}} alt="game cover"></img>
                    <p>{map.idGame[l].name}</p>
                    <p style={{marginRight:15, width: 90, justifyContent:"start-end"}}>{map.idGame[l].plateforme}</p>
                  </Row>
                )
              }
            
            
            return ( 
          <CardBody   key={i} className="card-background" style={{marginTop: 10 }}>
            <Row style={{alignItems:"center", justifyContent:"space-between", marginLeft: 15, marginBottom:15 , padding:0}}>
              <Link to={`/screenotheruser/${map._id}`}>
                <img height="50px" width="50px" src={map.avatar} alt="avatar P2" />
              </Link>
              <Col xs="auto" style={{margin:"0px 20px"}}>
                <Link to={`/screenotheruser/${map._id}`}>
                  <CardTitle >{map.pseudo}</CardTitle>
                </Link>
                <Progress animated style={{marginBottom: 10}} color="success"  value= {map.idGame.length}   max={user.idGame.length} />
              </Col>
              <Col xs="auto">
                {serviceTagTable}
              </Col>
              <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                <Button size="sm" onClick={()=> handleClickAddMatch(map)} style={{marginRight:30}} >Ajouter dans ta liste</Button>
              </Col>
            </Row>
            <Card style={{backgroundColor:"#010212", marginBottom: 10, justifyContent:"center", padding :"20px 15px 5px 15px", borderRadius: 20}}>
              
              <Col style={{columnCount:2, columnGap: "3em",columnFill:"auto",gridTemplateRows:"200px repeat(auto-fill, 100px) 300px"}}>
                {gameCoverPlateformTable}
                {ColumnCompensation}

              </Col>

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