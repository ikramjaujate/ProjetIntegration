import { useEffect, useState } from "react";

function Photos({nomPhoto}) {
    const [pictures, setPictures] = useState(null);


      

    return (
        <>
            <div className={"col"} id={nomPhoto}><img className={"images"} src={nomPhoto} ></img></div>
               
        </>

    )
}

export default Photos;
