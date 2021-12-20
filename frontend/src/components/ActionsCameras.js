import '../css/Grades.css';


const ActionsCameras = ({name_camera, id_camera, notification, changeAction, changeNotification, allowed, currentIdGrade}) => {

    return (
        <div className="layout-actions-cameras row p-1 m-2 bg-light rounded col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="name-camera-grade col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7">{name_camera}</div>
            <div className="switch-camera-grade col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"> 
                <div className="form-check form-switch">
                    {allowed ? <input type="checkbox" className={`form-check-input input-switch action-${currentIdGrade}-${id_camera}`} defaultChecked role="switch" onChange={() => changeAction(id_camera)}/> : 
                                        <input type="checkbox" className={`form-check-input input-switch action-${currentIdGrade}-${id_camera}`} role="switch" onChange={() => changeAction(id_camera)}/>}
                </div>
            </div>
            <div className="rounded col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">  
                <i type="button" id={`notification-${currentIdGrade}-${id_camera}`} className={`bi bi-bell-slash-fill`} onClick={() => changeNotification(id_camera, notification)}></i>
            </div>
        </div>
    );
}

ActionsCameras.defaultProps = {
    name_camera: "Chargement",
    id_camera : "0",
    notification : false ,
    changeAction : () => {},
    changeNotification : () => {},
    allowed : false,
    currentIdGrade : "0"
}

export default ActionsCameras;