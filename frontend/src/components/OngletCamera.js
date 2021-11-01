 import '../css/OngletCamera.css';
 import ToggleSwitch from "../components/ToggleSwitch.js";
//  import Pastille from "../components/Pastille.js";
function CadreCameras ({idCam,nomCam, statusCam}){
    
    return (   
        <div class="row" className='cadreBouton' >
            <div class="col"> Zone: {nomCam}</div>
            <ToggleSwitch nom={nomCam} status={statusCam}/>
            {/* <Pastille nom={nomCam} status={statusCam} />   */}
        </div>
    )
 }
 export default CadreCameras; 