import './css/App.css';
import Navbar from './components/Navbar.js';
import Grades from './Grades';
import Camera  from './components/Camera';
import './css/App.css';
import Accueil from './Cam';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>

            <Route exact path="/grades"> 
              <Grades/>
            </Route>
            <Route exact path="/camera"> 
              <Camera/>
            </Route>
            <Route exact path="/accueil">
             <Accueil/> 
            </Route>
            <Route exact path="/secretary">
              <Secretary/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
