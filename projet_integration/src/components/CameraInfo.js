import PropTypes from 'prop-types';
import '../css/Grades.css';


// {/* <i className="bi bi-person-circle" style={{color:'red', fontSize:'2em'}}></i> */}
const CameraInfo = ({name, allowed, notification}) => {
    return (
        <div class="row p-1 m-2 bg-light rounded">
            <div class="col-md-4 align-self-center">{name}</div>
            <div class="col-md-2 offset-md-5 rounded" style={{backgroundColor:allowed ? "#90E093" : "#FF6060" }}>  
                {/* <i class="bi bi-bell" style={{color:"white", fontSize:'100%'}}></i> */}
                <i class="bi bi-bell" style={{color:notification ? "white" : allowed ? "#90E093" : "#FF6060" , fontSize:'100%'}}></i>
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