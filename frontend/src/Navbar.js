import './css/Navbar.css';
import ElementNavBar from './components/ElementNavbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function Navbar() {

    /**
     * Deconnect the user
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const deconnexion = () => {
        localStorage.removeItem('access_token') ;
        window.location.reload();
    }
    const [hover, setHover] = useState(true);

    const changement = () => {
        if (hover) {
            document.getElementById("id-ul").className = "petitEcranOuvertElement navbar-nav me-auto mb-2 mb-lg-0";
            document.getElementById("id-nav").className = "petitEcranOuvert navbar navbar-main navbar-expand-lg navbar-light bg-secondary navExpand";
            document.getElementById("navbarSupportedContent").className = "etirement petitEcranLayoutOuvert row align-items-center" ;
        }
        else {
            console.log("hover")
            document.getElementById("id-ul").className = "petitEcranFermeElement navbar-nav me-auto mb-2 mb-lg-0";
            document.getElementById("id-nav").className = "petitEcranFerme navbar navbar-main navbar-expand-lg navbar-light bg-secondary navExpand";
            document.getElementById("navbarSupportedContent").className = "etirement petitEcranLayoutFerme row align-items-center" ;
        }
    }

    return (

        <nav id="id-nav" className="petitEcranFerme navbar navbar-main navbar-light navExpand">
            <div class="container-fluid etirement row ">
                <button class="petitEcranBouton " onClick={() => {setHover(!hover);changement()}}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="etirement petitEcranLayoutFerme row align-items-center" id="navbarSupportedContent"> 
                    <ul id="id-ul" class="petitEcranFermeElement navbar-nav me-auto mb-2 mb-lg-0">
                        <ElementNavBar href="home" text="ACCUEIL" icon="bi-house" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="grades" text="GRADES" icon="bi-diagram-3" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="members" text="MEMBRES" icon="bi-people" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="photos" text="GALERIE" icon="bi-images" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="settings" text="PARAMETRES" icon="bi-gear" style={{"fontSize" : "2rem"}} />
                        <li className="nav-item deconnection-button" style={{textAlign: "-webkit-center"}}>
                            <div className="petitEcranLinkFerme">
                                <Link className="navbar__link" to="#" onClick={deconnexion}>
                                    <i class={`bi bi-box-arrow-left me-4`} style={{ "fontSize": "2rem" }} ></i>
                                    <span className="link-text" style={{ fontWeight: "500",position:"relative", top:"-0.3rem" }} >DECONNEXION</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  

  export default Navbar;