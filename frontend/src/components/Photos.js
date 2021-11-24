import { useEffect, useState } from "react";
import { Image } from 'primereact/image';
function Photos({nomPhoto}) {
    const [pictures, setPictures] = useState(null);


      

    return (
        <>
            <div className={"row bg-light shadow rounded m-1 col-8"} width="50"><Image id={nomPhoto} className={"images, col-sm"} src={nomPhoto} preview width="200" />
            <p className={"col-3"}>{nomPhoto}</p>
            <p className={"col-3"}>{nomPhoto.substr(6,10)}</p>
            <p className={"col-1 align-self-center"} onClick ={console.log("supprimer")}><i class="bi bi-trash"></i></p>
            <p className={"col-1 align-self-center"} onClick ={console.log("télécharger")}><i class="bi bi-arrow-down-circle"></i></p>
            
            </div>
               
        </>

    )
}

export default Photos;
