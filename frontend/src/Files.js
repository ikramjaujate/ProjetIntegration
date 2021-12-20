import { useEffect, useState } from 'react';
import Photos from './components/Photos.js'
import './css/Gallerie.css'
import React from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
                  return response.json()
              })
              .then(json =>{               
                setPictures(json)
              })  
        
         
      }, [])

    const tri = () => {
      //permet de trier les photos en fonction de leurs date 
        let a = [...pictures];
              
        a.reverse()
        
        setPictures(a)
        let triIcon = a[0] > a[a.length-1]?'bi bi-sort-numeric-up-alt' : 'bi bi-sort-numeric-down-alt'
        document.getElementById("boutonTri").className = triIcon

    }  
    

    return (
        
        <div className="files row justify-content-center voirPhoto">
          <div className='gallerie text-center offset-1 '>Page de gestion des photos</div><br/><br/>
          <div class="container row justify-content-center"> 
            <div  className={"row col col-lg-12 col-md-12 justify-content-center ml-1 "}>
              <div className={"row justify-content-sm-center justify-content-md-center  gallerie border-3"}>
                <div className={"col col-lg-12 row justify-content-center"}>
                <div className="col-xl-3" >
                    
                  </div>
                  <div className="col-4 col-xl-2 titreCollone" >
                    <p>Nom</p>
                  </div>
                  
                  <div className="col-7 col-xl-1 titreCollone" >
                    <p >Date</p>
                  </div>
                  <div className="col-12 col-xl-1 justify-content-center " >
                    <button class=" btn btn-outline-secondary boutonTri" onClick={() => tri()}>
                      <i id="boutonTri" class="bi bi-sort-numeric-up-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
                {pictures&&pictures.map((phot, index)=> 
                    <Photos nomPhoto={phot} counta={index} />
                )} 
            </div>
          </div>
        </div>
    )
}
export default Biblio;