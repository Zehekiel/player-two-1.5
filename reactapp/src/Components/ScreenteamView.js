import React from 'react';
import '../App.css';
import {
  Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, Row,
} from 'reactstrap';
import { Col } from 'react-bootstrap';


function ScreenteamView() {
  
  return (
    // TEAM TITLE
    <div className="backgroundColor">
      <Row className="titleTeam">
        <img style={{height:"70px", marginRight:"30px", marginBottom: "20px" }} src={require('../images/helmet-5.jpg')}  alt="team"/>
        <h1  className="heading">Team's name</h1>
      </Row>

      <CardColumns>
                  
      {/*______ GAME ______*/}
      <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
        <Col  className="cardbody">
          <CardTitle>Game</CardTitle>
          <Row style={{paddingLeft: "25px", paddingBottom: "15px", alignItems:"center"}}>
            <CardImg style={{height: '50px', width:'50px', borderRadius: "10px", marginRight: "10px"}} top width="100%" src={require('../images/bf5.jpg')} alt="game image 1" />
            <CardText>Battlefield 5 </CardText>
          </Row>
          <Row style={{paddingLeft: "25px", paddingBottom: "15px", alignItems:"center"}}>
            <CardImg style={{height: '50px', width:'50px', borderRadius: "10px", marginRight: "10px"}} top width="100%" src={require('../images/helmet-5.jpg')} alt="game image 2" />
            <CardText>Halo 5 </CardText>
          </Row>
        </Col>
      </Card>


      {/*______ Description ______ */}
      <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
      <Col className="cardbody">
        <CardTitle >Description</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <CardImg style={{height:"20px"}} src={require('../images/three_dots.svg')}></CardImg>
      </Col>
      </Card>


{/*______ ACTU ______ */}
      <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
        <Col className="cardbody">
          <CardTitle>Actu</CardTitle>
          <CardSubtitle>news 1</CardSubtitle>
          <CardText>- This is a wider card with supporting text below as a natural lead-in</CardText>
          <CardSubtitle>news 2</CardSubtitle>
          <CardText>- This is a wider card with supporting text below as a natural lead-in</CardText>
          <CardImg style={{height:"20px"}} src={require('../images/three_dots.svg')}></CardImg>
        </Col>
      </Card>


      {/* Philosophie */}
      <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
        <Col className="cardbody">
          <CardTitle>Philosophie</CardTitle>
          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
          <CardImg style={{height:"20px"}} src={require('../images/three_dots.svg')}></CardImg>
        </Col>
      </Card>


      {/* ______ MEMBRE ______*/}
      <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
        <Col className="lastcard">
          <CardTitle>Membre</CardTitle>


        {/* ADMIN */}
        <Row className="usertitle">
          <CardSubtitle style={{margin:"0px"}}>Admin</CardSubtitle> 
          <CardText>nb: 1</CardText>
        </Row> 
        
          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Username 1</CardText>
          </Row>


        {/* SOUS ADMIN */}
        <Row className="usertitle">
          <CardSubtitle style={{margin:"0px"}}>Sous Admin</CardSubtitle> 
          <CardText>nb: 2</CardText>
        </Row> 

          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Sous Admin 1</CardText>
          </Row>
          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Sous Admin 2</CardText>
          </Row>


        {/* Member */}
        <Row className="usertitle">
          <CardSubtitle style={{margin:"0px"}}>Sous Admin</CardSubtitle> 
          <CardText>nb: 3</CardText>
        </Row>

          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Member 1</CardText>
          </Row>

          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Member 2</CardText>
          </Row>
          <Row className="user">
            <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
            <CardText>Member 3</CardText>
          </Row>
          <CardImg style={{height:"20px"}} src={require('../images/three_dots.svg')}></CardImg>

        </Col>
        
      </Card>

    </CardColumns>

    </div>
  );
};


export default ScreenteamView;

// div Title
  // avatar team
  // team's name
// div Title

// cards
  // game
    //game's list from back
    //fetch get

  //Description
    //Description from back
    // fetch get

  // Members
    // admin
        //adminList from back
        // fetch get
      // admincount
        //count from back
        //fetch get
    // sousAdmin
        //sousAdminList from back
        // fetch get
      // sousAdminCount
        //count from back
        //fetch get
    // Regular
        //Regularlist from back
        // fetch get
      // RegularCount
        //count from back
        //fetch get

  //Philosophie
    //Philosophie from back
    // fetch get

  //teamActu
    //teamActu from back
    // fetch get


// cards