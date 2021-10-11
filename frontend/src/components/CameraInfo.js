import '../css/Grades.css';


const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div className="row p-1 m-2 bg-light rounded col-9 col-sm-8 col-md-9 col-lg-7 col-xl-7 col-xxl-7">
            <div className="align-self-center col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">{name}</div>
            <div className="rounded bg-notification col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2" style={{backgroundColor:allowed ? "var(--camera-allow)" : "var(--camera-refuse)" }}>  
                <i className="bi bi-bell icon-notification" style={{color:notification ? "white" : allowed ? "var(--camera-allow)" : "var(--camera-refuse)"}}></i>
            </div>
        </div>
    );
}

export default CameraInfo;