import React,{useEffect, useState} from 'react';
import {Col, Row, Card, CardTitle, CardText,CardSubtitle, CardBody, Spinner,
Table, Button,} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

function ScreenOtherUser(props) {
  const [userId, setUserId]= useState('')
  const [P2Id, setP2Id] = useState('')
  const [P2, setP2] = useState("")



  useEffect(() => {
    // console.log('props.p2', props.p2);
    // console.log("props.userId", props.userId);
    setUserId(props.tokenToDisplay)
    if(props.match.params.p2id){
      setP2Id(props.match.params.p2id)
    }
    

console.log("je passe bien à ScreenOtherUser")
console.log("props.params.p2id", props.match.params.p2id)


    async function fetchdata (){
      const response = await fetch('/users/findP2',{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `P2Id=${props.match.params.p2id}`})
      const findP2 = await response.json()
      console.log("findP2 otheruser",findP2)
      setP2(findP2)
    }
    fetchdata()
    }, [props.userId, props ])

console.log("P2___________", P2);

if(P2 !== "" ){
  var serviceList = []
  for (var i=0; i<P2.service.length; i++){
    serviceList.push(
      <CardText style={{marginLeft:20}}><span style={{fontWeight:"bold"}}>{P2.service[i].service}</span>: <span style={{fontStyle:"italic"}}> {P2.service[i].tag} </span>  </CardText>
    )
  }
  
  

  var GameList = []
  for (var j=0; j<P2.idGame.length; j++){
    GameList.push(
      <tr key={i}>
          <td><img src={P2.idGame[j].cover} style={{borderRadius: "10px"}} alt="game cover"></img></td>
          <td className="align-middle">{P2.idGame[j].plateforme}</td>
          <td className="align-middle">{P2.idGame[j].name}</td>
        </tr>
    )
  }
console.log(GameList);

    //AJOUTER UN P2
    async function handleClickAddMatch (P2Id) {
      const response = await fetch('/addMatch', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idP2=${props.match.params.p2id}&&userId=${userId}`
      });
      const backResponse = await response.json()
      console.log("backResponse", backResponse);
      if(backResponse.result === true){
      }
    }

// ____________________________________ RETURN ____________________________________
  return (
<div className="backgroundColor">

<Row>

<Col>
<CardBody>
<Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
    <Col className="cardbody">
    <Row style={{justifyContent: 'center'}}>
        <Col xs="auto">
          <img src={P2.avatar} style={{ height:40, width: 50 }} alt="userAvatar" />
        </Col>
        <Col xs="auto">
          <CardTitle style={{margin:0}}>{P2.pseudo}</CardTitle> 
        </Col>
        <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
              <Button size="sm" onClick={()=> handleClickAddMatch(P2Id)} >Ajouter</Button>
              </Col>

      </Row>
      <br></br>
      {/* <div> */}
          {/* <CardSubtitle>Description</CardSubtitle> */}
          {/* <br></br> */}
          {/* <CardText>{P2.description}</CardText> */}
      {/* </div> */}
      {/* <br></br>
      <br></br> */}
      <div>
        <CardSubtitle style={{size:13, fontWeight: "bold"}} >Le retrouver sur:</CardSubtitle>
      </div>

      <br></br>
      {serviceList}
    </Col>
    </Card>
    </CardBody>
</Col>

<Col>
{/* LISTE DE SES JEUX */}
<Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}>
      <CardTitle style={{ alignSelf: 'center'}}>Ses jeux 
      </CardTitle>


    <Col className="cardbody">
    <Table style={{color:'white'}}>
      <tbody>
        {GameList}
      </tbody>
    </Table>
    </Col>
    </Card>
</Col>

</Row>

</div>
    );
} else {
  return (
    <div className="backgroundColor" >
      <Spinner  style={{height: 80, padding: 40, position:"sticky", top:"50%", left:"50%"}} color="danger" />
    </div>
    
  )
}
}  

function mapStateToProps(state){
  return {userId: state.user, /*p2:state.p2*/}
}

function mapDispatchToProps(dispatch){
  return {
    getUserId: () => {
      dispatch({type: 'getUserId'})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenOtherUser)


