import '../css/OngletCamera.css';

import ToggleSwitch from "../components/ToggleSwitch.js";
import Live from "../components/Live";
import React from 'react';
import testModal from './ModalLive';
import { useEffect, useState } from "react";

function CadreCameras({ idCam, nomCam, statusCam, nomStatus, index }) {
    const [etat, setEtat] = useState("https://video.4x4vert.be/video")
    let toto = index

    return (
        <div className='cadreCamera'>

            {statusCam === 1 ?
                <div className='gene rounded bg-light shadow-sm' data-bs-toggle="tooltip" data-bs-placement="top" title="Cliquez sur l'oeil pour visionner le live">
                    <div className='cont'>
                        <i className="bi bi-camera-video logo_allow" ></i>
                        <div className='nom_cam_allow' >{nomCam}</div>
                        <i data-bs-toggle="modal" data-bs-target={`#modal-${index}`} className="bi bi-eye oeil"></i>
                        </div>
                        <ToggleSwitch nom={nomCam} setEtat={setEtat} status={statusCam} id={idCam} />
                    
                    <Live idName={nomStatus} etat={etat} index={toto} nomCam={nomCam} />
                </div>
                :
                statusCam === 2 ?

                    <div className='gene rounded bg-light shadow-sm' data-bs-toggle="tooltip" data-bs-placement="top" title="Cette caméra est éteinte, allumez la pour visionner le live">
                        <div className='cont'>
                        <i class="bi bi-camera-video-off logo_off" ></i>
                        <div className='nom_cam_off'>{nomCam}</div>
                        <ToggleSwitch nom={nomCam} status={statusCam} id={idCam} />
                        </div>
                    </div>
                    :
                    <div className='gene rounded bg-light shadow-sm' data-bs-toggle="tooltip" data-bs-placement="top" title="Cette caméra est éteinte, allumez la pour visionner le live">
                        <div className='cont'>
                        <i class="bi bi-exclamation-triangle logo_disco" ></i>
                        <div className='nom_cam_disco'>{nomCam}</div>
                        <ToggleSwitch nom={nomCam} status={statusCam} id={idCam} />
                        </div>
                    </div>
            }
        </div>
    )
}
export default CadreCameras;