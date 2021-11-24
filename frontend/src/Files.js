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
        
        <div className="files row justify-content-center">
        
        <link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
        <link rel="stylesheet" href="https://unpkg.com/primereact/resources/themes/lara-light-indigo/theme.css" />
        <link rel="stylesheet" href="https://unpkg.com/primereact/resources/primereact.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/primeflex@2.0.0/primeflex.min.css" />

        
        <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/react-transition-group@4.4.2/dist/react-transition-group.js"></script>

       
        <script src="https://unpkg.com/primereact/core/core.min.js"></script>
        <script src="https://unpkg.com/primereact/image/image.min.js"></script>
        
        <div className='titre text-center offset-1'>Page de gestion des fichiers</div>
        
        <div class="container row justify-content-center"> 
        <div  className={"row col-12 justify-content-center ml-1"}>
            <div className={"col-4 justify-content-center"}><p>Nom</p></div>
            <div className={"col-4"}><p>Date</p></div>
        {pictures&&pictures.map(phot=> 
          
            <Photos nomPhoto={phot} />
          
        )} 
        </div>
        
        </div>
  
  </div>


    )
}
export default Biblio;