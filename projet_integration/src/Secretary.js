import Navbar from './components/Navbar.js';
import './css/Secretary.css';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
//import UploadService from "../services/file-upload.service";


function Secretary() {
    return (
        <div className="secretary-page">
            <Navbar/>
            <div>          
                <Popup trigger={ <button className="add-user">Ajouter utilisateur (+)</button>} position="center" modal nested>
                    <div>Choisissez les photos :</div>
                    <input type="file"/>
                    <button className="save-user">Enregistrer</button>
                </Popup>
            </div>
        </div>
           
    );
  }

  // https://react-popup.elazizi.com/react-modal/
  
  export default Secretary;
  