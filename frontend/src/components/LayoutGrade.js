//import PropTypes from 'prop-types';
import '../css/Grades.css';

const LayoutGrade = ({name, color, members, allowed_camera, refused_camera}) => {

    return (
        <div className="row p-1 justify-content-center">
            <div id="big-layout-person" type="button" className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 p-1 bg-light shadow-sm rounded row" data-bs-toggle="modal" data-bs-target="#gradeModal">
                <div className="col-sm-3 rounded bg-person" style={{backgroundColor:color}} >
                    <i className="bi bi-person" style={{color:'white', fontSize:'350%'}}></i>
                </div>
                <div className="col-sm-6 align-self-center" style={{fontSize:'175%'}}>{name}</div>
                <div className="p-0 col-sm-3 col align-self-end row" style={{fontSize:'97%', margin:'0px', textAlign:'left'}}>
                    <div className="p-0 col-sm-6">
                        {allowed_camera} <i className="bi bi-camera-video-fill" style={{color:'#90e093'}}></i>
                    </div>
                    <div className="p-0 col-sm-6">
                        {refused_camera} <i className="bi bi-camera-video-fill" style={{color:'#ff6060'}}></i>
                    </div>
                    <div className="p-0 col-sm-12">{members} {members > 1 ? `membres` : `membre`}</div>
                </div>
            </div>
        </div>
    );
}

// LayoutGrade.propTypes = {
//     className : PropTypes.string,
//     id_div : PropTypes.string,
//     id_elem : PropTypes.string,
//     name : PropTypes.string,
//     value : PropTypes.string,
//     onClick : PropTypes.func,
// }

export default LayoutGrade;