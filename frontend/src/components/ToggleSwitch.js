import React from "react";
import "../css/ToggleSwitch.css";
  
const ToggleSwitch = ({ nom,status  }) => {

    function changement(){
        console.log("coucou")
    }
  
    
  return (
    <div className="row  " className='switchcam'>

      <div className="toggle-switch">
        {status==='ON'?
            <input type="checkbox" className="checkbox" id={nom} defaultChecked  /> : status==='OFF'? <input type="checkbox" className="checkbox" id={nom} />:<input type="checkbox" className="checkbox" id={nom} disabled='true' style={{'backgroundColor':'grey'}}/>
        }
       
        <label className="label" htmlFor={nom}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;