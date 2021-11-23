import './css/App.css';
import Members from './Members';
import Grades from './Grades';
import Camera  from './components/Camera';
import {ThemeProvider} from "styled-components";
import './css/App.css';
import Accueil from './Accueil.js';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'; 
import Modification from './components/Modification';
import Login from './Login';
import {isLoggedIn} from './components/auth.js';
import {PrivateRoute} from "./components/PrivateRoute.js";
import Navbar from './Navbar';
import Settings from './Settings';


import { GlobalStyles } from "./components/ChangeTheme/Globalstyle";
import { lightTheme, darkTheme, daltonismTheme } from "./components/ChangeTheme/Themes"
import { setGlobal, useGlobal  } from 'reactn';

setGlobal({
  color:  window.localStorage.getItem('theme') === 'light' ? 'light' : window.localStorage.getItem('theme') === 'dark' ? "dark" : "daltonism"
});

function App() {

  const [theme] = useGlobal("color");
  const themeMode = theme === 'light' ? lightTheme : theme === "dark" ? darkTheme : daltonismTheme;

  if(isLoggedIn()){
    return(
      <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <Router>
      <div className="App">
         <Navbar /> 
        <div className="content">
          <Switch>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Grades}  path="/grades"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Camera} path="/camera"/> 
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Accueil} path="/home"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Members} path="/members"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} component={Settings} path="/settings"/>
            <PrivateRoute exact isloggedin={isLoggedIn()} path="/modification"  component={Modification}/>
            <PrivateRoute exact isloggedin={isLoggedIn()} >
               <Redirect exact isloggedin={isLoggedIn()} component={Accueil} to="/home" />
            </PrivateRoute>
            
          </Switch>
        </div>
      </div>
    </Router>
    </ThemeProvider>
    )
  }else{
    return(
      <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Route >
               <Redirect to="/login" exact component={Login} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

    )}
    
}


export default App;
