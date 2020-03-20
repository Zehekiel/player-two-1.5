import React from 'react';
import '../App.css';
import {
  Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, Row,
} from 'reactstrap';
import { Col } from 'react-bootstrap';

function ScreenteamAdmin() {
  return (
    // TEAM TITLE
  <div className="backgroundColor">
    <div className="titleTeam row">
      <img style={{height:"50px", marginRight:"30px", marginBottom: "20px" }} src={require('../images/helmet-5.jpg')}  alt="team"/>
      <h1  className="heading">Team's name</h1>
    </div>


  <CardColumns xs="12" sm="6" >
    {/*______ GAME ______*/}
    <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
      <Col  className="cardbody">
        <Row>
          <CardTitle>Game</CardTitle>
          <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px", marginRight: "10px"}} src={require('../images/Vector.svg')} alt="vector"/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')} alt="add"/>
          </Col>
        </Row>
        

        <Row style={{paddingLeft: "25px", paddingBottom: "15px", alignItems:"center"}}>
          <CardImg style={{height: '40px', width:'40px', borderRadius: "30px", marginRight: "10px"}} top width="100%" src={require('../images/bf5.jpg')} alt="game image 1" />
          <CardText>Battlefield 5 </CardText>
        </Row>
        <Row style={{paddingLeft: "25px", paddingBottom: "15px", alignItems:"center"}}>
          <CardImg style={{height: '40px', width:'40px', borderRadius: "30px", marginRight: "10px"}} top width="100%" src={require('../images/bf5.jpg')} alt="game image 2" />
          <CardText>Battlefield 5 </CardText>
        </Row>
      </Col>
    </Card>


    {/*______ Candidature ______ */}
    <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
      <Col className="cardbody">
        <CardTitle>Candidature</CardTitle>
        <Row className="user" style={{display:"flex", justifyContent:"space-between"}}>
          <img style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="" />
          <text>Candidat 1</text>
          <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px"}} src={require('../images/Vector.svg')} alt=""/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')} alt=""/>
          </Col>
        </Row>
        <Row className="user" style={{display:"flex", justifyContent:"space-between"}}>
          <img style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="" />
          <text>Candidat 2</text>
          <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px"}} src={require('../images/Vector.svg')} alt="vector 2"/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')}alt="add 2"/>
          </Col>
        </Row>
      </Col>
    </Card>


    {/* Philosophie */}
    <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
      <Col className="cardbody">
        <CardTitle>Philosophie</CardTitle>
        <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
        <CardImg style={{height:"20px"}} src={require('../images/adjust 1.svg')}></CardImg>
      </Col>
    </Card>


    {/*______ Description ______ */}
    <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
    <Col className="cardbody">
      <CardTitle >Description</CardTitle>
      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
      <CardImg style={{height:"20px"}} src={require('../images/adjust 1.svg')}></CardImg>
    </Col>
    </Card>


    {/* ______ MEMBRE ______*/}
    <Card style={{ backgroundColor: '#010212', borderRadius: "0px 50px", boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)" }}>
      <Col className="cardbody">
        <Row style={{display:"flex", alignItems:"center"}}>
          <CardTitle>Membre</CardTitle>
          <span style={{padding:"0 15px"}}>Total: 1</span>
        </Row>
        


      {/* ADMIN */}
      <Row className="usertitle" style={{display:"flex", justifyContent:"space-between"}}>
        <span style={{paddingRight:"10px"}}>1</span>
        <CardSubtitle style={{margin:"0px"}}>Admin</CardSubtitle> 
        <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px"}} src={require('../images/Vector.svg')} alt="vector "/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')} alt="add 3"/>
          </Col>
      </Row> 
      
        <Row className="user">
          <CardImg style={{height: '20px', width:'20px', marginRight: "10px"}} top width="100%" src={require('../images/user-solid.svg')} alt="Card image cap" />
          <CardText>Username 1</CardText>
        </Row>

      {/* SOUS ADMIN */}
      <Row className="usertitle" style={{display:"flex", justifyContent:"space-between"}}>
      <span style={{paddingRight:"10px"}}>2</span>
        <CardSubtitle style={{margin:"0px"}}>Sous Admin</CardSubtitle> 
        <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px"}} src={require('../images/Vector.svg')} alt="vector 4"/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')} alt="add4"/>
          </Col>
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
      <Row className="usertitle" style={{display:"flex", justifyContent:"space-between"}}>
      <span style={{paddingRight:"10px"}}>3</span>
        <CardSubtitle style={{margin:"0px"}}>Membre</CardSubtitle>
        <Col style={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
            <img style={{height:"17px", width:"17px"}} src={require('../images/Vector.svg')} alt=""/>
            <img style={{height:"20px", width:"20px", marginRight: "10px"}} src={require('../images/add 1.svg')} alt=""/>
          </Col>
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
}

export default ScreenteamAdmin;

// div Title
  // avatarTeam
  // teamName
// div Title

// cards
  // game
    //gameList from back
      // avatar + title
      //fetch get
    //button addTeamGame
        //modal = copie de  ScreenGame (inscription - jeux dans Figma)
        // button X (close)
          // close modal
        // button validate
          // close modal
          // save

  //candidature

    // button search (user)
      // modal
        //input text
          // fetch post
        // result search
          // fetch get
        //button save
          //fetch post
          // close modal
        // button X (close)
          // close modal


  //Description
    //button setting
      //modal
        // input text
          // fetch post
        // button X (close)
          // close modal
        // button validate
          // close modal
          // save

  //Philosophie
    //button setting
      //modal
        // input text
        //button validate
          // fetch post
          // close modal
        // button X (close)
          // close modal
    
  //Profil recherché
    //button setting
      //modal = copie de  ScreenWish (inscription - souhait dans Figma)
          // fetch post
        //button validate
          // close modal
          // save
        // button X (close)
          // close modal

  //teamActu
    //teamActuList from back
      //fetch get
    // button addTeamActu
      //modal
        //input text "title"
        //input text "content"
        // Button /saveTeamActu
          // fetch post
           // close modal
        // button X (close)
          // close modal

  // Members
    // admin
      //adminList from back
        // fetch get
      // admincount
        //count from back
          //fetch get
      // button addAdmin
        //modal
          //input text
            // fetch post (dans memberList)
          //result
            //fetch get
          // button addAdminAtTeam
            //save 
            // close Modal
          // button X (close)
          // close modal

    // sousAdmin
        //sousAdminList from back
          // fetch get
      // sousAdminCount
        //count from back
          //fetch get
      // button addSousAdmin
        //modal
          //input text
            // fetch post (dans memberList)
          //result
            //fetch get
          // button addSousAdminAtTeam
            //save 
            // close Modal
          // button X (close)
          // close modal
      // button deleteSousAdmin
        // fetch delete
    
    // Regular
        //Regularlist from back
          // fetch get
      // RegularCount
        //count from back
          //fetch get
      // button addRegular
        //modal
          //input text
            // fetch post (dans memberList)
          //result
            //fetch get
          // button addRegularAtTeam
            //save 
            // close Modal
          // button X (close)
          // close modal
        // button deleteRegular
        // fetch delete


// cards