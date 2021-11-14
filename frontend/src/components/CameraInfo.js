import '../css/Grades.css';


const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div className="row align-items-center p-1 m-2 bg-light rounded col-10 col-lg-7 test1">
            <div className="name-camera-grade col-9 test2">{name}</div>
            <div className="bg-notification rounded col-3 col-lg-2 test3" style={{backgroundColor:allowed ? "var(--camera-allow)" : "var(--camera-refuse)" }}>  
                <i className="bi bi-bell icon-notification test4" style={{color:notification ? "white" : allowed ? "var(--camera-allow)" : "var(--camera-refuse)"}}></i>
            </div>
        </div>
    );
}

export default CameraInfo;