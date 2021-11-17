
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Live(){
  
  

return(
    <div class="modal fade" id="ModalTarget" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style={{'color':'grey'}} class="modal-title" id="staticBackdropLabel">__Live__</h5>
            <button type="button" class=" btn-secondary btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img className="img-thumbnail" alt='visu_live'src= "http://0.0.0.0:6060/video" width="440" height="300" title="Foscam FI8905W" />
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" className=" col-3 btn btn-secondary"><i className="bi bi-camera-reels"></i></button>
            <button type="button" className=" col-3 btn btn-secondary"><i className="bi bi-camera"></i></button>
          </div>
        </div>
      </div>
    </div>
)}
export default Live; 