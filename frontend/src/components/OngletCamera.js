 import '../css/OngletCamera.css';
 import ToggleSwitch from "../components/ToggleSwitch.js";
 import  PopUpSup from '../components/Pop-UpSup';
 import Live from "../components/Live";
 import React from 'react';

function CadreCameras ({idCam,nomCam, statusCam, nomStatus}){
    

    function MouseOver(status, camera ) {
        if (status === 1){
            document.getElementById(camera).style.backgroundcolor="red";
        }
        

    }
    
    return ( 
       <div onMouseOver={()=>MouseOver(statusCam, idCam)}>
            {statusCam ===1 ?
                <div  className={`row col-11 col-sm-8 col-md-7 col-lg-8 offset-sm-3 offset-md-4 offset-1 offset-lg-3 cadreBouton ${nomStatus}`} data-bs-toggle="modal" data-bs-target='#ModalTarget'>
                    <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-camera-video"></i></div>
                    <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>
                    <ToggleSwitch nom={nomCam} status={statusCam} id = {idCam}/>
                    <Live idName={nomStatus}/>
                </div> 
            : <div  className={`row col-11 col-sm-8 col-md-7 col-lg-8 offset-sm-3 offset-md-4 offset-1 offset-lg-3 cadreBouton ${nomStatus}`}>  
                <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-camera-video-off"></i></div>
                <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>
                <ToggleSwitch nom={nomCam} status={statusCam} id = {idCam}/>
                </div>
            }    
        </div> 
    )
 }
 export default CadreCameras; 