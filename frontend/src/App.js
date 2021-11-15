import './css/App.css';
import Navbar from './components/Navbar.js';
import Grades from './Grades';
import Camera  from './components/Camera';
import './css/App.css';
import Accueil from './Cam';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Modification from './components/Modification';
import Login from './Login';
import {isLoggedIn} from './components/auth.js';
import {PrivateRoute} from "./components/PrivateRoute.js";


function App() {


  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
          <Route exact  path="/grades">
                <Grades/>
            </Route>
            <PrivateRoute exact isloggedin={isLoggedIn()}  path="/camera"> 
              <Camera/>
            </PrivateRoute>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/accueil">
             <Accueil/> 
            </PrivateRoute>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/secretary">
              <Secretary/>
            </PrivateRoute>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/modification">
              <Modification/>
            </PrivateRoute>
            <PrivateRoute exact isloggedin={isLoggedIn()}  path="/login">
              <Login/>
            </PrivateRoute>
            <Route exact path='/login'  >
              <Login/>
                </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );}


export default App;
