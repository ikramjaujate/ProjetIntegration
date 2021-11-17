import './css/Navbar.css';
import ElementNavBar from './components/ElementNavbar';

function Navbar() {
    return (
        <nav className="navbar-main">
            <ul className="navbar-nav">
                <ElementNavBar href="home" text="ACCUEIL" icon="bi-house" style={{"fontSize" : "2rem"}} />
                <ElementNavBar href="cameras"  text="CAMÉRAS" icon="bi-camera-video" style={{"fontSize" : "2rem"}} />
                <ElementNavBar href="grades"  text="GRADES" icon="bi-diagram-3" style={{"fontSize" : "2rem"}} />
                <ElementNavBar href="members"  text="MEMBRES" icon="bi-people" style={{"fontSize" : "2rem"}} />
                <ElementNavBar href="pictures" text="GALERIE" icon="bi-images" style={{"fontSize" : "2rem"}} />
                <ElementNavBar href="settings" text="PARAMETRES" icon="bi-gear" style={{"fontSize" : "2rem"}} />

            </ul>
        </nav>
    );
  }
  
  export default Navbar;