import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar.js';
import Grades from './Grades';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <div className="content">
          <Switch>

            <Route exact path="/grades"> 
              <Grades/>
            </Route>

          </Switch>

        </div>
      </div>

    </Router>
  );
}

export default App;
