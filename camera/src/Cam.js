
import { useEffect, useState } from 'react';
import './Cam.css';
const Camera =()=>{
  const[etatCam, setEtatCam] = useState(null)

  useEffect(()=>{
    //Get qui va chercher toutes les caméras et leur état 
    var etatCamera = {method : 'GET',
          headers:{'Content-type':'application/json'}
          }
          fetch('http://localhost:3001/api/etatCam', etatCamera)
          .then(response =>{
              console.log('coucou')
              return response.json()
          })
          .then(json =>{
              setEtatCam(json)
          })

  })
  
  return(
    <div> 
      <select id='cam'>
        {etatCam&&etatCam.map(camera =>
        <option value=''>{camera}</option>
        )}
      </select>
      
    </div>

  )
}

export default Camera; 
