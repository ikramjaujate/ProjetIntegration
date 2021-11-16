import './css/App.css';
import Members from './Members';
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

  if (isLoggedIn()){
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Grades}  path="/grades"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Camera} path="/camera"/> 
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Accueil} path="/accueil"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Secretary} path="/secretary"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Members} path="/members"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/modification"  component={Modification}/>
            <Route path='/login' exact component={Login}/>
          </Switch>
        </div>
      </div>
    </Router>
  );}else {
    return(
      <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Grades}  path="/grades"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Camera} path="/camera"/> 
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Accueil} path="/accueil"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Secretary} path="/secretary"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Members} path="/members"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/modification"  component={Modification}/>
            <Route path='/login' exact component={Login}/>
          </Switch>
        </div>
      </div>
    </Router>

    )
    
  }
}


export default App;
