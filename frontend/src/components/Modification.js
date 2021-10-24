import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from "react";
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import ReactDOM from "react-dom";
import '../css/Modification.css'
import Popover from "react-bootstrap/Popover"
import { ToastContainer, toast } from 'react-toastify';
import Preloader from "./Pre";
import EdiText from "react-editext";
import styled from "styled-components";



export const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0px;
  border-radius: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
`;
const optionsToast = {
    autoClose: 8000,
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true, 
    theme:"colored"
};
function Test() {
    console.log('test ok')
}
function Modification() {
    const [load, upadateLoad] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            upadateLoad(false);
        }, 1200);
    }, []);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    var photos = []
    const [call, setCall] = useState("");
    const [allPhotos, setAllPhotos] = useState([])
    const [profilePhoto, setProfilePhoto] = useState("")
    const [hasValue, setHasValue] = useState(null)
    const [count, setCount] = useState(null)


    const handleSave = (e) => {
        let nameSurname = e.split(/(\s+)/);
        const result = nameSurname.filter(word => word.trim().length > 0);
        let name = result[0]
        let surname = result[1]
        let idMember = 1
        fetch(`http://localhost:3001/api/membres/${idMember}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, surname})
        }).then((response) => {
            if (response.message === "ok") {
                toast.success("parfait", optionsToast);
            }
            else {
                toast.error("error");
            }
                
        })

    }
    useEffect((idMember) => {
        idMember = 1
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/api/membres/${idMember}`, informations)
            .then(response => response.json())
            .then(response => {
                let nom = response[0]["first_name"].replaceAll("\\s+","")
                let surnom = response[0]["last_name"].replaceAll("\\s+","")
                let text = nom.replace(/\s+/g, '') + ' '+ surnom.replace(/\s+/g, '');
                text.replace(/\s+/g, '');
                setName(nom)
                setSurname(surnom)
                setCall(text)
                console.log(text)
                setHasValue(true)
            });
    }, []);

    useEffect((idMember) => {
        idMember = 1
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/api/membres/${idMember}/photos`, informations)
            .then(response => response.json())
            .then(res => {
                let images = []
                for (let i in res) {
                    photos.push(res[i]["pictures"])
                    setAllPhotos(photos)
                    setProfilePhoto(res[1]["pictures"])

                }
                

                setHasValue(true)
            })
        setProfilePhoto(photos[0])
        
        console.log(allPhotos)
        console.log(profilePhoto)
    }, []);

    useEffect((idMember) => {
        idMember = 1
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/api/membres/${idMember}/photos/count`, informations)
            .then(response => response.json())
            .then(response => {
                setCount(response[0]["count"])
                setHasValue(true)
            });
    }, []);

    switch (hasValue) {
        case null:
            return (
                <Preloader load={load} />
            )
            break;

        case true:
            const popover = (
                <Popover id="popover-basic">
                    <Popover.Body id="popover-test"> 
                    <img class="resize" src={allPhotos[0]} alt='' />
                    <img class="resize" src={allPhotos[1]} alt='' />
                    <img class="resize" src={allPhotos[2]} alt='' />
                    
                    </Popover.Body>
                </Popover>
            );
           
                
            
            return (
                <>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        User 1
                    </button>
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div class="hovereffect">

                                        <ImgContainer>
                                            <img src={profilePhoto} alt='' />
                                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                <span className="badge nineplus" >{count}</span>
                                            </OverlayTrigger>

                                        </ImgContainer>
                                    </div>


                                </div>

                                <div class="col-xs-2">
                                    <EdiText
                                        value={call}
                                        type="text"
                                        onSave={handleSave}
                                        editing={editing}

                                        buttonsAlign='before'
                                    />


                                </div>

                            </div>
                        </div>
                    </div >
                </>

            );
            break;
        case false:
            return (
                <Preloader load={load} />
            )
            break;
        default:
            break
    }
}

export default Modification;