import Navbar from './components/Navbar.js';
import './css/Secretary.css';
import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import UploadFiles from './components/File-upload.js';
import Input from './components/Input';
import Axios from 'axios'

function Secretary() {
    const [clientFirstName, setClientFirstName] = useState([]);
    const [clientLastName, setClientLastName] = useState([]);
    const [clientGrade, setClientGrade] = useState([]);

    const submitClient = () => {
        Axios.put('http://localhost:3001/api/client', {
            FirstName : clientFirstName,
            LastName : clientLastName,
            Grade : clientGrade
        }).then ((response) => {
            if (response){
                window.alert("Client déjà enregistré")
            }
        })
    }

    return (
        <div className="secretary-page">
            <Navbar/>
            <div>          
                <Popup trigger={ <button className="add-user">Ajouter utilisateur (+)</button>} position="center" modal nested>
                    <h1>Nouvel utilisateur:</h1>
                    <form onSubmit={submitClient}>
                    <label for="f-name">Prénom:</label><br/>
                    <Input name="f-name" idName="f-name" max="50" min="1" type="texte" placeholder="Prénom" setFunc={setClientFirstName}/><br/>
                    <label for="l-name">Nom:</label><br/>
                    <Input name="l-name" idName="l-name" max="50" min="1" type="texte" placeholder="Nom" setFunc={setClientLastName}/><br/>
                    <label for="grade">Grade:</label><br/>
                    <select onChange={(e) => {
                                    setClientGrade(e.target.value)}} name="grade">
                        <option>Patient</option>
                        <option>Directeur</option>
                        <option>Personnel</option>
                    </select><br/><br/>
                    <button type="submit">Envoyer</button>
                    <UploadFiles/>
                    
                    </form>
                </Popup>
            </div>
        </div>
           
    );
  }
  
  export default Secretary;
  