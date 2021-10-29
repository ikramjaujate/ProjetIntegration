import '../css/Grades.css';
import ActionsCameras from './ActionsCameras';


const ModalModifyGrade = ({currentGrade, currentColor, informationsCameras, currentIdGrade, changeAction, changeNotification, cancelModification, saveAction}) => {

    return (
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
    );
}

export default ModalModifyGrade;