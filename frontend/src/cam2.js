import { useEffect, useState } from 'react';
import CadreCameras from './components/OngletCamera.js'
import 'bootstrap/dist/css/bootstrap.min.css';
function Cam2 (){
    const[etatCam, setEtatCam] = useState(null)

    useEffect(()=>{
        //Get qui va chercher toutes les caméras et leur état 
        console.log("coucou")
        var etatCamera = {method : 'GET',
              headers:{'Content-type':'application/json'}
              }
              fetch('http://localhost:3001/api/camera', etatCamera)
              .then(response =>{
                  return response.json()
              })
              .then(json =>{               
                  setEtatCam(json)
              })   
      }, [])

    return (
        <div class="container"> 
        {etatCam&&etatCam.map(camera=> 
          <CadreCameras nomCam={camera.name_camera} statusCam={camera.status_camera}/>
          
        )}    
        </div>
    )
}
export default Cam2;