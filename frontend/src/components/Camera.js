
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import '../css/Camera.css';
function Camera() {
    const [etat, setEtat] = useState("http://0.0.0.0:6060/video")
    const [statusCam, setStatusCam] = useState(false);
    const [cameras, setCameras] = useState(null);
    const [screenshoot, setScreenshoot] = useState(null);


    const optionsToast = {
        autoClose: 80000000000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
    };

    useEffect(() => {


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
        fetch("http://0.0.0.0:6060/up", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat("http://0.0.0.0:6060/video")
        })
    }

    function Capture() {
        //event.preventDefault()
        console.log("capture")
        fetch("http://0.0.0.0:6060/photo", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        })
            .then(res => res.json)
            .then(data => {
                fetch("/api/pictureScreenshoot", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .then(data => {
                        setScreenshoot(data.picture)
                        const Msg2 = () => (
                            <div >
                                <img class="layout-screenshot" data-bs-toggle="modal" data-bs-target="#openscreenshotmodal" src={`image-client/${data.picture}`} alt="video surveillance" width="100" height="auto" />
                            </div>
                        )
                        toast.info(<Msg2 />, optionsToast);

                    })
            })

    }

    function Eteindre() {
        console.log("éteindre")
        fetch("http://0.0.0.0:6060/shutdown", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        }).then(res => res.json).then(data => {
            setEtat('camera-disconnected.png')
        })
    }

    function changeStatusCam(identifiant) {
        let statut = document.getElementById(identifiant).checked
        if (statut) {
            Allumer();
        }
        else {
            Eteindre();
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
                            <img id="test" alt="video surveillance" src={etat} width="640" height="480" />
                        </div>
                    </section>

                    <button class="btn btn-primary m-5" type="button" onClick={Capture}>prend photo</button>
                    <button class="btn btn-primary m-5" onClick={Allumer} type="button" name="start" value="Eteindre">up</button>
                    <button class="btn btn-primary m-5" onClick={Eteindre} type="button" name="stop" value="Eteindre">Éteindre</button>

                    {cameras && cameras.map(camera =>
                        <div class="form-check form-switch">
                            {camera.name_status === 'ON' ? <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} defaultChecked onClick={() => changeStatusCam(camera.id_camera)} /> :
                                camera.name_status === 'OFF' ? <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} onClick={() => changeStatusCam(camera.id_camera)} /> :
                                    <input class="form-check-input" type="checkbox" role="switch" id={camera.id_camera} disabled />}
                            <label class="form-check-label" for={camera.id_camera}>{camera.name_camera}</label>
                        </div>
                    )}

                </div >
            </div>
            <ToastContainer style={{ fontSize: "0.6rem" }} />
            <div id="openscreenshotmodal" className="modal fade" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-body">
                            <img class="modal-screenshot" src={`image-client/${screenshoot}`} alt="video surveillance" width="100%" height="100%" />
                        </div>

                    </div>
                </div>
            </div>
        </>


    );

}

export default Camera;