import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar.js';
import Grades from './Grades';
import Camera  from './components/Camera';
import Modification from './components/Modification';
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
            <Route exact path="/modification"> 
              <Modification/>
            </Route>

          </Switch>

        </div>
      </div>

    </Router>
  );
}

export default App;
