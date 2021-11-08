import { useEffect, useState } from 'react';
import CadreCameras from './components/OngletCamera.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/cam2.css'

function Cam2 (){
    const[etatCam, setEtatCam] = useState(null)

    useEffect(()=>{
        //Get qui va chercher toutes les caméras et leur état 
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
        
        <div>
        <div>Zone de trie à venir </div>
        <div class="container"> 
        {etatCam&&etatCam.map(camera=> 
          <CadreCameras nomCam={camera.name_camera} statusCam={camera.id_status} idCam={camera.id_camera} nomStatus={camera.name_status}/>
          
        )}    
        </div>
        
        
       

  </div>


    )
}
export default Cam2;