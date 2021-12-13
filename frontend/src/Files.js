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

<Photos supprimerPhoto={supprimerPhoto} ></Photos>

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
    const supprimerPhoto = (photo) =>{
      console.log("Supprimer photo fct");
      
      const idPhoto = photo;
      console.log(idPhoto)
      let informations = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }, 
      };
      fetch(`/api/photos/${idPhoto}`, informations).then((response)=> {
          if(response.status === 200){
              // var element = document.getElementById(idPhoto);
              // element.parentNode.removeChild(element);
              // window.location.reload(false);
              let a = [...pictures];
              a.reverse()
              setPictures(a)
              console.log(response)            
              console.log("supression réussis")
          }
          else {
              console.log("supression raté")
          }
          })
      /*const pathsToCheck = ['../../public/', '../../public/frame_2021-11-23-20_43_44.jpeg'];
      
      for (let i = 0; i < pathsToCheck.length; i++) {
          stat(pathsToCheck[i], (err, stats) => {
          console.log(stats.isDirectory());
          console.log(stats);
    }); */
      //Asynchronous version
      /*
      //Synchronous version pas ouf 
      fs.unlinkSync('../../public/frame_2021-11-23-20_43_44.jpeg');
      console.log('successfully deleted /tmp/hello');*/
  
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
        
        <div className='gallerie text-center offset-1 '>Page de gestion des photos</div>
        
        <div class="container row justify-content-center"> 
        <div  className={"row col col-lg-12 col-md-12 justify-content-center ml-1 "}>
          <div className={"row justify-content-sm-center justify-content-md-center border border-secondary rounded gallerie border-3"}>
             <div className={"col col-lg-4 row p-1"}>
              <div className="col-6 col-xl-6"><p>Nom</p></div>
              <div className="col-6 col-xl-2"><button onClick={() => tri()}>
                <i id="boutonTri" class="bi bi-sort-numeric-up-alt"></i>
              </button></div>
              <div className="col-6 col-xl-3 "><p >Date</p></div>
              </div>
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