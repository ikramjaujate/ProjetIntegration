 import '../css/OngletCamera.css';
 import ToggleSwitch from "../components/ToggleSwitch.js";
 import  PopUpSup from '../components/Pop-UpSup';
 import Live from "../components/Live";

function CadreCameras ({idCam,nomCam, statusCam, nomStatus}){
    
    
    return (   
        <div class="row" className='cadreBouton' id={nomCam} data-bs-toggle="modal" data-bs-target='#ModalTarget'>
            <div class="col"> Zone: {nomCam}</div>
            <div class="col"> Statut : {nomStatus}</div>
            <ToggleSwitch nom={nomCam} status={statusCam} id = {idCam}/>
            {/* <PopUpSup nom={nomCam} status={statusCam} id = {idCam */}
            <Live/>
            
        </div>
    )
 }
 export default CadreCameras; 