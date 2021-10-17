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
import {useEffect, useState} from "react" ;


// export const one = () => {
//     let i = 0;
//         if (this === that) {
//             i = 0;
//         } else {
//            i = 1;
//         }
//     }
    
// export const two = () => {
//     let i = 0;
//         if (this === that) {
//             i = 0;
//         } else {
//            i = 1;
//         }
//     }

function TestComponent() {
    const [informationsGrade, setInformationsGrade] = useState([]);
    const [informationsCameras, setinformationsCameras] = useState(null);
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
    const [colorCreation, setColorCreation] = useState('red');
    const [showColorPicker, setShowColorPicker] = useState(false);
};
export default TestComponent;

/**
     * Get information about the different grades
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
export const getGrades = () => {
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
export const getColor = () => {
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
export const chooseColor = (idColor, newColor) => {
    document.getElementsByClassName('final-color')[0].style.color= newColor;
    document.getElementsByClassName('final-color')[0].id = idColor;
}


/**
 * Suppression of error messages at the creation of a grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 */
export const deleteErrorMsg = (nameError, colorError) => {
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
export const resetCreation = () => {
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
export const openCameraInfo = (mainColor, mainName, grade) => {
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
export const createGrade = () => {

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
export const highlithColor = (idColor) => {
    
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
export const activateButton = (idButton) => {
    document.getElementById(idButton).click() ;
    
}



/**
 * Change the notification status (disable or enable)
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @param {integer} idCamera  Identifier of the button camera
 * @param {boolean} notification  Presence of a notification or not
 */
export const changeNotification = (idCamera, notification) => {

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
export const changeAction = (identifier) => {
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
export const saveAction = () => {

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
export const cancelModification = () => {
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
export const resetModal = () => {
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
export const deleteModification = () => {
    activateButton("close-cancel");
    activateButton("open-desc-grade-2");
    newActions = {} ;
    newNotifications = {} ;
}


export const changeColorCreation = (cc) => {
    console.log("var : ", document.getElementsByClassName("chrome-picker")[0]) ;//updatedColor ;
    //setColorCreation(updatedColor)
}

export const test = (variable) => {
    console.log("testttt");
    console.log("var : ", variable);
}

