import '../css/Grades.css';

const LayoutGrade = ({name, color, members, allowed_camera, refused_camera, id, openCameraInfo, order, deleteGrade}) => {

    
    const displayIcon = () => {
        document.getElementById("actionsGrade-" + id).className = "actionsGrade row col-12 p-0 m-0 mb-2 justify-content-around visible" ; 
    }
    const hideIcon = () => {
        document.getElementById("actionsGrade-" + id).className = "actionsGrade row col-12 p-0 m-0 mb-2 justify-content-around hidden" ; 
    }
    return (
        // col-10 col-md-9 col-lg-7 col-xl-6
        <div className="draggable-element gradeCard p-1 bg-light shadow-sm rounded row col-12" onMouseOver={() => {displayIcon()}} onMouseLeave={() => {hideIcon()}}>
            <div className="rounded bg-person col-12 col-sm-3" style={{backgroundColor:color}} >
                <i className="bi bi-people icon-person"></i>
            </div>
            <div className="align-self-center name-grade col-8 col-sm-6">{name}</div>
            <div className="layout-nbr-camera p-0 col col-4 col-sm-3">
                <div id={`actionsGrade-${id}`} className="actionsGrade row col-12 col-xxl-10 offset-xxl-2 p-0 mb-2 justify-content-around hidden">
                    <div type="button" className="frameSee frameActions col-3 p-0 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#gradeModal" onClick={() => openCameraInfo(color, name, id)}>
                        <i class="bi bi-eye seeIcon"></i>
                    </div>
                    <div type="button" className="frameModify frameActions col-3 p-0 rounded-circle shadow" data-bs-target="#modifyGradeModal" data-bs-toggle="modal" onClick={() => {openCameraInfo(color, name, id, true);}}>
                        <i class="bi bi-pen modifyIcon"></i>
                    </div>
                    <div type="button" className="frameDelete frameActions col-3 p-0 rounded-circle shadow" onClick={() => {deleteGrade(id)}}>
                        <i class="bi bi-trash deleteIcon"></i>
                    </div>
                </div>
                <div className="p-0 col align-self-end row col-12 m-0">
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