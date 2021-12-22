import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css'; 
import Input from './components/Input';
import Axios from 'axios';
import {Toast} from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import './css/Modification.css'
import Popover from "react-bootstrap/Popover"
import 'react-toastify/dist/ReactToastify.css';
import EdiText from "react-editext";
import styled from "styled-components";
import './css/Members.css';


export const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0px;
  border-radius: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
`;

export default function Members() {

    

    Axios.defaults.withCredentials = true;
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [clientGrade, setClientGrade] = useState(1);
    const [gradesList, setGradesList] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [currentGrade, setCurrentGrade] = useState("Tous")
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    var photos = []
    const [call, setCall] = useState("");
    const [allPhotos, setAllPhotos] = useState([])
    const [profilePhoto, setProfilePhoto] = useState("")
    const [hasValue, setHasValue] = useState(null)
    const [count, setCount] = useState(null)
    const [color, setColor] = useState("")
    const [nameGrade, setNameGrade] = useState("")
    const [valueGrade, setValueGrade] = useState("")
    const [etatModification, setEtatModification] = useState(0)
    const [userNow, setUserNow] = useState("")
    const [allGrade, setAllGrade] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const changeHandler = (event) => {
		setSelectedFile(event.target.files);
	};

    /**
     * add each photos added when creating a new member
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @method POST
     */
    const handleSubmission = () => {
        const formData = new FormData();
        if (selectedFile !== null){
            for(let e = 0; e < selectedFile.length; e++){
                formData.append('photos', selectedFile[e]);
            }
            fetch(
                '/api/upload-photos',
                {
                    headers : {
                        'Authorization': localStorage.getItem('access_token')
                    },
                    method: 'POST',
                    body: formData,
                    
                }
            )
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        else { console.log("pas de photos")}
	};

    const optionsToast = {
        autoClose: 5000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };

     /**
     * Retrieve all members and their grades on load
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     */
    useEffect(()=> {
        getGrade() ;
        getMembers();
        Array.from(document.querySelectorAll('.toast'))
        .forEach(toastNode => new Toast(toastNode));
	}, []);

     /**
     * retrieve all members
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @method GET
     */
    const getMembers = () => {
		let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('access_token') }, 
        };
        fetch(`/api/members`, informations)
            .then(response => {
				return response.json()
			}).then(response => {
                setMembersList(response)
            })
	}

    /**
     * Add a new member
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @param {event} : event
     * @method PUT
     */

    const submitClient = (event) => {
        event.preventDefault();
        photos= []
        if(selectedFile !== null){
            for(let e = 0; e < selectedFile.length; e++){
                photos.push(selectedFile[e].name);
            }
        }
        Axios.put(`/api/client`, {
            FirstName : clientFirstName,
            LastName : clientLastName,
            Grade : clientGrade,
            Photos : photos
        }).then (() => {
            getMembers()
            handleSubmission()
        }).then(async() => {
            window.location.reload();
        })
    }

    /**
     * Delete a member
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @param {integer} id
     * @method DELETE
     */

    const delMember = (id) => {
        let informations = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('access_token') }, 
        };
        fetch(`/api/members/${id}`, informations).then((response)=> {
            if(response.status === 200){
                getGrade() ;
                getMembers();            
                (toast.success("Suppression réussie"  , optionsToast))
            }
            else if (response.status !== 200) {
                
                (toast.error("Erreur lors de la suppression"  , optionsToast))
            }
            })
    }

    /**
     * Retrieve all grades
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @method GET
     */
    const getGrade = () => {        
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token') }, 
        };
        fetch(`/api/gradesInfos`, informations).then((response)=> {
            return response.json()
        }).then( (response) => {
            setGradesList(response)
        })
    }
    /**
     * Change user's first and last name
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */
     const handleSave = (member) => {
        let nameSurname = member.split(/(\s+)/);
        const result = nameSurname.filter(word => word.trim().length > 0);
        let name = result[0]
        let surname = result[1]

        fetch(`/api/membres/${userNow}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token')
            },
            body: JSON.stringify({ name, surname })
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Vous venez de modifier le nom et prénom de cet utilisateur", optionsToast);
                getGrade() ;
                getMembers(); 
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            } 

        })

    }
    /**
   * Retrieves the grade from a member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method GET
   * @param {integer} idMember identifier of the member for which we want to retrieve the grade
   */

    const gradeMembre = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token') },
        };
        fetch(`/api/membres/${userNow}/grade`, informations)
            .then(response => response.json())
            .then(response => {
                setNameGrade(response[0]["name_grade"])
                setColor(response[0]["color"])
                setValueGrade(response["id_grade"])
                setHasValue(true)

            });

    }

    /**
     * Recovers information about the different grades, such as their name, their associated color,
     * as well as the number of authorized and refused cameras
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    const gradeAll = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token') },
        };
        fetch(`/api/grades`, informations)
            .then(response => response.json())
            .then(res => {
                setAllGrade(res)
            });
    }

    /**
     * Get user's first and last name
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */

    const nomMembre = (userNow) => {
        let informations = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token')
            },
        };
        fetch(`/api/membres/${userNow}`, informations)
            .then(response => response.json())
            .then(response => {
                let nom = response[0]["first_name"]
                let surnom = response[0]["last_name"]
                let text = nom + ' ' + surnom

                setName(nom)
                setSurname(surnom)
                setCall(text)
                setHasValue(true)
            });

    }

    /**
     * Gets the number of photos owned by this member
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */
    var listeGrade = {}

    const modificationUp = () => {
        setEtatModification(1)
        allGrade.map(grade =>
            listeGrade[grade.name_grade] = grade.color
        )
        if (nameGrade in listeGrade) {
            delete listeGrade[nameGrade]
        }

    }

    /**
     * Counts the number of photos owned by the member.
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve information
     */

    const countPhoto = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token') },
        };
        fetch(`/api/membres/${userNow}/photos/count`, informations)
            .then(response => response.json())
            .then(response => {
                setCount(response[0]["count"])
                setHasValue(true)
            });
    }
    /**
    * Get user's pictures
    * 
    * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
    * @param {string} member  Identifier of the member
    */

    const photoMembre = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token') },
        };
        fetch(`/api/membres/${userNow}/photos`, informations)
            .then(response => response.json())
            .then(res => {
                setAllPhotos(res)
                
                for (let i in res) {
                    photos.push(res[i]["pictures"])
                    setProfilePhoto(res[0]["pictures"])
                }
                if (res.length === 0) { 
                    setProfilePhoto('profile.jpeg')
                }
                setHasValue(true)
            })
        setProfilePhoto(photos[0])

    }


    /**
    * Eliminate picture of a member
    * 
    * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
    * @method DELETE
    * @param {integer} idMember identifier of the member for which we want to eliminate photo
    */

    const eliminate = (photo) => {
        fetch(`/api/membres/${userNow}/eliminate/photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token')
            },
            body: JSON.stringify({ photo })
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Vous venez d'effacer la photo", optionsToast);
                photoMembre(userNow)
                countPhoto(userNow)
                
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })
    }
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body id="popover-test">
                <div className="row">
                    {allPhotos.map(photo =>
                        <div className=" test col">
                            <i className="bi bi-x-circle-fill pr-2 mb-3" onClick={() => eliminate(photo.pictures)}></i>
                            <img className="img-thumbnail h-50" src={photo.pictures} alt='' />
                        </div>)}
                </div>
            </Popover.Body>
        </Popover>
    );

    const changeUser = async (id) => {
        setUserNow(id);
        nomMembre(id);
        gradeMembre(id);
        photoMembre(id);
        countPhoto(id);
        gradeAll(id)
    }

    /**
    *  Change grade of a member
    * 
    * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
    * @method PUT
    * @param {integer} idMember identifier of the member for which we want to change the grade
    */
    const modificationChoixGrade = (idGrade) => {
        fetch(`/api/membres/${idGrade}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json','Authorization': localStorage.getItem('access_token')
            },
            body: JSON.stringify({ userNow })
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Vous venez de modifier le grade de l'utilisateur", optionsToast);
                getGrade() ;
                getMembers(); 
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })
        changeUser(userNow)
        setEtatModification(0)
    }

    
   
    return (
        <>

            <div  className="rounded row mt-2 justify-content-center"> 
                <div className="rounded col-7 col-lg-4 col-md-4 offset-md-2 offset-lg-2 offset-xl-2">
                    <input className="px-2" style={{border:'none', backgroundColor:"#acacac", borderRadius:"40px", color:'white', fontSize:"calc(0.7rem + 1vw)", outline:'none'}} type="text" onChange={e => {
                        setFilterText(e.target.value)
                    }}placeholder="chercher"></input>
                </div>

                <div className="rounded col-6 col-lg-5 col-sm-3">
                    <div className="form-check form-check-inline" style={{'color':'white'}}>
                    <input type="radio" className="mx-1" id="Tous" onClick={e => (setCurrentGrade(e.target.id))} name="grade" value="Tous"/>
                    <label style={{backgroundColor: "grey", width:"auto", borderRadius:"10px", fontSize:"calc(0.5vw + 0.5rem)"}} className="m-1 px-4 form-check-label" for="Tous">Tous</label>
                        {gradesList.map((val) => {
                                                            return (<><input type="radio" className="mx-1" id={val.name_grade} onClick={e => (setCurrentGrade(e.target.id))} name="grade" value={val.name_grade}/>
                                                            <label style={{backgroundColor: val.colors, width:"auto", borderRadius:"10px", fontSize:"calc(0.5vw + 0.5rem)"}} className="m-1 px-4 form-check-label" for={val.name_grade}>{val.name_grade}</label></>)
                                                    })}
                    </div>

                    
                </div>              
                
            </div>
            <div> 
                <div className="row align-items-center offset-lg-1 justify-content-center members p-5">
                    <div data-bs-toggle="modal" data-bs-target="#addUser"  style={{opacity:'0.6'}} className="col-sm-5 col-md-5 col-lg-5 col-xl-3 p-4 mx-1 mb-3 ">
                        <div className="row cardMember">
                            <div style={{backgroundColor:"#cccccc", borderTopLeftRadius:"10px", borderTopRightRadius:"10px" }} className="col-12">
                                <button className="p-2 btn float-end" style={{border :'0'}} >                                            
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00b806" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </button>  
                            </div>                                    
                            <div style={{backgroundColor:"#ebebeb", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px"}} className=" bg-light shadow-sm col-12 downPart">

                                <div className="col-md-4 text-align">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                    </svg>
                                </div>
                                NOUVEAU
                            </div>
                        </div>
                    </div>
                      
                    <div className="modal fade" id="addUser" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content" style={{ backgroundColor: 'white' }}>

                                <div className="modal-body">

                                    
                                        <form className="form m-2" onSubmit={submitClient}>
                                            <h2>Nouveau client</h2>
                                            <label for="f-name">Prénom:</label><br/>
                                            <Input name="f-name" idName="f-name" max="50" min="1" type="texte" placeholder="Prénom" setFunc={setClientFirstName}/><br/>
                                            <label className="mt-2" for="l-name">Nom:</label><br/>
                                            <Input name="l-name" idName="l-name" max="50" min="1" type="texte" placeholder="Nom" setFunc={setClientLastName}/><br/>
                                            <label className="mt-2" for="grade">Grade:</label><br/>
                                            <select required onChange={(e) => {
                                                            setClientGrade(e.target.value)}} name="grade">
                                                {gradesList.map((val) => {
                                                        return <option value={val.id_grade}>{val.id_grade + ". "}{val.name_grade}</option>
                                                })}
                                            </select><br/><br/>                                     
                                            <input type="file" multiple name="file" onChange={changeHandler} /><br/><br/>                                            
                                            <button type ="submit">Envoyer</button>                                            
                                        </form>
                                    

                                </div>     

                            </div>

                        </div>

                    </div >

                    {membersList.filter(name => name.first_name.includes(filterText)).filter(currentGrade !== "Tous" ? grade => grade.name_grade === currentGrade : grade => grade.name_grade.includes("")).map((val) => {
                        return (
                            <div className="rounded col-sm-5 col-md-5 col-lg-5 col-xl-3 p-3 mx-1 mb-3 ">
                                <div className="row rounded cardMember">                                    
                                    <div style={{backgroundColor:val.color, borderTopLeftRadius:"10px", borderTopRightRadius:"10px" }} className="col-12">
                                        <div style={{border :'0', float:"right", verticalAlign: "middle"}}>
                                            <svg onClick={() => changeUser(val.id_member)}  data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="mt-3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg> 
                                        </div>
                                        <div className="mx-1" style={{border :'0', float:"right", verticalAlign: "middle"}}>
                                            <button id={val.id_member} style={{border :'0', float:"right", backgroundColor:"transparent"}} onClick={event => {if(window.confirm("Voulez vous vraiment supprimer " + val.last_name + "?")) delMember(val.id_member)}} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                    </div>  
                                                                     
                                    <div style={{backgroundColor:"#ebebeb", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px"}} className="col-12 downPart">

                                        <div className="col-md-4 text-align">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                            </svg>
                                        </div>
                                        <div style={{fontSize: "calc(0.5rem + 0.5vw)"}}>
                                             {val.first_name} {val.last_name}<br></br>
                                             <div style={{fontSize: "calc(0.3rem + 0.2vw)"}}>#C2021{val.id_member}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })} 
                    <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content" style={{ backgroundColor: color }}>

                        <div className="modal-body">

                            <div className="hovereffect">

                                <div className="row">

                                    <div className="col">

                                        <ImgContainer>
                                            <img src={profilePhoto} alt='' />
                                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                <span className="badge nineplus" >{count}</span>
                                            </OverlayTrigger>

                                        </ImgContainer>

                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                            </div>

                            <div className="tool">
                                {etatModification === 0 ? <p className="affiche"> {nameGrade.toUpperCase()} <i onClick={modificationUp} className="bi bi-pencil-square" style={{ color: 'white', 'background': color, "backgroundSize": "10px", fontSize: "80%", "textAlign": "right", "paddingRight": '10px ', "paddingLeft": "4px" }}></i></p>
                                    : allGrade.map(grade => (grade.name_grade !== nameGrade ?
                                        <i key={grade.name_grade} onClick={() => { modificationChoixGrade(grade.id_grade); }} className="bi bi-person-square" style={{ color: grade.color, "border": "10px black", "fontSize" : "100%",'background': color, "textAlign": "right", "paddingRight": "20px" }}></i> : ''))
                                }
                            </div>

                        </div>

                        <div className="col-12">

                            <EdiText
                                value={call}
                                type="text"
                                onSave={handleSave}
                                editing={editing}
                                buttonsAlign='before'
                            />
                        </div>


                    </div>
                </div>
            </div >             

            
                       
                </div>
                <ToastContainer style={{fontSize:"0.6rem"}}/>  
            </div>
        </>
    )
}