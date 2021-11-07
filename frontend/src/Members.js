import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar.js';
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
    const [membersList, setMembersList] = useState([])

    useEffect(()=> {
        getGrade() ;
        getMembers();
	}, []);

    const getMembers = () => {
		let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, 
        };
        fetch(`/api/members`, informations)
            .then(response => {
				return response.json()
			}).then(response => {
                setMembersList(response)
                console.log(membersList)
            })
	}

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
    

    // for(let user of users){
    //     final.push(
    //         <div className="col-sm-6 col-lg-3 offset-1 mt-5 mb-3 bg-primary">
    //             colonne {user}
    //         </div>
    //     )
    // }
    
   
    return (
        <>
            <Navbar/>
            <div style={{border:'1px solid grey'}} className="rounded col-3 offset-2 mt-2"> 
                <input type="text" placeholder="chercher"></input>
            </div>
            <div className="container"> 
                <div className="row">
                    <Popup trigger={ <button style={{backgroundColor:'#c6e5c3', border:"1px solid lightgrey"}} className=" rounded col-sm-6 col-lg-3 offset-1 mt-5 mb-3">Ajouter utilisateur (+)</button>} position="center" modal nested>
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
    
                    {membersList.map((val) => {
                        return (
                            <Popup trigger={<div style={{backgroundColor:"#ebebeb"}} className="rounded col-sm-6 col-lg-3 offset-1 mt-5 mb-3">
                                <div className="row rounded">
                                    <div style={{backgroundColor:val.color}} className="rounded col-12">
                                        {val.name_grade}
                                    </div>
                                    <div className="rounded col-12">                                        
                                        {val.first_name} {val.last_name}
                                    </div>
                                </div>
                            </div>
                            } modal nest>

                                <div>Hello</div>

                            </Popup>
                        )
                    })}              

            
                       
                </div>
            </div>
        </>
    )
}