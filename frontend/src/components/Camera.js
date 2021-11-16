

import { useEffect, useState } from "react";




function Camera() {
    const [etat, setEtat] = useState("http://192.168.1.19:6060/video")

    function Allumer() {
        console.log("up")
        fetch("http://192.168.1.19:6060/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat("http://192.168.1.19:6060/video")
        })
    }

    function Capture() {
        //event.preventDefault()
        console.log("capture")
        fetch("http://192.168.1.19:6060/photo")

    }

    function Eteindre() {
        console.log("éteindre")
        fetch("http://192.168.1.19:6060/shutdown", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat('camera-disconnected.png')
        })
    }

    return (
        <>
            <div class="row align-items-center">
                <div class="m-auto px-2">
                    <h1>test</h1>
                    <section class="streaming">
                        <h3>Camera</h3>
                        <div id="changement">
                            <img id ="test"alt="video surveillance" src={etat} width="640" height="480" />
                        </div>
                    </section>

                    <button class="btn btn-primary m-5" type="button" onClick={Capture}>prend photo</button>
                    <button class="btn btn-primary m-5" onClick={Allumer} type="button" name="start" value="Eteindre">up</button>
                    <button class="btn btn-primary m-5" onClick={Eteindre} type="button" name="stop" value="Eteindre">Éteindre</button>

                </div >
            </div>
        </>


    );

}

export default Camera;