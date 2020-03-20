import React, {useState} from 'react';
import { Container, Row, Col, Card, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function ScreenWish() {
  const [mode, setMode] = useState("")
  const [age, setAge] = useState("")
  const [dispo, setDispo] = useState("")
  const [sexe, setSexe] = useState("")
  const [langue, setLangue] = useState("Français")
  const [team, setTeam] = useState(false)
  const [Redirection, setRedirection] = useState(false)
  
  //click sur le bouton start
  async function OnclickStartWish(){
    console.log('passe ici');
    
    //envoyé les wishs au back
    const wishResponse =await fetch('/addwish', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `mode=${mode}&&age=${age}&&disponibility=${dispo}&&sexe=${sexe}&&langue=${langue}&&team=${team}`
    });
    const response = await wishResponse.json()
    console.log("serviceresponse", response);
    //récupérer result from back pour redirect ou non
    if (response.result === true){
      setRedirection(response.result)
      console.log(Redirection);
    }
  };

  // redirect ou non selon réponse du back
  if(Redirection){
    return( 
    <Redirect to='/ScreenMatchPage'/>)
  };



  return (

    <div className="backgroundColor">

      <Container>
        <Row xs="1">
          <Col> 
            <Form >
              <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)",backgroundColor: '#010212', borderRadius: "0px 50px", marginTop:"40px", padding:"20px 40px 20px 40px"}}>

                <FormGroup row className="font" style={{paddingTop:20}}>
                  <Label md={2}>Mode</Label>
                  <Col md={4}>
                    <Input onChange={(e) => setMode(e.target.value)} style={{borderRadius:25}} type="select">
                      <option>Non précisé</option>
                      <option>Noob</option>
                      <option>Casual</option>
                      <option>Regular</option>
                      <option>Hardcore</option>
                      <option>Competitive</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row className="font">
                  <Label md={2}>Age</Label>
                  <Col md={4}>
                  <Input style={{borderRadius:25}} onChange={(e) => setAge(e.target.value)} type="select">
                    <option>Non précisé</option>
                    <option>-18 </option>
                    <option>18-25 </option>
                    <option>26-33 </option>                      
                    <option>34-41 </option>
                    <option>42-49 </option>
                    <option>50 + </option>
                  </Input>
                </Col>
                </FormGroup>

                <FormGroup row className="font">
                  <Label md={2}>Disponilité</Label>
                  <Col md={4}>
                    <Input style={{borderRadius:25}} onChange={(e) => setDispo(e.target.value)} type="select" >
                      <option>Matin</option>
                      <option>Midi</option>
                      <option>Après-Midi</option>
                      <option>Soir</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row className="font">
                  <Label md={2}>Sexe</Label>
                  <Col md={4}>
                    <Input style={{borderRadius:25}}  onChange={(e) => setSexe(e.target.value)} type="select">
                    <option>Non précisé</option>
                    <option>Homme</option>
                    <option>Femme</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row className="font">
                  <Label md={2}>Langue</Label>
                  <Col md={4}>
                    <Input style={{borderRadius:25}} onChange={(e) => setLangue(e.target.value)} type="select">
                      <option>Français</option>
                      <option>English</option>
                      <option>Deutsch</option>
                      <option>العربية</option>
                      <option>Italiano</option>
                      <option>Español</option>
                      <option>日本の</option>
                      <option>中国人</option>
                      <option>한국어</option>
                      <option>русский</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row inline className="font" style={{marginBottom:0}}>
                  <Label md={2}>Team or not?</Label>
                    <Col md={4}>
                      <FormGroup check inline>
                        <Label check>
                          <Input style={{borderRadius:25}} onChange={(e) => setTeam(true)} type="radio" name="radio2" />{' '}
                          OUI                      
                          </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Label check>
                          <Input style={{borderRadius:25}} onChange={(e) => setTeam(false)} type="radio" name="radio2" />{' '}
                          NON
                        </Label>
                      </FormGroup>
                    </Col>
                </FormGroup>

              </Card>
            </Form>
          </Col>
        </Row>

        <FormGroup className="nextButton boldFont" style={{margin:0, paddingTop:25, justifyContent:"center"}} row>
          <Button color="transparent" onClick={OnclickStartWish} style={{padding: 0}}>
            <img style={{height:"100px", width:"100px"}} src={require('../images/button.svg')} alt="button start"/>
            <div className="textButton">Start</div>
          </Button>
        </FormGroup>

      </Container>

    </div>

    );
}

export default ScreenWish;