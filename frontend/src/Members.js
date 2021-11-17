import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UploadFiles from './components/File-upload.js';
import Input from './components/Input';
import Axios from 'axios';
import {Toast} from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Members() {

    

    Axios.defaults.withCredentials = true;
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [clientGrade, setClientGrade] = useState(1);
    const [gradesList, setGradesList] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [currentGrade, setCurrentGrade] = useState("Tous")

    const optionsToast = {
        autoClose: 5000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };

    useEffect(()=> {
        getGrade() ;
        getMembers();
        Array.from(document.querySelectorAll('.toast'))
        .forEach(toastNode => new Toast(toastNode));
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

    const submitClient = (event) => {
        Axios.put(`/api/client`, {
            FirstName : clientFirstName,
            LastName : clientLastName,
            Grade : clientGrade
        }).then (() => {
            getMembers()
        })
    }

    const delMember = (id) => {
        const idMember = id;
        let informations = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, 
        };
        fetch(`/api/members/${idMember}`, informations).then((response)=> {
            if(response.status === 200){
                console.log(response)
                getGrade() ;
                getMembers();            
                (toast.success("Suppression réussie"  , optionsToast))
            }
            else {
                (toast.error("Suppression échouée"  , optionsToast))
            }
            })
    }

    const getGrade = () => {        
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, 
        };
        fetch(`/api/gradesInfos`, informations).then((response)=> {
            return response.json()
        }).then( (response) => {
            setGradesList(response)
        })
    }    
   
    return (
        <>

            <div  className="rounded row mt-2 justify-content-center"> 
                <div className="col-4">
                    <input style={{border:'1px solid grey'}} type="text" onChange={e => {
                        setFilterText(e.target.value)
                    }}placeholder="chercher"></input>
                </div>
                <select onChange={e => (setCurrentGrade(e.target.value))} style={{width:"20%"}} className="form-select form-select-sm" aria-label="Default select example">
                    <option>Tous</option>
                    {gradesList.map((val) => {
                            return (<option >{val.name_grade}</option>)
                    })}
                </select>                
            </div>
            <div> 
                <div className="row offset-1 justify-content-center">
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
    
                    {membersList.filter(name => name.first_name.includes(filterText)).filter(currentGrade !== "Tous" ? grade => grade.name_grade === currentGrade : grade => grade.name_grade.includes("")).map((val) => {
                        return (
                            <div className="rounded col-sm-5 col-lg-3 p-4 mx-1 mb-3 ">
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
                                        
                                        
                                        {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}              

            
                       
                </div>
                <ToastContainer style={{fontSize:"0.6rem"}}/>  
            </div>
        </>
    )
}