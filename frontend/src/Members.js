import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar.js';
import './css/Secretary.css';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UploadFiles from './components/File-upload.js';
import Input from './components/Input';
import Axios from 'axios';


export default function Members() {

    Axios.defaults.withCredentials = true;
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [clientGrade, setClientGrade] = useState("");
    const [gradesList, setGradesList] = useState([])
    const users = [1, 2, 3, 4 ,5, 6, 7, 8];
    const final = [];

    useEffect(()=> {
        getGrade() ;
	}, []);

    const submitClient = () => {
        console.log(clientGrade)
        Axios.put(`http://localhost:3001/api/client`, {
            FirstName : clientFirstName,
            LastName : clientLastName,
            Grade : clientGrade
        }).then ((response) => {
            if (response){
                window.alert("Client déjà enregistré")
            }
        })
    }

    const getGrade = () => {
        Axios.get(`http://localhost:3001/api/gradesInfos`).then((response)=> {
            setGradesList(response.data)
        }).then( () => {
        })
    }
    

    for(let user of users){
        final.push(
            <div className="col-sm-6 col-lg-3 offset-1 mt-5 mb-3 bg-primary">
                colonne {user}
            </div>
        )
    }
    
   
    return (
        <>
            <Navbar/>
            <div className="container"> 
                <div className="row">
                    <Popup trigger={ <button className="col-sm-6 col-lg-3 offset-1 mt-5 mb-3 bg-danger">Ajouter utilisateur (+)</button>} position="center" modal nested>
                        <h1>Nouvel utilisateur:</h1>
                        <form onSubmit={submitClient}>
                            <label for="f-name">Prénom:</label><br/>
                            <Input name="f-name" idName="f-name" max="50" min="1" type="texte" placeholder="Prénom" setFunc={setClientFirstName}/><br/>
                            <label for="l-name">Nom:</label><br/>
                            <Input name="l-name" idName="l-name" max="50" min="1" type="texte" placeholder="Nom" setFunc={setClientLastName}/><br/>
                            <label for="grade">Grade:</label><br/>
                            <select onChange={(e) => {
                                            setClientGrade(e.target.value)}} name="grade">
                                {gradesList.map((val) => {
                                        return <option value={val.id_grade}>{val.id_grade + ". "}{val.name_grade}</option>
                                })}
                            </select><br/><br/>
                            <button type="submit">Envoyer</button>
                            <UploadFiles/>                        
                        </form>
                    </Popup>
                    {final}
                </div>
            </div>
        </>
    )
}