 import '../css/OngletCamera.css';
 
 import ToggleSwitch from "../components/ToggleSwitch.js";
 import Live from "../components/Live";
 import React from 'react';
 import { useEffect, useState } from "react";

function CadreCameras ({idCam,nomCam, statusCam, nomStatus}){
    const [etat, setEtat] = useState("https://video.4x4vert.be/video")
    return ( 
       <div>
            {statusCam ===1 ?
                <div  data-bs-toggle="tooltip" data-bs-placement="top" title="Cliquez pour visionner le live" className={`row col-11 col-sm-9 col-md-7 col-lg-8 offset-sm-3 offset-md-4 offset-1 offset-lg-3 shadow-sm cadreBouton ${nomStatus}`} data-bs-toggle="modal" data-bs-target='#ModalTarget'>
                    <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-camera-video"></i></div>
                    <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>
                    <ToggleSwitch nom={nomCam} setEtat={setEtat} status={statusCam} id = {idCam}/>
                    <Live idName={nomStatus} etat={etat}/>
                </div> 
            : <div  className={`row col-11 col-sm-9 col-md-7 shadow-sm col-lg-8 offset-sm-3 offset-md-4 offset-1 offset-lg-3 cadreBouton ${nomStatus}`}>  
                <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-camera-video-off"></i></div>
                <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>
                <ToggleSwitch nom={nomCam} status={statusCam} id = {idCam}/>
                </div>
            }    
        </div> 
    )
 }
 export default CadreCameras; 