import './css/App.css';
import Grades from './Grades';
import Camera  from './components/Camera';
import './css/App.css';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Members from './Members';

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
            <Route exact path="/">
             Accueil {/*Page Cécile*/}
            </Route>
            <Route exact path="/secretary">
              <Secretary/>
            </Route>
            <Route exact path="/members">
              <Members/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
