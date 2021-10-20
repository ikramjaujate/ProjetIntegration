import './css/App.css';
import Secretary from './Secretary.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Bootstrap from './bootstrap.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
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
