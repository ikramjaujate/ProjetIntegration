
import { useEffect, useState } from 'react';
import './css/Cam.css';
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
    <div id='gridPosition'> 
      <select id='selectCam'>
        {etatCam&&etatCam.map(camera =>
        <option id='option'value={camera.numero}>Caméra n°{camera.numero}</option>
        )}
      </select>
      <div id='cercle'></div>
      <div id='live'>
      <img src= "http://172.20.10.4:6060/video" width='100%'height="100%" title="Foscam FI8905W"/>
      </div>
     
      <div id='photo'>
      <button  type="submit" name="takePhoto" onClick={()=> takePhoto()}>&#128247;</button> 
      </div>
      <div id='video'>
      <button  type="submit" name="takePhoto" onClick={()=> takePhoto()}>&#127909;</button> 
      </div>

      
    </div>
   
       
    

  )
}

export default Camera; 
