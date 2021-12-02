import { useEffect, useState } from "react";

function Photos({nomPhoto}) {
    const [pictures, setPictures] = useState(null);


      

    return (
        <>
        <div className="container row justify-content-center col-xl-12 ">
            <div className="row bg-light shadow rounded m-1 col-12 col-md-8 col-lg-8 justify-content-center   ">
            <div   className="row col-xl-4 justify-content-center mx-auto d-block hovereffect"><img class = "img-responsive" href={nomPhoto} src={nomPhoto}></img>
                <div class="overlay mx-auto d-block" >
                    <i class="bi bi-eye info align-middle text-center"></i>
                </div>
            </div>
            <div className="photo row col-xl-3 justify-content-sm-center justify-content-center">{nomPhoto}
            
            </div>
            <div className="row col-xl-3 justify-content-sm-center justify-content-center">{nomPhoto.substr(6,10)}
            
            </div>
            <div className="row col-xl-3 justify-content-sm-center justify-content-center">
            <button className={"col col-2 col-xl-5 align-self-center btn btn-outline-secondary"} type="button" onClick ={console.log("supprimer")} ><i class="bi bi-trash"></i></button>
            <button className={"col col-2 col-xl-5 align-self-center btn btn-outline-secondary ms-2"} type="button" onClick ={console.log("télécharger")} ><i class="bi bi-arrow-down-circle"></i></button>
            </div>
            
            </div>
        </div>
               
        </>

    )
}

export default Photos;
