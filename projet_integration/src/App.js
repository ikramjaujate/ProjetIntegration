import './css/App.css';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            Accueil {/*Page Cécile*/}
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/secretary">
            <Secretary/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
