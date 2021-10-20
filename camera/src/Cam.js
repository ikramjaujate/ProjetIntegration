
import { useEffect, useState } from 'react';
import './css/Cam.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import photo from'./Image/photo.png'; 
// import camera from './Image/camera.png';

const Camera =()=>{
  const[etatCam, setEtatCam] = useState(null)

  useEffect(()=>{
    //Get qui va chercher toutes les caméras et leur état 
    var etatCamera = {method : 'GET',
          headers:{'Content-type':'application/json'}
          }
          fetch('http://localhost:3001/api/etatCam', etatCamera)
          .then(response =>{
            // console.log(response.)
              return response.json()
          })
          .then(json =>{
            
              setEtatCam(json)
          })

  })
  function stopDefAction(evt) {
    evt.preventDefault();
  }
  function takePhoto(){
    console.log('Smile!')

  }
  return(
    
    <div className='container'>
      {/* Choix de la caméra */}
      <div class="row align-items-center custom-line"> 
        <div class="col-12 col-md-9 col-lg-8 offset-sm-3">
          <h3 id='text'>Visionnez vos caméras en live</h3>
          
        </div>
        <div class="col offset-sm-3" >
          <select id="select">
            {etatCam&&etatCam.map(camera=>
            <option className='option'>Caméra numéro : {camera.status}</option>
            )}
          </select>
        </div>
      </div>

      {/* Cadre du live */}
      <div class="row justify-content-center"> 
        <fieldset class="col offset-sm-3" id="cadre_live">

          <legend >Maison</legend>
          <img alt='visu_live'src= "http://192.168.0.200:6060/video" width="200" height="300" title="Foscam FI8905W" />
        </fieldset>
      </div>
      {/* Boutons */}
      <div class="row justify-content-center">
        {/* Bouton Appareil Photo */}
        <div class="col-5 col-md-4 col-lg-4 offset-0 offset-md-3 ">
          <button type="button" class="form-control" id="cadre_bouton_photo" >
            {/* <img className='logo'src={photo} alt='capturer'id='photo'></img> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#CCFFEE" class="bi bi-camera" viewBox="0 0 16 16">
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
          </button>
        </div>
        {/* Bouton Caméra */}
        <div class="col-5 col-md-4 col-lg-4 offset-0 offset-md1">
          <button type="button" class="form-control" id="cadre_bouton_video">
           
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#CCFFEE" class="bi bi-camera-video" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
          
       
   
       
    

  )
}

export default Camera; 
