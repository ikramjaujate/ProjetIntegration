import React from "react";
import "../css/ToggleSwitch.css";
  
const ToggleSwitch = ({ nom,status,id  }) => {
    
  return (
    <div className='col-2 col-md-2 col-sm-2 offset-4 offset-md-5 offset-sm-5 offset-lg-7 switchcam'>
      <div className="toggle-switch">
        {status===1?
            <input type="checkbox" className="checkbox" id={id} defaultChecked  /> : status===2? <input type="checkbox" className="checkbox" id={id} />:<input type="checkbox" className="checkbox" id={nom} disabled style={{'backgroundColor':'grey'}} />
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