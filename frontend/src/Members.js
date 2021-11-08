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
    const [clientGrade, setClientGrade] = useState(1);
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

    const delMember = (id) => {
        const idMember = id;
        console.log(idMember)
        Axios.delete(`http://localhost:3001/api/members/${idMember}`).then((response)=> {
            if(response) {
                window.location.reload();
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
                            <select required onChange={(e) => {
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
                            <div style={{backgroundColor:"#ebebeb"}} className="rounded col-sm-6 col-lg-3 offset-1 mt-5 mb-3 ">
                                <div className="row rounded">
                                    <div style={{backgroundColor:val.color, fontSize:"0.7rem"}} className="col-6">
                                        {val.name_grade}
                                        
                                    </div>
                                    <div style={{backgroundColor:val.color}} className="col-6">
                                    <Popup trigger={
                                           
                                                <svg aria-hidden="true" width="20%" focusable="false" className="pb-1 mx-1" data-prefix="fas" data-icon="pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M383.1 448H63.1V128h156.1l64-64H63.1C28.65 64 0 92.65 0 128v320c0 35.35 28.65 64 63.1 64h319.1c35.34 0 63.1-28.65 63.1-64l-.0039-220.1l-63.1 63.99V448zM497.9 42.19l-28.13-28.14c-18.75-18.75-49.14-18.75-67.88 0l-38.62 38.63l96.01 96.01l38.62-38.63C516.7 91.33 516.7 60.94 497.9 42.19zM147.3 274.4l-19.04 95.22c-1.678 8.396 5.725 15.8 14.12 14.12l95.23-19.04c4.646-.9297 8.912-3.213 12.26-6.562l186.8-186.8l-96.01-96.01L153.8 262.2C150.5 265.5 148.2 269.8 147.3 274.4z"></path></svg>
                                            
                                        } modal nested>
                                            <div></div>
                                    </Popup>
            
                                    <button style={{border:"0px", backgroundImage:"url('https://cdn.iconscout.com/icon/free/png-256/delete-844-902124.png')", backgroundSize:"contain", backgroundRepeat:"no-repeat"}} className="mb-1 p-2 btn btn-outline-primary" id={val.id_member} onClick={event => {delMember(event.target.id)}} ></button>
                                    </div>                                    
                                    <div className="rounded col-12">                                        
                                        {val.first_name} {val.last_name}
                                    </div>
                                </div>
                            </div>
                        )
                    })}              

            
                       
                </div>
            </div>
        </>
    )
}