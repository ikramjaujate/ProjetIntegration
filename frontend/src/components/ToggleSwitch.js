import React from "react";
import "../css/ToggleSwitch.css";
  
const ToggleSwitch = ({ nom,status,id  }) => {


    
  return (
    <div class='row ' className='switchcam'>
      <div className="toggle-switch">
        {status===1?
            <input type="checkbox" className="checkbox" id={id} defaultChecked  /> : status===2? <input type="checkbox" className="checkbox" id={id} />:<input type="checkbox" className="checkbox" id={nom} disabled />
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