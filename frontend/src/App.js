import './css/App.css';
import Grades from './Grades';
import Camera  from './components/Camera';
import './css/App.css';
import Accueil from './Cam';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Bootstrap from './bootstrap';

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
            <Route exact path="/community">
              <Secretary/>
            </Route>
            <Route exact path="/test">
              <Bootstrap/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
