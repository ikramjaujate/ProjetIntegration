import '../css/Grades.css';


const ActionsCameras = ({name_camera, id_camera, notification, changeAction, changeNotification, allowed, currentIdGrade}) => {

    /**
     * Add a border around the selected color
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const cc = () => {
        
        console.log("oui");
    }


    return (
        <div className="layoutActionsCameras row p-1 m-2 bg-light rounded col-9 col-sm-9 col-md-10 col-lg-5 col-xl-5 col-xxl-5">
            <div className="name-camera-grade col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7">{name_camera}</div>
            <div className="switch-camera-grade col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"> 
                <div className="form-check form-switch">
                    {/* <input className={`form-check-input switch-action-${currentGrade} ${camera.allowed ? "switch-authorized" : ""}`} defaultChecked type="checkbox" role="switch" /> */}
                    {allowed ? <input type="checkbox" className={`form-check-input input-switch action-${currentIdGrade}-${id_camera}`} defaultChecked role="switch" onChange={() => changeAction(id_camera)}/> : 
                                        <input type="checkbox" className={`form-check-input input-switch action-${currentIdGrade}-${id_camera}`} role="switch" onChange={() => changeAction(id_camera)}/>}
                </div>
            </div>
            <div className="rounded col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">  
                {/* <i type="button" id={`notification-${currentIdGrade}-${camera.id_camera}`} className={`bi ${camera.notification ? "bi-bell-fill" : "bi-bell-slash-fill"}`} onClick={() => changeNotification(camera.id_camera, camera.notification)}></i> */}
                <i type="button" id={`notification-${currentIdGrade}-${id_camera}`} className={`bi bi-bell-slash-fill`} onClick={() => changeNotification(id_camera, notification)}></i>
            </div>
        </div>
    );
}

export default ActionsCameras;