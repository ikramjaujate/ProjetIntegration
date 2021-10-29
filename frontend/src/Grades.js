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
import {useEffect, useState} from "react" ;
import ModalAddGrade from './components/ModalAddGrade';
import ModalModifyGrade from './components/ModalModifyGrade';
import ModalConfirmationCancel from './components/ModalConfirmationCancel';
import ModalDetailGrade from './components/ModalDetailGrade';


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
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };
    const errorMsgClient = "Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous." ;

    let newActions = {} ;
    let newNotifications = {} ;


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
     * Activate the button that allows you to close your modal
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} idButton  Identifier of the button to be activated
     */
     const activateButton = (idButton) => {
        document.getElementById(idButton).click() ;
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
     * Update the action's camera when opening the modify modal
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

            <ModalDetailGrade informationsCameras={informationsCameras} colorModalDetails={colorModalDetails} titleModalDetails={titleModalDetails} activateButton={activateButton} resetModal={resetModal} />           
            <ModalAddGrade nameGrade={textNewNameGrade} borderGrade={borderNewNameGrade} colorGrade={finalColor} idColorGrade={finalIdColor} colors={colorGrades} errorName={textErrorName} errorColor={textErrorColor} setNameGrade={setTextNewNameGrade} resetCreation={resetCreation} createGrade={createGrade} chooseColor={chooseColor}/>
            <ModalModifyGrade currentColor={currentColor} currentIdGrade={currentIdGrade} currentGrade={currentGrade} informationsCameras={informationsCameras} saveAction={saveAction} newNotifications={newNotifications} newActions={newActions} activateButton={activateButton}/>
            <ModalConfirmationCancel activateButton={activateButton} deleteModification={deleteModification} />

            <ToastContainer style={{fontSize:"0.6rem"}}/>      

        </div>
    );
  }
  
  export default Grades;
