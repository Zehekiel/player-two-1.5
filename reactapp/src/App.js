
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//routes
import ScreenHome from '../../reactapp/src/Components/ScreenHome';
// import ScreenHome from '../src/Components/ScreenHome';
import ScreenIdentity from './Components/ScreenIdentity';
import ScreenGame from './Components/ScreenGame';
// import ScreenWish from './Components/ScreenWish';
import ScreenOtherUser from './Components/ScreenOtherUser';
// import ScreenteamAdmin from './Components/ScreenteamAdmin';
// import ScreenteamView from './Components/ScreenteamView';
import ScreenUser from './Components/ScreenUser';
import ScreenMatchPage from './Components/ScreenMatchPage';
import Header from "./Components/Header"
//redux
import token from './reducer/token'
import game from './reducer/game'
import user from './reducer/user'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
const store = createStore(combineReducers({game, token, user}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
          <Switch>
            <Route component={ScreenHome} path="/" exact/>
            <Route component={ScreenIdentity} path="/screenidentity"  />
            {/* <Route component={ScreenSignIn} path="/screensignin"/> */}
            <Route component={ScreenGame} path="/screengame"  />
            {/* <Route component={ScreenWish} path="/screenwish"/> */}
            <Route component={ScreenMatchPage} path="/screenmatchpage"  />
            <Route component={ScreenOtherUser} path="/screenotheruser/:p2id"  />
            {/* <Route component={ScreenteamAdmin} path="/screenteamadmin"  />
            <Route component={ScreenteamView} path="/screenteamview"  /> */}
            <Route component={ScreenUser} path="/screenuser"  />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
