
import { useEffect, useState } from 'react';
import './css/Cam.css';
// import Navbar from './components/Navbar.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import photo from'./Image/photo.png'; 
// import camera from './Image/camera.png';
import CadreCameras from './components/OngletCamera.js';

function Acceuil(){
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
  // function stopDefAction(evt) {
  //   evt.preventDefault();
  // }
  // function takePhoto(){
  //   console.log('Smile!')

  // }
  return(
    <div>
      
      <div class="container"> 
        {etatCam&&etatCam.map(camera=> 
          // <CadreCameras nomCam={camera.name_camera} statusCam={camera.status_camera} />
          <div>{camera.status_camera}</div>
        )}    
        
         
      </div>
    </div>
          
       
   
  
  )
}

export default Acceuil; 
