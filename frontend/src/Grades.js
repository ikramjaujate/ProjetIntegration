import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ChromePicker} from 'react-color' ;


import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';
import CameraInfo from './components/CameraInfo';
import ActionsCameras from './components/ActionsCameras';
import {useEffect, useState} from "react" ;
import ModalAddGrade from './components/ModalAddGrade';


function Grades() {

    const [informationsGrade, setInformationsGrade] = useState([]);
    const [informationsCameras, setinformationsCameras] = useState(null);
    const [colorGrades, setColorGrades] = useState([]);
    const [currentColor, setCurrentColor] = useState("");
    const [currentGrade, setCurrentGrade] = useState("");
    const [currentIdGrade, setCurrentIdGrade] = useState("");
    
    const [finalColor, setFinalColor] = useState("var(--empty-color)");
    const [finalIdColor, setFinalIdColor] = useState("empty");
    const [textErrorName, setTextErrorName] = useState("");
    const [textErrorColor, setTextErrorColor] = useState("");
    const [textNewNameGrade, setTextNewNameGrade] = useState("");
    const [borderNewNameGrade, setBorderNewNameGrade] = useState("null");
    const [titleModalDetails, setTitleModalDetails] = useState("Chargement");
    const [colorModalDetails, setColorModalDetails] = useState("var(--text-loading)");

    const optionsToast = {
        autoClose: 8000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };
    const errorMsgClient = "Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous." ;

    let newActions = {} ;
    let newNotifications = {} ;
    const [colorCreation, setColorCreation] = useState('red');
    const [showColorPicker, setShowColorPicker] = useState(false);


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
        fetch(`/api/grades`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCamera => {
            fetch(`/api/grades/members`, informations)
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
        fetch(`/api/grades/colors`, informations)
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
        setFinalColor(newColor);
        setFinalIdColor(idColor);
    }


    /**
     * Suppression of error messages at the creation of a grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const deleteErrorMsg = (nameError, colorError) => {
        if (nameError) {
            setBorderNewNameGrade("1px solid #ced4da");
            setTextErrorName("");
        }
        if (colorError) {
            setTextErrorColor("");
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
        setTextNewNameGrade("");
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
        setColorModalDetails(mainColor);
        setTitleModalDetails(mainName);

        setCurrentColor(mainColor);
        setCurrentGrade(mainName);
        setCurrentIdGrade(grade);

        let informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch(`/api/grades/${grade}/cameras`, informations)
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
        let newName = textNewNameGrade ;
        let newColor = finalIdColor ;
        let newNameok = false, newColorok = false ;
        if (newName === "") {
            setBorderNewNameGrade("1px solid var(--error)");
            setTextErrorName("Veuillez choisir un nom");
        }
        else if (informationsGrade.map(element => element.name_grade).indexOf(newName) !== -1) {
            setBorderNewNameGrade("1px solid var(--error)");
            setTextErrorName("Ce nom existe déjà");
        }
        else {
            deleteErrorMsg(true, false);
            newNameok = true ;
        }
        
        if (newColor === "empty") {
            setTextErrorColor("Veuillez choisir une couleur");
            let styleElem = document.head.appendChild(document.createElement("style"));
            styleElem.innerHTML = "#empty:before {border:1px solid red}";
        }
        else {
            deleteErrorMsg(false, true);
            newColorok = true ;
        }

        if (newColorok && newNameok) {
            deleteErrorMsg(true, true) ;

            fetch ("/api/grades",{
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
        let oldIdColor = finalIdColor ;
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

        fetch(`/api/grades/${currentIdGrade}/acces`, informations)
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


    // const changeColorCreation = (cc) => {
    //     console.log("var : ", document.getElementsByClassName("chrome-picker")[0]) ;//updatedColor ;
    //     //setColorCreation(updatedColor)
    // }
    
    return (
        <div>

            <div className="row justify-content-center">
                <div id="desription-page" className="row col-11 col-sm-10 col-md-9 col-lg-7">
                    <div id="title-description" className="col-12">Grade</div>
                    <div id="description" className="col-12">Cette page vous permet de créer des grades, <br /> ainsi que de voir les détails de ces <br /> derniers !</div>
                </div>

                {informationsGrade && informationsGrade.map(grade => (
                    <div className="col-12" onClick={() => openCameraInfo(grade.color, grade.name_grade, grade.id_grade)}>
                        <LayoutGrade key={`prop-${grade.id_grade}`} name={grade.name_grade} color={grade.color} members={grade.members} allowed_camera={grade.allowedcamera} refused_camera={grade.refusedcamera}/>
                    </div>
                ))}

                <div id="layout-add" className="row p-1 text-center justify-content-center col-12">
                    <span title="Créer un grade" data-toggle="tooltip" data-placement="top">
                        <i type="button" className="p-0 bi bi-plus-circle-fill add-user col-1" data-bs-toggle="modal" data-bs-target="#addGradeModal"></i>
                    </span>
                </div>  
            </div>

            <div id="gradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header row justify-content-center">
                            <h5 className="modal-title p-1 shadow-sm rounded col-10 col-sm-11 col-lg-9" id="gradeModalLabel" style={{backgroundColor:colorModalDetails}}>{titleModalDetails}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="layout-legend col-10 col-lg-9">
                                    <div className="col-12">
                                        <i className="bi bi-square-fill" style={{color:"var(--camera-allow)", fontSize: "0.95rem"}}></i> : accès autorisés
                                    </div>
                                    <div className="col-12">
                                        <i className="bi bi-square-fill" style={{color:"var(--camera-refuse)", fontSize: "0.95rem"}}></i> : accès refusés
                                    </div> 
                                    <div className="col-12" style={{margin: "0.3rem 0rem 0rem 0rem"}}>
                                        <i className="bi bi-bell icon-notification" style={{fontSize: "0.7rem", backgroundColor:"#7a7a7a", color:"white", padding: "0.0375rem 0.15rem 0.0375rem 0.15rem", borderRadius:"4px"}}></i> : activation d'une alerte de présence
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {informationsCameras && informationsCameras.map(camera => (
                                    <CameraInfo key={`prop-${camera.id_permission}`} allowed={camera.allowed} name={camera.name_camera} notification={camera.notification}/>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" id="close-informations" className="btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                            <button type="button" className="btn modal-button bouton-action col-11 col-sm-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal" onClick={() => {activateButton("close-informations");resetModal();}}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div id="addGradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="modal-title p-1 col-sm-8 offset-sm-2" id="addGradeModalLabel">Ajouter un grade</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-md-6 order-1">
                                        <div className="frame-grade-label p-0 m-1 col-11"> 
                                            <label id="name-grade-label" className="col-form-label" for="name-grade">Nom</label>
                                        </div>
                                        <div id="frame-name-grade-input" className="p-0 m-1 col-10">
                                            <input type="text" id="name-grade" className=" form-control" maxlength="10" value={textNewNameGrade} style={{border:borderNewNameGrade}} onChange={(e) => {setTextNewNameGrade(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 order-3 order-md-2">
                                        <div className="frame-grade-label p-0 m-1 col-11">
                                            <label id="color-grade-label" for="color-grade" className="col-form-label">Couleur</label>
                                        </div>
                                        <div id="frame-colors" className="row p-0 m-0 rounded col-11">
                                            <div className="container-final-color col-12">
                                                <i id={finalIdColor} className="bi bi-square-fill final-color" style={{color:finalColor, fontSize:"175%"}}></i>
                                            </div>
                                            {colorGrades && colorGrades.map(color => (
                                                <div className="container-choosing-color col-1">
                                                    <i type="button" id={`little-square-${color.id_color}`} className={`bi bi-square-fill ${color.id_color}`} style={{color:color.name_color}} onClick={() => {highlithColor(color.id_color);chooseColor(color.id_color, color.name_color)}}></i>
                                                </div>
                                            ))}
                                            <div className="container-choosing-color col-1">
                                                <i type="button" className={`bi bi-plus-square square-selection`} style={{color:colorCreation}} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}></i>
                                                {showColorPicker && (<ChromePicker color={colorCreation} onChange={updatedColor => setColorCreation(updatedColor.hex)}></ChromePicker>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="error-name" className="errorMessage col-12 col-md-6 order-2 order-md-3">{textErrorName}</div>
                                    <div id="error-color" className="errorMessage col-12 col-md-6 order-4">{textErrorColor}</div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" id="cancel-creation" className="btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" onClick={resetCreation}>Annuler </button>
                            <button type="button" className="btn modal-button bouton-action col-11 col-sm-5" onClick={() => createGrade()}>Créer </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <ModalAddGrade nameGrade={textNewNameGrade} borderGrade={borderNewNameGrade} colorGrade={finalColor} idColorGrade={finalIdColor} colors={colorGrades} errorName={textErrorName} errorColor={textErrorColor} setNameGrade={setTextNewNameGrade} highlithColor={highlithColor} resetCreation={resetCreation} createGrade={createGrade} chooseColor={chooseColor}/>

            <div id="modifyGradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modifyGradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header row justify-content-center">
                            <h5 id="modifyGradeModalLabel" className="modal-title p-1 shadow-sm rounded col-10 col-sm-11 col-lg-9" style={{backgroundColor:currentColor}}>{currentGrade}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-around">
                                <div className="row justify-content-center col-11 col-lg-6">
                                    {informationsCameras && informationsCameras.filter(element => informationsCameras.indexOf(element) < (informationsCameras.length)/2).map(camera => (
                                        <ActionsCameras name_camera={camera.name_camera} id_camera={camera.id_camera} notification={camera.notification} changeAction={changeAction} changeNotification={changeNotification} allowed={camera.allowed} currentIdGrade={currentIdGrade} />
                                    ))}
                                </div>
                                <div className="row justify-content-center col-11 col-lg-6">
                                    {informationsCameras && informationsCameras.filter(element => informationsCameras.indexOf(element) >= (informationsCameras.length)/2).map(camera => (
                                        <ActionsCameras name_camera={camera.name_camera} id_camera={camera.id_camera} notification={camera.notification} changeAction={changeAction} changeNotification={changeNotification} allowed={camera.allowed} currentIdGrade={currentIdGrade} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" className="btn modal-button bouton-close col-11 col-sm-5" onClick={() => cancelModification()}>Annuler</button>
                            <button type="button" id="open-desc-grade-1" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir sur desc grade</button>
                            <button type="button" id="close-modify" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                            <button type="button" id="open-confirmation" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-toggle="modal" data-bs-target="#confirmationCancelModal">Cancel</button>
                            <button type="button" className="btn modal-button bouton-action col-11 col-sm-5" onClick={() => {saveAction();}}>Enregistrer</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="confirmationCancelModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirmationCancelModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="layout-modal-cancel row justify-content-center container">
                                <i id="icon-cancel" className="bi bi-x-circle"></i>
                                <h4>Voulez-vous vraiment annuler ? </h4>
                                <p>Toutes vos modifications seront perdues.</p>
                            </div>
                        </div>
                        <div className="modal-footer row justify-content-between">
                            <button type="button" className="btn modal-button bouton-close col-11 col-sm-5" onClick={() => {activateButton("close-cancel");activateButton("open-modify-grade")}}>Non</button>
                            <button type="button" id="open-desc-grade-2" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir desc grades</button>
                            <button type="button" id="open-modify-grade" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal">Revenir modif grades</button>
                            <button type="button" id="close-cancel" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer tout</button>
                            <button type="button" className="btn modal-button bouton-warning col-11 col-sm-5" onClick={() => {deleteModification()}}>Oui</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer style={{fontSize:"0.6rem"}}/>      

        </div>
    );
  }
  
  export default Grades;
