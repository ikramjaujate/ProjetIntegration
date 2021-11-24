import '../css/Grades.css';
import ActionsCameras from './ActionsCameras';
import TitleModalGrade from './TitleModalGrade' ;
import { useState } from 'reactn';


const ModalModifyGrade = ({currentGrade, currentColor, informationsCameras, currentIdGrade, saveAction, newNotifications, newActions, activateButton}) => {

    const [hover, setHover] = useState(false);

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
                        <button type="button" id="open-desc-grade-1" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir sur desc grade</button>
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