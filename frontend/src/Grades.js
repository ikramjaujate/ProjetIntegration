import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';
import CameraInfo from './components/CameraInfo';
import ActionsCameras from './components/ActionsCameras';
import {useEffect, useState} from "react" ;


function Grades() {

    const [informationsGrade, setInformationsGrade] = useState([]);
    const [informationsCameras, setinformationsCameras] = useState([]);
    const [colorGrades, setColorGrades] = useState([]);
    const [currentColor, setCurrentColor] = useState("");
    const [currentGrade, setCurrentGrade] = useState("");
    const [currentIdGrade, setCurrentIdGrade] = useState("");
    const optionsToast = {
        autoClose: 8000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };
    let newActions = {} ;
    let newNotifications = {} ;
    const errorMsgClient = "Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous." ;
    

    /**
     * Initializes the Bootstrap elements necessary for the design of the page;
     * PopOver - Toast
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     useEffect(()=> {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
        .forEach(popoverNode => new Popover(popoverNode)) ;
        Array.from(document.querySelectorAll('.toast'))
        .forEach(toastNode => new Toast(toastNode));
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
        .forEach(tooltipNode => new Tooltip(tooltipNode))
	}, []);


    /**
     * Retrieves at page load the information concerning the different grades, as well 
     * as the different existing colors for the creation/modification of grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(()=> {
        getGrades() ;
        getColor() ;
	}, []);


    /**
     * Get information about the different grades
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const getGrades = () => {
        let informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:3001/api/grades`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCamera => {
            fetch(`http://localhost:3001/api/grades/members`, informations)
            .then(result => {
                return result.json();
            })
            .then(dataMembers => {
                //dataCamera.map(grade => grade.members = data)
                dataCamera.map(grade => grade.members = dataMembers.filter(gradeMembers =>gradeMembers.id_grade === grade.id_grade)[0].members) ;
                setInformationsGrade(dataCamera) ;
            });
        });
    }


    /**
     * Get the different existing colors for grade creation/modification
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const getColor = () => {
        let informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:3001/api/grades/colors`, informations)
        .then(result => {
            return result.json();
        })
        .then(data => {
            setColorGrades(data);
        });
    }


    /**
     * Assigns a color to the grade that is being created
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} newColor  Couleur sélectionnée pour le grade
     */
    const chooseColor = (idColor, newColor) => {
        document.getElementsByClassName('final-color')[0].style.color= newColor;
        document.getElementsByClassName('final-color')[0].id = idColor;
    }


    /**
     * Suppression of error messages at the creation of a grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const deleteErrorMsg = (nameError, colorError) => {
        if (nameError) {
            document.getElementById("name-grade").style.border = "1px solid #ced4da";
            document.getElementById("error-name").innerHTML = "";
        }
        if (colorError) {
            document.getElementById("error-color").innerHTML = "";
            let styleElem = document.head.appendChild(document.createElement("style"));
            styleElem.innerHTML = "#empty:before {border:none}";
        }
    }


    /**
     * Reset of the information specified for the creation of a grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const resetCreation = () => {
        deleteErrorMsg(true, true) ;
        chooseColor("empty", "var(--empty-color)")
        document.getElementById("name-grade").value = "";
    }


    /**
     * Adapt the name and color of the modal for the grade on which you want to have details
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} mainColor  Color of the selected grade
     * @param {string} mainName   Name of the selected grade
     * @param {integer} grade     Identifier of the selected grade
     */
    const openCameraInfo = (mainColor, mainName, grade) => {
        document.getElementById('gradeModalLabel').style.backgroundColor= mainColor;
        document.getElementById('gradeModalLabel').innerHTML= mainName;

        setCurrentColor(mainColor);
        setCurrentGrade(mainName);
        setCurrentIdGrade(grade);

        let informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch(`http://localhost:3001/api/grades/${grade}/cameras`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCameras => {
            setinformationsCameras(dataCameras) ;
        });
    }


    /**
     * Create a new grade, checking beforehand that the information requested is complete
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const createGrade = () => {

        let newName = document.getElementById("name-grade").value ;
        let newColor = document.getElementsByClassName("final-color")[0].id ;
        let newNameok = false, newColorok = false ;
        if (newName === "") {
            document.getElementById("name-grade").style.border = "1px solid var(--error)";
            document.getElementById("error-name").innerHTML = "Veuillez choisir un nom";
        }
        else if (informationsGrade.map(element => element.name_grade).indexOf(newName) !== -1) {
            document.getElementById("name-grade").style.border = "1px solid var(--error)";
            document.getElementById("error-name").innerHTML = "Ce nom existe déjà";
        }
        else {
            deleteErrorMsg(true, false);
            newNameok = true ;
        }
        
        if (newColor === "empty") {
            document.getElementById("error-color").innerHTML = "Veuillez choisir une couleur";
            let styleElem = document.head.appendChild(document.createElement("style"));
            styleElem.innerHTML = "#empty:before {border:1px solid red}";
        }
        else {
            deleteErrorMsg(false, true);
            newColorok = true ;
        }

        if (newColorok && newNameok) {
            deleteErrorMsg(true, true) ;

            fetch ("http://localhost:3001/api/grades",{
                method: "PUT",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({name:newName, idcolor:newColor})
            })
            .then((res)=> {
                return res.json();
            })
            .then(data => {
                resetCreation() ;
                document.getElementById("cancel-creation").click() ;
                if (data.message === "ok") {
                    getGrades() ;
                    getColor() ;
                    toast.success("Vous venez de créer le grade " + newName + " !", optionsToast);
                }
                else {
                    toast.error(errorMsgClient, optionsToast);
                }
            });    
        }
    }


    /**
     * Add a border around the selected color
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idColor  Identifier of the selected color
     */
     const highlithColor = (idColor) => {
        
        let styleElemNewColor = document.head.appendChild(document.createElement("style"));
        styleElemNewColor.innerHTML = `#little-square-${idColor}:before {border:1px solid var(--frame-choice-color); border-radius:4px;}`;

        let styleElemOldColor = document.head.appendChild(document.createElement("style"));
        let oldIdColor = document.getElementsByClassName("final-color")[0].id ;
        styleElemOldColor.innerHTML = `#little-square-${oldIdColor}:before {border:none;}`;
    }


    /**
     * Activate the button that allows you to close your modal
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} idButton  Identifier of the button to be activated
     */
     const activateButton = (idButton) => {
        document.getElementById(idButton).click() ;
        
    }


    
    /**
     * Change the notification status (disable or enable)
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idCamera  Identifier of the button camera
     * @param {boolean} notification  Presence of a notification or not
     */
     const changeNotification = (idCamera, notification) => {

        if (idCamera in newNotifications) {
            document.getElementById("notification-" + currentIdGrade + "-" + idCamera).className = notification ? "bi bi-bell-fill" : "bi bi-bell-slash-fill" ;
            delete newNotifications[idCamera];
        }
        else {
            document.getElementById("notification-" + currentIdGrade + "-" + idCamera).className = notification ? "bi bi-bell-slash-fill" : "bi bi-bell-fill" ;
            newNotifications[idCamera] = !notification ;
        }
        //document.getElementsByClassName("notification-" + idCamera)[0].className = "" ;
    }


    /**
     * Change the action of a camera
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} identifier  Identifier of the html switch that has just been switched
     */
     const changeAction = (identifier) => {
        let action = document.getElementsByClassName("action-" + currentIdGrade + "-" + identifier)[0].checked ; 
        if (identifier in newActions) {
            delete newActions[identifier];
        }
        else {
            newActions[identifier] = action ; 
        }
    }


    /**
     * Save new camera action and new presence/absence of notification for a grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const saveAction = () => {

        let grade = currentGrade ;
        let informations = { method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({actions : newActions, notifications : newNotifications})
        };

        fetch(`http://localhost:3001/api/grades/${currentIdGrade}/acces`, informations)
        .then(result => {
            return result.json();
        })
        .then(data => {
            activateButton("close-modify"); //à voir si on ferme le modal quand c'est ok ou si on renvoie qqpart
            newActions = {} ;
            newNotifications = {} ;
            if (data.message === "ok") {
                getGrades() ;
                openCameraInfo(currentColor,currentGrade,currentIdGrade) ;
                toast.success("Vous venez de modifier les actions des caméras du grade " + grade + " !", optionsToast);
            }
            else {
                toast.error(errorMsgClient, optionsToast);
            }
        });

    }

    /**
     * Cancel the modification and verify first if anything have been modify
     * (if it is the case, ask a confirmation to cancel)
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const cancelModification = () => {
        activateButton("close-modify");
        if (Object.keys(newActions).length > 0 || Object.keys(newNotifications).length > 0) {
            activateButton("open-confirmation");
        }
        else {
            activateButton("open-desc-grade-1");
        }
    }


    /**
     * Update the action's camera when opening the modifu modal
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const resetModal = () => {
        for (let camera in informationsCameras) {
            if (informationsCameras[camera].id_camera in newActions) {
                document.getElementsByClassName("action-" + currentIdGrade+"-" + informationsCameras[camera].id_camera)[0].checked = newActions[camera];
            }
            else {document.getElementsByClassName("action-" + currentIdGrade+"-" + informationsCameras[camera].id_camera)[0].checked = informationsCameras[camera].allowed;}
            if (informationsCameras[camera].id_camera in newNotifications) {
                document.getElementById("notification-" + currentIdGrade + "-" + informationsCameras[camera].id_camera).className = newNotifications[camera] ? "bi bi-bell-fill" : "bi bi-bell-slash-fill";
            }
            else {document.getElementById("notification-" + currentIdGrade + "-" + informationsCameras[camera].id_camera).className = informationsCameras[camera].notification ? "bi bi-bell-fill" : "bi bi-bell-slash-fill";}
            
        }
    }


    /**
     * Don't save the modifications that have been made on the actions and notification
     * of camera
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const deleteModification = () => {
        activateButton("close-cancel");
        activateButton("open-desc-grade-2");
        newActions = {} ;
        newNotifications = {} ;
    }

    
    return (
        <div>

            <div className="row justify-content-center">
                <div id="desription-page" className="row col-8 col-sm-10 col-md-9 col-lg-7 col-xl-7 col-xxl-7">
                    <div id="title-description" className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">Grade</div>
                    <div id="description" className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">Cette page vous permet de créer des grades, <br /> ainsi que de voir les détails de ces <br /> derniers !</div>
                </div>

                {informationsGrade && informationsGrade.map(grade => (
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" onClick={() => openCameraInfo(grade.color, grade.name_grade, grade.id_grade)}>
                        <LayoutGrade key={`prop-${grade.id_grade}`} name ={grade.name_grade} color={grade.color} members={grade.members} allowed_camera={grade.allowedcamera} refused_camera={grade.refusedcamera}/>
                    </div>
                ))}

                <div id="layout-add" className="text-center p-1 row justify-content-center col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <span data-toggle="tooltip" data-placement="top" title="Créer un grade">
                        <i className="p-0 bi bi-plus-circle-fill add-user col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1" type="button" data-bs-toggle="modal" data-bs-target="#addGradeModal"></i>
                    </span>
                </div>  
            </div>

            <div className="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header row justify-content-center">
                            <h5 className="p-1 modal-title shadow-sm rounded align-self-center col-11 col-sm-10 col-md-10 col-lg-9 col-xl-9 col-xxl-9" id="gradeModalLabel">Chargement</h5>

                        </div>
                        <div className="modal-body">

                            <div className="row justify-content-center">
                                {informationsCameras && informationsCameras.map(camera => (
                                    <CameraInfo key={`prop-${camera.id_permission}`} allowed={camera.allowed} name={camera.name_camera} notification={camera.notification}/>
                                ))}
                            </div>

                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" id="close-informations" className="btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                            <button type="button" className="btn modification-grade-button bouton-action col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal" onClick={() => {activateButton("close-informations");resetModal();}}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addGradeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header row">
                        <h5 className="p-1 modal-title col-sm-8 align-self-center offset-sm-2" id="addGradeModalLabel">Ajouter un grade</h5>
                    </div>
                    <div className="modal-body">

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-1">
                                    <div className="p-0 m-1 frame-grade-label col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11"> 
                                        <label id="name-grade-label" for="name-grade" className="col-form-label">Nom</label>
                                    </div>
                                    <div className="p-0 m-1 col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10" id="frame-name-grade-input">
                                        <input maxlength="10" type="text" className="form-control" id="name-grade" />
                                        {/* <i class="bi bi-exclamation-circle" style={{color:"red"}}></i> */}
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-3 order-md-2">
                                    <div className="p-0 m-1 frame-grade-label col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">
                                        <label id="color-grade-label" for="color-grade" className="col-form-label">Couleur</label>
                                    </div>
                                    <div id="frame-colors" className="p-0 m-0 rounded row col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 container-final-color">
                                            <i id="empty" className="final-color bi bi-square-fill" style={{color:"var(--empty-color)", fontSize:"175%"}}></i>
                                        </div>
                                        {colorGrades && colorGrades.map(color => (
                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 container-choosing-color">
                                                {/* <i type="button" className={`bi bi-square-fill ${color.id_color}`} style={{color:color.name-color}} onClick={() => highlithColor(color.id_color), () => chooseColor(color.id_color, color.name_color)}></i> */}
                                                <i type="button" id={`little-square-${color.id_color}`} className={`bi bi-square-fill ${color.id_color}`} style={{color:color.name_color}} onClick={() => {highlithColor(color.id_color);chooseColor(color.id_color, color.name_color)}}></i>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div id="error-name" className="errorMessage col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-2 order-md-3"></div>
                                <div id="error-color" className="errorMessage col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 order-4"></div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer row justify-content-between">
                        <button id="cancel-creation" type="button" className="btn creation-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" onClick={resetCreation}>Annuler </button>
                        <button type="button" className="btn creation-grade-button bouton-action col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" onClick={() => createGrade()}>Créer </button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modifyGradeModal" tabindex="-1" aria-labelledby="modifyGradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header row justify-content-center">
                            <h5 className="p-1 modal-title shadow-sm rounded align-self-center col-11 col-sm-10 col-md-10 col-lg-9 col-xl-9 col-xxl-9" id="modifyGradeModalLabel" style={{backgroundColor:currentColor}}>{currentGrade}</h5>

                        </div>
                        <div className="modal-body">

                            <div className="row justify-content-center">
                                {informationsCameras && informationsCameras.map(camera => (
                                    // <ActionsCameras name={camera.name_camera} allowed={camera.allowed} notification={camera.notification}></ActionsCameras>
                                    <div className="row p-1 m-2 bg-light rounded col-9 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" id="layoutActionsCameras">
                                        <div className="align-self-center col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">{camera.name_camera}</div>
                                        <div className="align-self-center col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4"> 
                                            <div class="form-check form-switch">
                                                {/* <input class={`form-check-input switch-action-${currentGrade} ${camera.allowed ? "switch-authorized" : ""}`} defaultChecked type="checkbox" role="switch" /> */}
                                                {camera.allowed ? <input class={`form-check-input kiki action-${currentIdGrade}-${camera.id_camera}`} defaultChecked type="checkbox" role="switch" onChange={() => changeAction(camera.id_camera)}/> : 
                                                                  <input class={`form-check-input kiki action-${currentIdGrade}-${camera.id_camera}`}  type="checkbox" role="switch" onChange={() => changeAction(camera.id_camera)}/>}
                                            </div>
                                        </div>
                                        <div className="rounded bg-notification col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">  
                                            {/* <i type="button" id={`notification-${currentIdGrade}-${camera.id_camera}`} className={`bi ${camera.notification ? "bi-bell-fill" : "bi-bell-slash-fill"}`} onClick={() => changeNotification(camera.id_camera, camera.notification)}></i> */}
                                            <i type="button" id={`notification-${currentIdGrade}-${camera.id_camera}`} className={`bi bi-bell-slash-fill`} onClick={() => changeNotification(camera.id_camera, camera.notification)}></i>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" className="btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" onClick={() => cancelModification()}>Annuler</button>
                            <button type="button" id="open-desc-grade-1" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir sur desc grade</button>
                            <button type="button" id="close-modify" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                            <button type="button" id="open-confirmation" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-toggle="modal" data-bs-target="#confirmationCancelModal">Cancel</button>
                            <button type="button" className="btn modification-grade-button bouton-action col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" onClick={() => {saveAction();}}>Enregistrer</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="confirmationCancelModal" tabindex="-1" aria-labelledby="confirmationCancelModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">

                            <div className="row justify-content-center container" style={{textAlign:"center"}}>
                                <i class="bi bi-x-circle" style={{color:"#f44336", fontSize: "465%"}}></i>
                                <h4>Voulez-vous vraiment annuler ? </h4>
                                <p>Toutes vos modifications seront perdues.</p>
                            </div>

                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" className="btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" onClick={() => {activateButton("close-cancel");activateButton("open-modify-grade")}}>Non</button>
                            <button type="button" id="open-desc-grade-2" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir desc grades</button>
                            <button type="button" id="open-modify-grade" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal">Revenir modif grades</button>
                            <button type="button" id="close-cancel" className="btn hidden-btn modification-grade-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" aria-label="Close">Fermer tout</button>
                            <button type="button" className="btn modification-grade-button bouton-warning col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" onClick={() => {deleteModification()}}>Oui</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer style={{fontSize:"0.6rem"}}/>      

        </div>
    );
  }
  
  export default Grades;