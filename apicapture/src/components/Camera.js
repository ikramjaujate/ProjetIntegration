

import { useEffect, useState } from "react";

function Capture(){
    //event.preventDefault()
    console.log("toto")
    fetch("http://192.168.0.200:6060/photo")
    
}
function Camera() {


    return (
       <>

            <div>
                <h1>test</h1>
                <section class="streaming">
                    <h3>Camera</h3>
                    <img alt="video surveillance" src="http://192.168.0.200:6060/video" width="640" height="480"/>
                </section>


            <button type="button" onClick={Capture}>prend photo</button>
    </div >
    </>
    
    
    );

}

export default Camera;