import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardColumns, Modal,Row, Col} from 'react-bootstrap'  ; 
import threeDots from '../images/three_dots.svg';


//---------- MODAL Qui sommes-nous? ----------//
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", }}
    >
      <Modal.Header style={{backgroundColor: '#010212', boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: 'white', backgroundColor: '#010212', }}> 
        Qui sommes-nous ?
        </Modal.Title>
        <Button style={{color: 'white', backgroundColor: '#010212', justifyContent: 'right', border: 0,}} onClick={props.onHide}> <img src={require('../images/cross_modal.svg')} alt="modal cross"/></Button>
      </Modal.Header>

      <Modal.Body style={{color: 'white', backgroundColor: '#010212', borderRadius: "0px 0px 90px 40px",boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)"}}>
        <h4>Player Two</h4>
        <p>En 2020, nous avons créé Player Two à destination des Gamers. Nous pensions qu’il fallait répondre à une vraie demande venant de tous ces Gamers et Gameuses qui cherchent leur Player Two.</p>
        <p>Ensuite, il a été nécessaire d’apporter une réponse personnalisée à toutes les demandes que nous recevions. Nous avons donc mis en place notre système de matching afin de trouver le joueur qui vous correspond.</p>
        <br/>
        <h5>Notre objectif ?</h5>
        <p>Vous permettre de trouver le joueur qui correspond à vos attentes.</p>
        <br/>
        <h5>Nos points forts ?</h5>
        <li>Notre réactivité : réponse sous 24h</li>
        <li>Entreprise à taille humaine</li>
        <li>La qualité de notre système de Matching</li>
        <br/>
        <h5>Notre rêve ?</h5>
        <p>Que chaque joueur de France ait le « réflexe Player Two » pour jouer, rencontrer, chatter… bref, faire vivre son expérience de jeu.</p>
        <p>Finalement, chaque entreprise est comme une boule de neige. Depuis 2020 Playertwo.fr a tracé une jolie route. Et ce n’est pas fini…</p>
        <br/>
      </Modal.Body>

    </Modal>
  );
}
//---------- FIN MODAL Qui sommes-nous? ----------//



//---------- MODAL Actualité ----------//
function ArticlesModal(props) {

  const [articlesList, setArticlesList] = useState ([])

  useEffect(() => {
    const findArticle = async () => {
      const data = await fetch('/scrappings/articles')
      const body = await data.json()
      setArticlesList(body.articles)
    }
    findArticle()
  }, [])

  var cardArticle = articlesList.map((article,i) => {
    return (
      <div key={i} className="divmap">
          <a  href={article.link} target="_blank" rel="noopener noreferrer" style={{display: "flex", textDecoration: "none", }}>
            <img width="30%" style={{borderRadius:"0px 0px 0px 30px"}}  src={article.image} alt="" />
            <div style={{alignSelf: "center"}}>
              <p style={{margin: 15, color: 'white'}}>{article.title}</p>
              {/* <p style={{margin: 15, marginBottom: 0, color: 'white'}}>{article.subTitle}</p> */}
            </div>
          </a>
      </div>
    )
  })

  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header >
        <Modal.Title  >
          Actualité du jeu vidéo
        </Modal.Title>
        <Button onClick={props.onHide}> 
          <img src={require('../images/cross_modal.svg')} alt="modal cross"/>
        </Button>
      </Modal.Header>

      <Modal.Body>
        {cardArticle}
      </Modal.Body>


    </Modal>
  );
}
//---------- FIN MODAL Actualité ----------//



//---------- MODAL Jeux populaires ----------//
function PopularGamesModal(props) {

  const [popularGamesList, setPopularGamesList] = useState ([])

  useEffect(() => {
    const findArticle = async () => {
      const dataPopularGames = await fetch('/scrappings/popularGames')
      const bodyPopularGames = await dataPopularGames.json()
      setPopularGamesList(bodyPopularGames.games)
    }
    findArticle()
  }, [])

  var cardArticle = popularGamesList.map((article,i) => {
    return (
      <div key={i} className='divmap'>
          <div  target="_blank" href={article.link} style={{display: "flex", textDecoration: "none"}}>
            <img width="15%" height="15%" src={article.image} alt="" style={{borderRadius:"0px 0px 0px 30px"}}/>
            <div style={{alignSelf: "center"}}>
              <p style={{marginLeft: 35, color: 'white'}}>{article.title}</p>
              <p style={{marginLeft: 35, color: 'white'}}>{article.category}</p>
              <p style={{marginLeft: 35, marginBottom: 0, color: 'white'}}>{article.tag}</p>
            </div>
          </div>
      </div>
    )
  })

  return (
    <Modal
      {...props}
      size="lg"
      centered
    >

      <Modal.Header >
        <Modal.Title >
          Jeux populaires
        </Modal.Title>
        <Button onClick={props.onHide}> 
          <img src={require('../images/cross_modal.svg')} alt="modal cross"/>
        </Button>
      </Modal.Header>

      <Modal.Body>
        {cardArticle}
      </Modal.Body>

    </Modal>
  );
}
//---------- FIN MODAL Jeux populaires ----------//



//---------- Composant de présentation----------//
function ScreenHome() {

  const [modalShow, setModalShow] = React.useState(false);
  const [newsModalShow, setNewsModalShow] = React.useState(false);
  const [popularGamesModalShow, setPopularGamesModalShow] = React.useState(false);
  const [articlesList, setArticlesList] = useState ([])
  const [popularGamesList, setPopularGamesList] = useState ([])
  const [top5, setTop5]= useState([])

  useEffect(() => {
    const findArticle = async () => {
      //récuper les articles
        const data = await fetch('/scrappings/articles')
        const body = await data.json()
        setArticlesList(body.articles)

      // récupérer les jeux populaires
        const dataPopularGames = await fetch('/scrappings/popularGames')
        const bodyPopularGames = await dataPopularGames.json()
        setPopularGamesList(bodyPopularGames.games)

      //récupérer les jeux prisé sur P2
        const response = await fetch('/top5fromP2');
        const top5fromP2 = await response.json()
        setTop5(top5fromP2)


    }
    findArticle()
  }, [])
  
  // ARTICLE LIST
  var cardArticle = [];
  var max = articlesList.length > 2? 2 : articlesList.length;
  for( var i=0; i<max ; i++){
    cardArticle.push(
      <div key={i} style={{padding: 7, color: 'white', backgroundColor: '#010212', borderBottom: "1px solid #A58CA3", borderTop: "1px solid #A58CA3", margin: 0,  alignSelf: "center"}}>
        <a  href={articlesList[i].link} target="_blank" rel="noopener noreferrer"style={{display: "flex", textDecoration: "none"}}>
          <img style={{borderRadius:"10px", margin: "2.5% 0%"}} height="40%" width="40%" src={articlesList[i].image} alt=""/>
          <div style={{alignSelf: "center", fontSize: "13px"}}>
            <p style={{marginLeft: 20, marginBottom: 0, color: 'white'}}>{articlesList[i].title}</p>
            {/* <span style={{marginLeft: 25, marginBottom: 0, color: 'white'}}>{articlesList[i].subTitle}</span> */}
          </div>
        </a>
      </div>
    )
  };

  // TOP 5 sur P2
  var top5Array = [];
  var maxtop = top5.length > 5? 5 : top5.length;
  for( var u=0; u<maxtop ; u++){
    top5Array.push(
      <Row key={u} style={{padding:7 , color: 'white', backgroundColor: '#010212', borderBottom: "1px solid #A58CA3", borderTop: "1px solid #A58CA3", margin: 0, paddingLeft: 0, paddingRight: 0}}>
        <img style={{borderRadius:10,}}  height="20%" width="20%" src={top5[u].cover} alt=""/>
        <Col style={{alignSelf: "center", fontSize: "13px"}}>
          <Row style={{marginLeft: 20, color: 'white'}}>{top5[u].name}</Row>
          <Row style={{marginLeft: 20, color: 'white', fontStyle:"italic"}}>{top5[u].plateforme}</Row>
        </Col>
      </Row>
    )
  }

  // JEUX POPULAIRE
  var cardPopularGames = [];
  var maxpo = popularGamesList.length > 4? 4 : popularGamesList.length;
  for( var v=0; v<maxpo ; v++){
    cardPopularGames.push(
      <div key={v} style={{padding:7 , color: 'white', backgroundColor: '#010212', borderBottom: "1px solid #A58CA3", borderTop: "1px solid #A58CA3", margin: 0, paddingLeft: 0, paddingRight: 0}}>
        <a  href={popularGamesList[v].link} target="_blank" rel="noopener noreferrer" style={{display: "flex", textDecoration: "none"}}>
          <img style={{borderRadius:10,}}  height="20%" width="20%" src={popularGamesList[v].image} alt=""/>
          <div style={{alignSelf: "center", fontSize: "13px"}}>
            <span style={{marginLeft: 20, color: 'white'}}>{popularGamesList[v].title}</span>
            {/* <span style={{marginLeft: 20, color: 'white'}}>{popularGamesList[v].category}</span> */}
          </div>
        </a>
      </div>
    )
  }


// __________________________________ RETURN __________________________________
  return (
  <div className="backgroundColor">

    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />

    <PopularGamesModal
      show={popularGamesModalShow}
      onHide={() => setPopularGamesModalShow(false)}
    />


      <div className="p2Button" style={{margin:0, paddingTop:25,width:200}}>
        <Link to="screenidentity">
          {/* <div className="invader"></div> */}
          <img style={{height:"180px", width:"200px",}}  src={require('../images/button.svg')} alt="button start"/>
          <p  className="textP2Button ">Find your Player Two </p>
        </Link>
      </div>


    <CardColumns style={{paddingTop:25}}>

    {/*  Modal qui sommes-nous ? */}
    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body>
        <Card.Title style={{cursor: "pointer"}} onClick={() => setModalShow(true)}>Qui sommes-nous ?</Card.Title>
        </Card.Body>
    </Card>

    {/* JEUX PRISE */}
    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body>
        <Card.Title>Top 5 sur Player 2</Card.Title>
        <br></br>
        {top5Array}
      </Card.Body>
    </Card>


    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body>
        <Card.Title>Quesaco</Card.Title>
        <Card.Text style={{font: 'comfortaa'}}>
        C'est plus simple que ça en à l'air : <br/>
        Tu cliques sur le bouton "Find your Player Two" en haut puis tu te connectes ensuite tu cherches un jeu et tu trouves ceux qui jouent au même jeu que toi. <br/> 
        Tu n'as plus qu'à les rejoindre sur la plateforme que vous avez en commun !
        </Card.Text>
      </Card.Body>
    </Card>


    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body style={{paddingBottom: 0}}>
        <Card.Title>Jeux populaires</Card.Title>
        <br></br>

        {cardPopularGames}

        <div style={{marginTop:5, heigth: 30, display: "flex", justifyContent: "center"}}>
          <img style={{width: 40, cursor: "pointer"}} alt="" src={threeDots} onClick={() => setPopularGamesModalShow(true)}/>
        </div>

          

      </Card.Body>
    </Card>



    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body>
        <Card.Title>Notre philosophie</Card.Title>
        <Card.Text> 
          Vite et bien! Voilà ce que nous voulons afin de rassembler les Gamers !
        </Card.Text>
      </Card.Body>
    </Card>


  {/* Actualités du jeu vidéo */}

    <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
      <Card.Body style={{paddingBottom: 0}}>
        <Card.Title>Actualités du jeu vidéo</Card.Title>
      <br></br>
        {cardArticle}
          <div style={{marginTop: 5, display: "flex", justifyContent: "center"}}>
            <img style={{width: 40, cursor: "pointer"}} src={threeDots} alt="" onClick={() => setNewsModalShow(true)}/>
            {/* <Button style={{fontWeight: "bold", width:80, border: 0, backgroundColor: "#8A2BE2"}} onClick={() => setNewsModalShow(true)}>
              . . .
            </Button> */}
            </div>
            <ArticlesModal
              show={newsModalShow}
              onHide={() => setNewsModalShow(false)}
            />
      </Card.Body>
    </Card>



      <Card style={{ boxShadow:"0px 4px 4px rgba(144, 14, 205, 0.8)", backgroundColor: '#010212', borderRadius: "0px 50px" }}>
        <Card.Body>
          <Card.Title>Actu Player 2</Card.Title>
          <Card.Text>
          Envie de nous affronter ? <br/>
          On t'attend !!!
          </Card.Text>
        </Card.Body>
      </Card>

    </CardColumns>


  </div>
);
}
//---------- FIN Composant de présentation----------//

export default ScreenHome