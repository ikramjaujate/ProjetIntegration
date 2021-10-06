import Navbar from './components/Navbar.js';
import './css/Secretary.css';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import UploadFiles from './components/File-upload.js';



function Secretary() {
    return (
        <div className="secretary-page">
            <Navbar/>
            <div>          
                <Popup trigger={ <button className="add-user">Ajouter utilisateur (+)</button>} position="center" modal nested>
                    <h1>Nouvel utilisateur:</h1>
                    <form action="#">
                    <label for="f-name">Prénom:</label><br/>
                    <input type="text" id="f-name" name="fname"  placeholder="Nom"/><br/>
                    <label for="l-name">Nom:</label><br/>
                    <input type="text" id="l-name" name="lname" placeholder="Prénom"/><br/>
                    <label for="grade">Grade:</label><br/>
                    <select name="nom" size="1">
                        <option>Patient</option>
                        <option>Directeur</option>
                        <option>Personnel</option>
                    </select><br/><br/>
                    
                    <UploadFiles/>
                    
                    </form>
                </Popup>
            </div>
        </div>
           
    );
  }

  // https://react-popup.elazizi.com/react-modal/
  
  export default Secretary;
  