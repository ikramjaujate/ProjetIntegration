import '../css/Grades.css';


const ActionsCameras = ({name, allowed, notification}) => {

    /**
     * Ajout d'une bordure autour de la couleur sélectionnée
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idColor  Identifiant de la couleur sélectionnée
     */
     const cc = () => {
        
        console.log("oui");
    }


    return (
        <div className="row p-1 m-2 bg-light rounded col-9 col-sm-8 col-md-9 col-lg-7 col-xl-7 col-xxl-7">
            <div className="align-self-center col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">{name}</div>
            <div className="align-self-center col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3"> 
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" checked={allowed ? true : false}/>
                </div>
            </div>
            <div className="rounded bg-notification col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">  
                {/* <i className={`bi ${notification ? "bi-bell-fill" : "bi-bell-slash-fill"}`} style={{color:notification ? "white" : allowed ? "var(--camera-allow)" : "var(--camera-refuse)"}}></i> */}
                <i type="button" className={`bi ${notification ? "bi-bell-fill" : "bi-bell-slash-fill"}`} style={{color:notification ? "var(--notification-on)" : "var(--notification-off)"}} onClick={() => cc()}></i>
            </div>
        </div>
    );
}

export default ActionsCameras;