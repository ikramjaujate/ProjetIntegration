

import { useEffect, useState } from "react";




function Camera() {
    const [etat, setEtat] = useState("http://172.20.10.3:6060/video")
    const [statusCam, setStatusCam] = useState(false) ;
    const [cameras, setCameras] = useState(null) ;

    useEffect(()=> {
        fetch("/api/cameras", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json())
        .then(data => {
            setCameras(data); 
        })
	}, []);

    function Allumer() {
        console.log("up")
        fetch("http://172.20.10.3:6060/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat("http://172.20.10.3:6060/video")
        })
    }

    function Capture() {
        //event.preventDefault()
        console.log("capture")
        fetch("http://172.20.10.3:6060/photo")

    }

    function Eteindre() {
        console.log("éteindre")
        fetch("http://172.20.10.3:6060/shutdown", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat('camera-disconnected.png')
        })
    }

    function changeStatusCam(identifiant){
        let statut = document.getElementById(identifiant).checked
        if (statut) {
            Allumer() ;
        }
        else {
            Eteindre() ;
        }
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

                    {cameras&&cameras.map(camera =>
                        <div class="form-check form-switch">
                            {camera.name_status==='ON'? <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} defaultChecked onClick={() => changeStatusCam(camera.id_camera)}/> : 
                                camera.name_status==='OFF' ? <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} onClick={() => changeStatusCam(camera.id_camera)}/> : 
                                <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} disabled/>}
                            <label class="form-check-label" for={camera.id_camera}>{camera.name_camera}</label>
                        </div>
                    )}

                </div >
            </div>
        </>


    );

}

export default Camera;