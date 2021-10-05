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
                    <UploadFiles/>
                </Popup>
            </div>
        </div>
           
    );
  }

  // https://react-popup.elazizi.com/react-modal/
  
  export default Secretary;
  