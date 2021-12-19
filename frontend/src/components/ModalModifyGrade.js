import '../css/Grades.css';
import ActionsCameras from './ActionsCameras';
import TitleModalGrade from './TitleModalGrade' ;
import { useState, useEffect } from 'reactn';


const ModalModifyGrade = ({currentGrade, currentColor, informationsCameras, currentIdGrade, saveAction, newNotifications, newActions, activateButton, setNewActionsConst, setNewNotificationsConst, newActionsConst, newNotificationsConst}) => {

    const [hover, setHover] = useState(false);
    // useEffect(()=> {
    //     console.log("changement newActionsConst")
	// }, [newActionsConst]);

    /**
     * Update the action's camera when opening the modify modal
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(()=> {
        for (let camera in informationsCameras) {
            if (informationsCameras[camera].id_camera in newActionsConst) {
                document.getElementsByClassName("action-" + currentIdGrade+"-" + informationsCameras[camera].id_camera)[0].checked = newActionsConst[camera];
            }
            else {document.getElementsByClassName("action-" + currentIdGrade+"-" + informationsCameras[camera].id_camera)[0].checked = informationsCameras[camera].allowed;}
            if (informationsCameras[camera].id_camera in newNotificationsConst) {
                document.getElementById("notification-" + currentIdGrade + "-" + informationsCameras[camera].id_camera).className = newNotificationsConst[camera] ? "bi bi-bell-fill" : "bi bi-bell-slash-fill";
            }
            else {document.getElementById("notification-" + currentIdGrade + "-" + informationsCameras[camera].id_camera).className = informationsCameras[camera].notification ? "bi bi-bell-fill" : "bi bi-bell-slash-fill";}
        }
	}, [informationsCameras]);

    /**
     * Change the notification status (disable or enable)
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idCamera  Identifier of the button camera
     * @param {boolean} notification  Presence of a notification or not
     */
     const changeNotification = (idCamera, notification) => {
        let test ;
        if (idCamera in newNotificationsConst) {
            document.getElementById("notification-" + currentIdGrade + "-" + idCamera).className = notification ? "bi bi-bell-fill" : "bi bi-bell-slash-fill" ;
            delete newNotifications[idCamera];

            test = {...newNotificationsConst} ;
            delete test[idCamera];
            setNewNotificationsConst(test) ;
        }
        else {
            document.getElementById("notification-" + currentIdGrade + "-" + idCamera).className = notification ? "bi bi-bell-slash-fill" : "bi bi-bell-fill" ;
            newNotifications[idCamera] = !notification ;
            
            test = {...newNotificationsConst} ;
            console.log("test avant ajout : ", test)
            test[idCamera] = !notification ;
            console.log("test apres ajout : ", test)
            console.log("newac : ", newNotifications)
            setNewNotificationsConst(test) ;
        }
        console.log("notif modif : ", newNotifications)
    }

    /**
     * Change the action of a camera
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} identifier  Identifier of the html switch that has just been switched
     */
     const changeAction = (identifier) => {
        let test ;
        let action = document.getElementsByClassName("action-" + currentIdGrade + "-" + identifier)[0].checked ; 
        if (identifier in newActionsConst) {
            delete newActions[identifier];

            test = {...newActionsConst} ;
            delete test[identifier];
            setNewActionsConst(test) ;
        }
        else {
            newActions[identifier] = action ; 

            test = {...newActionsConst} ;
            console.log("test avant ajout : ", test)
            test[identifier] = action ;
            console.log("test apres ajout : ", test)
            setNewActionsConst(test) ;
        }
        console.log("action modif : ", newActions)
    }

    /**
     * Cancel the modification and verify first if anything have been modify
     * (if it is the case, ask a confirmation to cancel)
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const cancelModification = () => {
        activateButton("close-modify");
        if (Object.keys(newActionsConst).length > 0 || Object.keys(newNotificationsConst).length > 0) {
            activateButton("open-confirmation");
        }
    }

    return (
        <div id="modifyGradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modifyGradeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <TitleModalGrade id="gradeModalLabel" bgColor={currentColor} text={currentGrade} />
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
                        <button type="button" id="close-modify" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                        <button type="button" id="open-confirmation" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-toggle="modal" data-bs-target="#confirmationCancelModal">Cancel</button>
                        <button type="button" className="btn modal-button bouton-action col-11 col-sm-5" style={{backgroundColor: hover ? "var(--hover-color)" : currentColor}} onClick={() => {saveAction();}} onMouseEnter={()=>{setHover(true);}} onMouseLeave={()=>{setHover(false);}}>Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalModifyGrade;