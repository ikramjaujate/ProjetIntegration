import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';
import CameraInfo from './components/CameraInfo';
import {useEffect, useState} from "react" ;


function Grades() {

    const [informationsGrade, setInformationsGrade] = useState([]);
    const [informationsCameras, setinformationsCameras] = useState([]);
    const [colorGrades, setColorGrades] = useState([]);
    const optionsToast = {
        autoClose: 8000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };
    

    /**
     * Initialise les éléments Bootstrap nécessaire au design de la page ;
     * PopOver - toast
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     useEffect(()=> {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
        .forEach(popoverNode => new Popover(popoverNode)) ;
        Array.from(document.querySelectorAll('.toast'))
        .forEach(toastNode => new Toast(toastNode));
	}, []);


    /**
     * Récupère au chargement de la page les informations concernant les différents grades,
     * ainsi que les différentes couleurs existantes pour la création/modification de grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(()=> {
        getGrades() ;
        getColor() ;
	}, []);


    /**
     * Récupère les informations concernant les différents grades
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
                dataCamera.map(grade => grade.members = dataMembers.filter(gradeMembers =>gradeMembers.id_grade === grade.id_grade)[0].members) ;
                setInformationsGrade(dataCamera) ;
            });
        });
    }


    /**
     * Récupère les différentes couleurs existantes pour la création/modification de grade
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
     * Assigne une couleur au grade qui est en train d'être créé
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} newColor  Couleur sélectionnée pour le grade
     */
    const chooseColor = (idColor, newColor) => {
        document.getElementsByClassName('final-color')[0].style.color= newColor;
        document.getElementsByClassName('final-color')[0].id = idColor;
    }


    /**
     * Suppression des messages d'erreurs
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
     * Remise à 0 des informations spécifiées pour la création d'un grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const resetCreation = () => {
        deleteErrorMsg(true, true) ;
        chooseColor("empty", "var(--empty-color)")
        document.getElementById("name-grade").value = "";
    }


    /**
     * Adapte le nom et la couleur du modal pour le grade sur lequel on souhaite avoir des détails
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} mainColor  Couleur du grade sélectionné
     * @param {string} mainName   Nom du grade sélectionné
     */
    const openCameraInfo = (mainColor, mainName, grade) => {
        document.getElementById('gradeModalLabel').style.backgroundColor= mainColor;
        document.getElementById('gradeModalLabel').innerHTML= mainName;

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
     * Créer un nouveau grade, en vérifiant au préalable si les informations demandées
     * sont complètes
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
                getGrades() ;
                getColor() ;
                resetCreation() ;
                document.getElementById("cancel-creation").click() ;
                console.log("data = ", data);
                toast.success("Vous venez de créer le grade " + newName + " !", optionsToast);
            });
           
        }
    }


    /**
     * Ajout d'une bordure autour de la couleur sélectionnée
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const highlithColor = (idColor) => {
        
        let styleElemNewColor = document.head.appendChild(document.createElement("style"));
        styleElemNewColor.innerHTML = `#little-square-${idColor}:before {border:1px solid var(--frame-choice-color); border-radius:4px;}`;

        let styleElemOldColor = document.head.appendChild(document.createElement("style"));
        let oldIdColor = document.getElementsByClassName("final-color")[0].id ;
        styleElemOldColor.innerHTML = `#little-square-${oldIdColor}:before {border:none;}`;
        
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
                    <i className="p-0 bi bi-plus-circle-fill add-user col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1" type="button" data-bs-toggle="modal" data-bs-target="#addGradeModal"></i>
                </div>  
            </div>

            <div className="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header row justify-content-center">
                        <h5 className="p-1 modal-title shadow-sm rounded align-self-center col-11 col-sm-10 col-md-10 col-lg-9 col-xl-9 col-xxl-9" style={{backgroundColor:'#F8F9FA', color:"white", textAlign:"center"}} id="gradeModalLabel">Chargement</h5>

                    </div>
                    <div className="modal-body">

                        <div className="row justify-content-center">
                            {informationsCameras && informationsCameras.map(camera => (
                                <CameraInfo key={`prop-${camera.id_permission}`} allowed={camera.allowed} name={camera.name_camera} notification={camera.notification}/>
                            ))}
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addGradeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header row">
                        <h5 className="p-1 modal-title col-sm-8 align-self-center offset-sm-2" style={{textAlign:"center"}} id="addGradeModalLabel">Ajouter un grade</h5>
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
                        <button id="cancel-creation" type="button" className="btn btn-secondary creation-grade-button col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" style={{backgroundColor:"#3A3E45", color:"white"}} onClick={resetCreation}>Annuler </button>
                        <button type="button" className="btn creation-grade-button col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" style={{backgroundColor:"#4DAAB3", color:"white"}} onClick={() => createGrade()}>Créer </button>
                    </div>
                    </div>
                </div>
            </div>
            <ToastContainer style={{fontSize:"0.6rem"}}/>

        </div>
    );
  }
  
  export default Grades;
