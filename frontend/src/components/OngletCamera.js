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
        <div>
            {statusCam === 1 ?
                <div className='container'>
                <div className={"p-1 bg-light row align-items-start shadow-sm col-11 col-sm-9 col-md-3 col-lg-8 offset-sm-2 offset-md-1 offset-1 offset-lg-3 cadreBouton"}>
                    <div type="button" data-bs-toggle="modal" data-bs-target={`#modal-${index}`} className="row">
                        <div className="col-1 col-md-1 col-sm-2">
                            <i class="bi bi-camera-video"></i>
                            <div className="col-3 col-sm-2 col-md-1 offset">{nomCam}</div>
                        
                        </div>
                        

                    </div>
                    <ToggleSwitch nom={nomCam} setEtat={setEtat} status={statusCam} id={idCam} />
                    <Live idName={nomStatus} etat={etat} index={toto} nomCam={nomCam} />


                </div> 
                </div>:

                statusCam === 2 ?
                    <div data-bs-toggle="tooltip" data-bs-placement="top" title="Cette caméra est éteinte, allumez la pour visionner le live" className={"p-1 bg-light shadow-sm row col-11 col-sm-9 col-md-7 col-lg-8 offset-sm-2 offset-md-3 offset-1 offset-lg-3 cadreBouton"}>
                        <div type="button" data-bs-toggle="modal" data-bs-target={`#modal-${index}`}>
                            <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-camera-video-off"></i></div>
                            <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>

                        </div>
                        <ToggleSwitch nom={nomCam} status={statusCam} id={idCam} />
                    </div>

                    :

                    <div data-bs-toggle="tooltip" data-bs-placement="top" title="Il semblerait que cette caméra soit désactivée" className={"p-1 bg-light shadow-sm row col-11 col-sm-9 col-md-7 col-lg-8 offset-sm-2 offset-md-3 offset-1 offset-lg-3 cadreBouton"}>
                        <div type="button" data-bs-toggle="modal" data-bs-target={`#modal-${index}`}>
                            <div className="col-1 col-md-1 col-sm-2"><i class="bi bi-exclamation-triangle"></i></div>
                            <div className="col-3 col-sm-2 col-md-2 offset">{nomCam}</div>

                        </div>
                        <ToggleSwitch nom={nomCam} status={statusCam} id={idCam} />
                    </div>

            }
        </div>
    )
}
export default CadreCameras;