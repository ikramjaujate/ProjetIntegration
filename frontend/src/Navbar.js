import './css/Navbar.css';
import ElementNavBar from './components/ElementNavbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const deconnexion = () => {
        localStorage.removeItem('access_token') ;
        window.location.reload();
    }


    return (

        
        <nav className="navbar navbar-main navbar-expand-lg navbar-light bg-secondary navExpand">
            <div class="container-fluid  etirement"> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse  etirement" id="navbarSupportedContent"> 
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <ElementNavBar href="home" text="ACCUEIL" icon="bi-house" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="grades" text="GRADES" icon="bi-diagram-3" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="members" text="MEMBRES" icon="bi-people" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="photos" text="GALERIE" icon="bi-images" style={{"fontSize" : "2rem"}} />
                        <ElementNavBar href="settings" text="PARAMETRES" icon="bi-gear" style={{"fontSize" : "2rem"}} />
                        <li className="nav-item" >
                            <Link className="navbar__link" to="#" onClick={deconnexion}>
                                <i class={`bi bi-box-arrow-left m-4`} style={{ "fontSize": "2rem" }} ></i>
                                <span className="link-text" style={{ fontWeight: "500" }} >DECONNEXION</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Navbar;