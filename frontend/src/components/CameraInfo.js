import '../css/Grades.css';


const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#popUp" data-whatever="@mdo">X</button>
        <div className="row align-items-center p-1 m-2 bg-light rounded col-10 col-lg-7" id='popUp'>
            <div className="name-camera-grade col-9">{name}</div>
            <div className="bg-notification rounded col-3 col-lg-2" style={{backgroundColor:allowed ? "var(--camera-allow)" : "var(--camera-refuse)" }}>  
                <i className="bi bi-bell icon-notification" style={{color:notification ? "white" : allowed ? "var(--camera-allow)" : "var(--camera-refuse)"}}></i>
            </div>
        </div>
        </div>
    );
}

export default CameraInfo;