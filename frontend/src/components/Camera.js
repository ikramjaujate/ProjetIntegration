

import { useEffect, useState } from "react";




function Camera() {
    //const [etat, setEtat] = useState("http://0.0.0.0:6060/video")

    useEffect(() => {
        document.getElementById("changement").innerHTML = `<img id ="test" alt="video surveillance" src=ikram2.jpg width="640" height="480" />`
    }, [])
    function Allumer() {
        console.log("up")
        fetch("http://0.0.0.0:6060/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            
            document.getElementById("changement").innerHTML = `<img id ="test" alt="video surveillance" src="http://0.0.0.0:6060/video" width="640" height="480" />`

            console.log("success")
        })

        //window.location = "/camera"

    }
    function Capture() {
        //event.preventDefault()
        console.log("capture")
        fetch("http://0.0.0.0:6060/photo")

    }
    function Eteindre() {
        console.log("éteindre")
        fetch("http://0.0.0.0:6060/shutdown", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            document.getElementById("changement").innerHTML = `<img alt="video surveillance" src=ikram1.jpg width="640" height="480" />`
            console.log("success")
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

                            {/*<img alt="video surveillance" src={"ikram2.jpg"} width="640" height="480" />*/}
                            {/*<img id ="test"alt="video surveillance" src="http://0.0.0.0:6060/video" width="640" height="480" />*/}
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