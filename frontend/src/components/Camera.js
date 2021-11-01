

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


function Camera() {
    const [etat, setEtat] = useState("http://172.20.10.3:6060/video")
    const [statusCam, setStatusCam] = useState(false) ;
    const [cameras, setCameras] = useState(null) ;
    const optionsToast = {
        autoClose: 8000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };

    const Msg = ({ closeToast, toastProps }) => (
        <div>
          Lorem ipsum dolor {toastProps.position}
          <button>Retry</button>
          <button onClick={closeToast}>Close</button>
        </div>
    )

    useEffect(()=> {
        // toast.success("../../backend/Reconaissance/images/ikram1.jpg", optionsToast);
        //toast.success("<a href='test'>link text</a>", optionsToast);
        toast(<Msg />) ;
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
        fetch("http://172.20.10.3:6060/photo", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        })
        .then(res => res.json)
        .then(data => {
            toast.success("../../backend/Reconaissance/images/ikram1.jpg", optionsToast);
        })
        
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
            <ToastContainer style={{fontSize:"0.6rem"}}/>      

        </>


    );

}

export default Camera;