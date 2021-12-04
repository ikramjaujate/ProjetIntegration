import '../css/Grades.css';

const LayoutGrade = ({name, color, members, allowed_camera, refused_camera, id, openCameraInfo, order}) => {

    const deleteGrade = () => {
        console.log('delete')
    }
    const displayIcon = () => {
        document.getElementsByClassName("actionsGrade")[order].style.display = "flex" ;
    }
    const hideIcon = () => {
        document.getElementsByClassName("actionsGrade")[order].style.display = "none" ;
    }
    return (
        <div className="row p-1 justify-content-center card-grade offset-md-1 offset-lg-1">
            <div className="draggable-element gradeCard p-1 bg-light shadow-sm rounded row col-10 col-md-9 col-lg-7 col-xl-6" onMouseOver={() => {displayIcon()}} onMouseLeave={() => {hideIcon()}}>
                <div className="rounded bg-person col-12 col-sm-3" style={{backgroundColor:color}} >
                    <i className="bi bi-people icon-person"></i>
                </div>
                <div className="align-self-center name-grade col-8 col-sm-6">{name}</div>
                <div className="layout-nbr-camera p-0 col col-4 col-sm-3">
                    <div className="actionsGrade row col-12 p-0 m-0 mb-2 justify-content-around">
                        <div className="col-3 p-0 rounded-circle" style={{textAlign:"center", width:"1.4rem", backgroundColor:"#86bff1", color:"white!important"}} type="button"  data-bs-toggle="modal" data-bs-target="#gradeModal" onClick={() => openCameraInfo(color, name, id)}>
                            <i class="bi bi-eye-fill" style={{fontSize:"0.9rem"}}></i>
                        </div>
                        <div className="col-3 p-0 rounded-circle" style={{textAlign:"center", width:"1.4rem", backgroundColor:"#e7dca8", color:"white!important"}}>
                            <i class="bi bi-pen-fill" style={{fontSize:"0.8rem"}}></i>
                        </div>
                        <div className="col-3 p-0 rounded-circle" style={{textAlign:"center", width:"1.4rem", backgroundColor:"#fb4040", color:"white!important"}}>
                            <i class="bi bi-trash" style={{fontSize:"0.8rem"}}></i>
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
        </div>
    );
}

export default LayoutGrade;