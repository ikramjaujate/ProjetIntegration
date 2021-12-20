
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

function Live({etat,index,nomCam}){
  const [screenshoot, setScreenshoot] = useState(null);
  const optionsToast = {
    autoClose: 5000,
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
};

  function Capture() {
    //event.preventDefault()
    console.log("capture")
    fetch("http://192.168.1.3:6060/photo", {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors'
    })
        .then(res => res.json)
        .then(data => {
            fetch("/api/pictureScreenshoot", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    setScreenshoot(data.picture)
                    const ScreenshotToast = () => (
                        <div >
                            <img class="layout-screenshot" data-bs-toggle="modal" data-bs-target="#openscreenshotmodal" src={`image-client/${data.picture}`} alt="video surveillance" width="100" height="auto" />
                        </div>
                    )
                    toast.info(<ScreenshotToast />, optionsToast);
                })
        })

}


return(
  <>
    <div class="modal fade" id={`modal-${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style={{'color':'grey'}} class="modal-title" id="staticBackdropLabel">{nomCam}</h5>
            <button type="button" class=" btn-secondary btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img className="img-thumbnail" alt='visu_live' src='https://video.4x4vert.be/video' width="440" height="300" title="Foscam FI8905W" />
          </div>
          <div class="modal-footer justify-content-center">
            
            <button type="button" onClick={Capture} className="btn btn-sm m-2 save-button"><i className="bi bi-camera"></i></button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer style={{ fontSize: "0.6rem" }} />
            <div id="openscreenshotmodal" className="modal fade" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-body">
                            <img class="modal-screenshot" src={`image-client/${screenshoot}`} alt="video surveillance" width="100%" height="100%" />
                        </div>

                    </div>
                </div>
            </div>
    </>
    
)}
export default Live; 