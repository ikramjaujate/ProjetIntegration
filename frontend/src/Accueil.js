import { useEffect, useState } from 'react';
import CadreCameras from './components/OngletCamera.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Accueil.css'
import React from 'react';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Popover, Toast, Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Cam2 (){
    const[etatCam, setEtatCam] = useState(null)

    useEffect(()=>{
      
        //Get qui va chercher toutes les caméras et leur état 
        var etatCamera = {method : 'GET',
              headers:{'Content-type':'application/json'}
              }
        
              fetch('/api/camera', etatCamera)
              .then(response =>{
                console.log(response)
                  return response.json()
              })
              .then(json =>{               
                  setEtatCam(json)
              })   
      }, [])

      

    return (
        
        <div className="cam2">
        
        
        <div className='titre offset-lg-5 offset-md-4 offset-sm-4 offset-2'>Page de gestion des caméras</div>
        
        <div class="container"> 
         <div className='row'>
        {etatCam&&etatCam.map(camera=> 
          <div>
            <CadreCameras nomCam={camera.name_camera} statusCam={camera.id_status} idCam={camera.id_camera} nomStatus={camera.name_status}/>
          </div>
        )} 
        
        </div>  
        </div>
  
  </div>


    )
}
export default Cam2;