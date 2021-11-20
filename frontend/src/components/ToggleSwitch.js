import React from "react";
import "../css/ToggleSwitch.css";
import { useEffect, useState } from "react";
  
const ToggleSwitch = ({ nom,status,id , setEtat }) => {
  //const [etat, setEtat] = useState("http://0.0.0.0:6060/video")
  function Allumer() {
    console.log("up")
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
  console.log("éteindre")
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
    <div className='col-2 col-md-2 col-sm-2 offset-4 offset-md-5 offset-sm-4 offset-lg-7 switchcam'>
      {/*<div className="toggle-switch">
        {status===1?
            <input type="checkbox" className="checkbox" id={id} defaultChecked onClick={() => changeStatusCam(id)}  /> : status===2? <input type="checkbox" className="checkbox" id={id} onClick={() => changeStatusCam(id)} />:<input type="checkbox" className="checkbox" id={nom} disabled style={{'backgroundColor':'grey'}} />
        }
        <label className="label" htmlFor={nom}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>*/}

                        <div class="form-check form-switch">
                            {status === 1 ? <input class="form-check-input" type="checkbox" role="switch" id={id} defaultChecked onClick={() => changeStatusCam(id)} /> :
                                status === 2 ? <input class="form-check-input" type="checkbox" role="switch" id={id} onClick={() => changeStatusCam(id)} /> :
                                    <input class="form-check-input" type="checkbox" role="switch" id={id} disabled />}
                        </div>
                    
    </div>



  );
};
  
export default ToggleSwitch;