import '../css/Grades.css';
import CameraInfo from './CameraInfo';


const ModalDetailsGrade = ({informationsCam, fctActivateButton, fctResetModal}) => {
    console.log("info : ", informationsCam)
    return (
        <div id="gradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header row justify-content-center">
                        <h5 className="modal-title p-1 shadow-sm rounded col-10 col-sm-10 col-md-10 col-lg-9 col-xl-9 col-xxl-9" id="gradeModalLabel">Chargement</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row justify-content-center">
                            {informationsCam && informationsCam.map(camera => (
                                <CameraInfo key={`prop-${camera.id_permission}`} allowed={camera.allowed} name={camera.name_camera} notification={camera.notification}/>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer row justify-content-between">
                        <button type="button" id="close-informations" className="btn modal-button bouton-close col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                        <button type="button" className="btn modal-button bouton-action col-11 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal" onClick={() => {fctActivateButton("close-informations");fctResetModal()}}>Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailsGrade;