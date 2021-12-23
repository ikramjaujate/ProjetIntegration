import React from "react";
import "../css/ToggleSwitch.css";
import { useEffect, useState } from "react";

const ToggleSwitch = ({ nom, status, id, setEtat }) => {
    //const [etat, setEtat] = useState("http://0.0.0.0:6060/video")
    function Allumer() {
       
        fetch("http://0.0.0.0:6060/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat("http://0.0.0.0:6060/video")
        })
    }
    function Eteindre() {
        
        fetch("http://0.0.0.0:6060/shutdown", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat('camera-disconnected.png')
        })
    }
    function changeStatusCam(identifiant) {
        let statut = document.getElementById(identifiant).checked
        if (statut) {
            Allumer();
            
        }
        else {
            Eteindre();
            
        }
    }

    return (
        <div className='perm switchcam' >
            <div className="form-check form-switch" >
                {status === 1 ? <input className="form-check-input on "  type="checkbox" role="switch" id={id} defaultChecked onClick={() => Eteindre(id)} /> :
                    status === 2 ? <input className="form-check-input off" type="checkbox" role="switch" id={id} onClick={() => Allumer(id)} /> :
                        <input className="form-check-input disco"  type="checkbox" role="switch" id={id} disabled />}
            </div>

        </div>



    );
};

export default ToggleSwitch;