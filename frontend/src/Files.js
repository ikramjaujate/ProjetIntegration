import { useEffect, useState } from 'react';
import Photos from './components/Photos.js'
import './css/Gallerie.css'
import React from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';



function Biblio (){
    const [pictures, setPictures] = useState(null);

    useEffect(()=>{
      
        //Get qui va chercher toutes les photos 
        var allFiles = {method : 'GET',
              headers:{'Content-type':'application/json'}
              }
        
              fetch('/api/photos', allFiles)
              .then(response =>{
                console.log(response)
                  return response.json()
              })
              .then(json =>{               
                setPictures(json)
              })  
        
         
      }, [])

      

    return (
        
        <div className="files">
        
        
        <div className='titre text-center offset-1'>Page de gestion des fichiers</div>
        
        <div class="container"> 
        <div  className={"row"}>
        {pictures&&pictures.map(phot=> 
          
            <Photos nomPhoto={phot} />
          
        )} 
        </div>
        
        </div>
  
  </div>


    )
}
export default Biblio;