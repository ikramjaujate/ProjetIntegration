import '../css/Grades.css';


const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div className="row align-items-center p-1 m-2 bg-light rounded col-10 col-sm-10 col-md-10 col-lg-7 col-xl-7 col-xxl-7">
            <div className="name-camera-grade col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">{name}</div>
            <div className="bg-notification rounded col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2" style={{backgroundColor:allowed ? "var(--camera-allow)" : "var(--camera-refuse)" }}>  
                <i className="bi bi-bell icon-notification" style={{color:notification ? "white" : allowed ? "var(--camera-allow)" : "var(--camera-refuse)"}}></i>
            </div>
        </div>
    );
}

export default CameraInfo;