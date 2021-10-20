import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar.js';
import Grades from './Grades';
import Camera  from './components/Camera';
import './css/App.css';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
      {/*<Navbar/>*/}
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
            <Route exact path="/bootstrap">
              <Bootstrap />
            </Route>

          </Switch>
      </div>
    </Router>
  );
}

export default App;
