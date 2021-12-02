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
import { trim } from 'jquery';



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

    const tri = () => {
        //console.log(pictures.reverse());
        //console.log(pictures);
        let a = [...pictures];
              
        a.reverse()
        
        setPictures(a)
        let triIcon = a[0] > a[a.length-1]?'bi bi-sort-numeric-up-alt' : 'bi bi-sort-numeric-down-alt'
        document.getElementById("boutonTri").className = triIcon

    }  
    

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
        
        <div className='titre text-center offset-1 '>Page de gestion des photos</div>
        
        <div class="container row justify-content-center"> 
        <div  className={"row col col-lg-12 col-md-12 justify-content-center ml-1 "}>
          <div className={"row justify-content-md-center border border-secondary rounded titre border-3"}>
            <div className={"col col-lg-3"}></div>
            <div className={"col col-lg-4"}><p>Nom</p><button onClick={() => tri()}><i id="boutonTri" class="bi bi-sort-numeric-up-alt"></i></button></div>
            <div className={"col col-lg-4"}><p>Date</p></div>
          </div>
        {pictures&&pictures.map(phot=> 
          
            <Photos nomPhoto={phot} />
          
        )} 
        </div>
        
        </div>
  
  </div>


    )
}
export default Biblio;