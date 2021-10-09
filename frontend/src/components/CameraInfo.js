//import PropTypes from 'prop-types';
import '../css/Grades.css';


const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div className="row p-1 m-2 bg-light rounded col-9 col-sm-8 col-md-9 col-lg-7 col-xl-7 col-xxl-7">
            <div className="align-self-center col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">{name}</div>
            <div className="rounded bg-notification col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2" style={{backgroundColor:allowed ? "#90E093" : "#FF6060" }}>  
                <i className="bi bi-bell" style={{color:notification ? "white" : allowed ? "#90E093" : "#FF6060" , fontSize:'100%'}}></i>
            </div>
        </div>
    );
}

// CameraInfo.propTypes = {
//     className : PropTypes.string,
//     id_div : PropTypes.string,
//     id_elem : PropTypes.string,
//     name : PropTypes.string,
//     value : PropTypes.string,
//     onClick : PropTypes.func,
// }

export default CameraInfo;