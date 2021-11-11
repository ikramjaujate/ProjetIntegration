
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/Pop-UpSup.css';

function Live(){
  
  

return(
  <div class="modal fade" id='ModalTarget' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="ModalLive" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div style={{'width':'mincontent'}}>
            <img class="img-thumbnail justify-content-between" alt='visu_live'src= "http://0.0.0.0:6060/video" width="440" height="300" title="Foscam FI8905W" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" className="col-2 btn btn-secondary"><i className="bi bi-camera-reels"></i></button>
          <button type="button" className="col-2 btn btn-primary"><i class="bi bi-camera"></i></button>
        </div>
      </div>
    </div>
  </div>
)}
export default Live; 