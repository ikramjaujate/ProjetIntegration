import '../css/Grades.css';

const LayoutGrade = ({name, color, members, allowed_camera, refused_camera}) => {

    return (
        <div className="row p-1 justify-content-center card-grade">
            <div type="button" className="p-1 bg-light shadow-sm rounded row col-10 col-md-9 col-lg-7 col-xl-6" data-bs-toggle="modal" data-bs-target="#gradeModal">
                <div className="rounded bg-person col-12 col-sm-3" style={{backgroundColor:color}} >
                    <i className="bi bi-people icon-person"></i>
                </div>
                <div className="align-self-center name-grade col-8 col-sm-6">{name}</div>
                <div className="layout-nbr-camera p-0 col align-self-end row col-4 col-sm-3">
                    <div className="p-0 informations col-6">
                        {allowed_camera} <i className="bi bi-camera-video-fill allowed-camera"></i>
                    </div>
                    <div className="p-0 informations col-6">
                        {refused_camera} <i className="bi bi-camera-video-fill refused-camera"></i>
                    </div>
                    <div className="p-0 informations col-12">{members} {members > 1 ? `membres` : `membre`}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutGrade;