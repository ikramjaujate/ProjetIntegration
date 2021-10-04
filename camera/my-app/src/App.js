import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import Camera from './Camera';

function App() {
  return (
    <Router>
      <div className="App">

      </div>
        <Switch>
          <Route exact path='/camera'>
            <Camera/>
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
