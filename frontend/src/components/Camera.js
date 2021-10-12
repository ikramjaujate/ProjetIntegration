

import { useEffect, useState } from "react";

function Capture() {
    //event.preventDefault()
    console.log("toto")
    fetch("http://0.0.0.0:6060/photo")

}
function Camera() {


    return (
        <>
            <div class="row align-items-center">
                <div class="m-auto px-2">
                    <h1>test</h1>
                    <section class="streaming">
                        <h3>Camera</h3>
                        <img alt="video surveillance" src="http://0.0.0.0:6060/video" width="640" height="480" />
                    </section>


                    <button class="btn btn-primary m-5" type="button" onClick={Capture}>prend photo</button>
                </div >
            </div>
        </>


    );

}

export default Camera;