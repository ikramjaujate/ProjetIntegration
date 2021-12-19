import '../css/Grades.css';
import CameraInfo from './CameraInfo';
import TitleModalGrade from './TitleModalGrade' ;
import { useState } from 'reactn';


const ModalDetailGrade = ({informationsCameras, colorModalDetails, titleModalDetails, activateButton}) => {

    const [hover, setHover] = useState(false);

    return (
        <div id="gradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill rounded-circle" type="button" onClick={() => {console.log("oui")}}>
                    <span className="visually-hidden">New alerts</span>
                    <i className="bi bi-trash" type="button" onClick={() => {console.log("oui")}}></i>
                </span> */}
                <div className="modal-content">
                    <TitleModalGrade bgColor={colorModalDetails} text={titleModalDetails} />
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
                    <div className="modal-footer row justify-content-center">
                        <button type="button" id="close-informations" className="btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailGrade;