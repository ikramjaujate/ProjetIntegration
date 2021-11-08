
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
    <div class="modal fade" id='ModalTarget' tabindex="-1" role="dialog" aria-labelledby="ModalLive" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="ModalLive">Live</h5>
      <button type="button" class= "close " data-bs-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div>live...</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" ><i class="bi bi-camera-reels"></i></button>
      <button type="button" class="btn btn-primary"><i class="bi bi-camera"></i></button>
    </div>
  </div>
  </div>
  </div>
)
}
export default Live; 