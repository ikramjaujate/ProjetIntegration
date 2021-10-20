import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Camera from '../../frontend/src/components/Camera';

function App() {
  return (
    <Router>
      <div className="App">
      {/* <Navbar/> */}
        <div className="content">
          <Switch>

            <Route exact path="/camera"> 
              <Camera/>
            </Route>

          </Switch>

        </div>
      </div>

    </Router>
  );
}

export default App;