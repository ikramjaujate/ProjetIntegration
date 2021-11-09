import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
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
    const [gradesList, setGradesList] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [currentMember, setCurrentMember] = useState("");
    const [filterText, setFilterText] = useState("")

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
            })
	}

    const submitClient = () => {
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
        Axios.delete(`http://localhost:3001/api/members/${idMember}`).then((response)=> {
            if(response) {
                window.location.reload();
            }
        })
    }

    const setCurrent = (id) => {
        console.log(membersList)
        setCurrentMember(id)   
             
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
            <div  className="rounded row mt-2 justify-content-center"> 
                <div className="col-4">
                    <input style={{border:'1px solid grey'}} type="text" onChange={e => {
                        setFilterText(e.target.value)
                    }}placeholder="chercher"></input>
                </div>
            </div>
            <div> 
                <div className="row justify-content-center">
                    <Popup trigger={ <button style={{backgroundColor:'#c6e5c3', border:"1px solid lightgrey"}} className="rounded col-sm-3 col-lg-3 mt-4 mb-5">Ajouter utilisateur (+)</button>} position="center" modal nested>
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
    
                    {membersList.filter(name => name.first_name.includes(filterText)).map((val) => {
                        return (
                            <div className="rounded col-sm-5 col-lg-3 p-4 mx-1 mb-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="row rounded">
                                    <div style={{backgroundColor:val.color, fontSize:"0.7rem"}} className="col-6">
                                        {val.name_grade}
                                        
                                    </div>
                                    <div style={{backgroundColor:val.color}} className="col-6">
                                    <button className="p-2 btn-close btn-close-grey float-end" id={val.id_member} onClick={event => {if(window.confirm("Voulez vous vraiment supprimer " + val.last_name + "?")) delMember(event.target.id)}} ></button>
                                    </div>                                    
                                    <div style={{backgroundColor:"#ebebeb"}} className="rounded col-12">

                                        <div class="col-md-4 text-align">
                                            <img src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg" class="img-fluid rounded-start" alt="profile-pic"/>
                                        </div>
                                        {val.first_name} {val.last_name}
                                        
                                        
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">{val.name_grade}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    {val.first_name} {val.last_name}
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
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