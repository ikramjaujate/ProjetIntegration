

import { useEffect, useState } from "react";




function Camera() {
    let url = "http://192.168.1.43:6060"
    const [etat, setEtat] = useState(url +"/video")

    function Allumer() {
        console.log("up")
        fetch(url +"/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat(url +"/video")
        })
    }

    function Capture() {
        //event.preventDefault()
        console.log("capture")
        fetch(url +"/photo")

    }

    function Eteindre() {
        console.log("éteindre")
        fetch(url +"/shutdown", {
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