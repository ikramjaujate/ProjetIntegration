//import PropTypes from 'prop-types';
import '../css/Grades.css';

const LayoutGrade = ({name, color, members, allowed_camera, refused_camera}) => {

    return (
        <div className="row p-1 justify-content-center card-grade">
            <div id="big-layout-person" type="button" className="p-1 bg-light shadow-sm rounded row col-10 col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5" data-bs-toggle="modal" data-bs-target="#gradeModal">
                <div className="rounded bg-person col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style={{backgroundColor:color}} >
                    <i className="bi bi-person icon-person"></i>
                </div>
                <div className="align-self-center name-grade col-8 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">{name}</div>
                <div className="p-0 col align-self-end row col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style={{fontSize:'97%', margin:'0px', textAlign:'left'}}>
                    <div className="p-0 informations col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        {allowed_camera} <i className="bi bi-camera-video-fill" style={{color:'#90e093'}}></i>
                    </div>
                    <div className="p-0 informations col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        {refused_camera} <i className="bi bi-camera-video-fill" style={{color:'#ff6060'}}></i>
                    </div>
                    <div className="p-0 informations col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">{members} {members > 1 ? `membres` : `membre`}</div>
                </div>
            </div>
            {/* <div id="big-layout-person" type="button" className="p-1 bg-light shadow-sm rounded row col-10 col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5" data-bs-toggle="modal" data-bs-target="#gradeModal">
                <div className="rounded bg-person col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style={{backgroundColor:color}} >
                    <i className="bi bi-person icon-person"></i>
                </div>
                <div className="col-8 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="align-self-center name-grade col-8 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">{name}</div>
                    <div className="p-0 col row col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style={{fontSize:'97%', margin:'0px', textAlign:'left'}}>
                        <div className="p-0 informations col-3 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 offset-6 offset-sm-0">
                            {allowed_camera} <i className="bi bi-camera-video-fill" style={{color:'#90e093'}}></i>
                        </div>
                        <div className="p-0 informations col-3 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            {refused_camera} <i className="bi bi-camera-video-fill" style={{color:'#ff6060'}}></i>
                        </div>
                        <div className="p-0 informations col-6 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 offset-6 offset-sm-0">{members} {members > 1 ? `membres` : `membre`}</div>
                    </div>
                </div>
            </div> */}
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