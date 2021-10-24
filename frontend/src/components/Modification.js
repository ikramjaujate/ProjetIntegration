import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import ReactDOM from "react-dom";
import '../css/Modification.css'
import { Tooltip } from 'reactstrap';
import Popover from "react-bootstrap/Popover"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    autoClose: 4000,
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
};

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
    const [color, setColor] = useState("")
    const [nameGrade, setNameGrade] = useState("")
    const [valueGrade, setValueGrade] = useState("")
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    /**
     * Change user's first and last name
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */
    const handleSave = (member) => {
        let nameSurname = member.split(/(\s+)/);
        const result = nameSurname.filter(word => word.trim().length > 0);
        let name = result[0]
        let surname = result[1]
        let idMember = 1
        fetch(`http://localhost:3001/api/membres/${idMember}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname })
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success("Vous venez de modifier le nom et prénom de cet utilisateur", optionsToast);
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })

    }

    useEffect((idMember) => {
        idMember = 1
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/api/membres/${idMember}/grade`, informations)
            .then(response => response.json())
            .then(response => {
                setNameGrade(response[0]["name_grade"])
                setColor(response[0]["color"])
                setValueGrade(response["id_grade"])
                //console.log(color, nameGrade, valueGrade)
                setHasValue(true)

            });

    }, []);

    const updatePhoto = () => {
        let idMember = 1
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
                    setProfilePhoto(res[0]["pictures"])
                }
                setHasValue(true)
            })
        setProfilePhoto(photos[0])

        console.log(allPhotos)
        console.log(profilePhoto)
    }

    /**
     * Get user's first and last name
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */

    useEffect((idMember) => {
        idMember = 1
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/api/membres/${idMember}`, informations)
            .then(response => response.json())
            .then(response => {
                let nom = response[0]["first_name"].replaceAll("\\s+", "")
                let surnom = response[0]["last_name"].replaceAll("\\s+", "")
                let text = nom.replace(/\s+/g, '') + ' ' + surnom.replace(/\s+/g, '');
                text.replace(/\s+/g, '');
                setName(nom)
                setSurname(surnom)
                setCall(text)
                setHasValue(true)
            });
    }, []);

    /**
     * Get user's pictures
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */

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
                    setProfilePhoto(res[0]["pictures"])
                }
                setHasValue(true)
            })
        setProfilePhoto(photos[0])

        console.log(allPhotos)
        console.log(profilePhoto)
    }, []);

    /**
     * Gets the number of photos owned by this member
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */

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

    const countPhoto = () => {
        let idMember = 1
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
    }

    const eliminate = (valeurPhoto) => {
        let idMember = 1
        let photo = allPhotos[valeurPhoto]
        fetch(`http://localhost:3001/api/membres/${idMember}/eliminate/photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photo })
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success("Vous venez d'effacer la photo", optionsToast);
                updatePhoto()
                countPhoto()

            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })
    }

    switch (hasValue) {
        case null:
            return (
                <Preloader load={load} />
            )


        case true:
            const popover = (
                <Popover id="popover-basic">
                    <Popover.Body id="popover-test">
                        <i class="bi bi-x-circle pr-2 mb-3" onClick={() => eliminate(0)}></i>
                        <img class="resize" src={allPhotos[0]} alt='' />
                        <i class="bi bi-x-circle" onClick={() => eliminate(1)}></i>
                        <img class="resize" src={allPhotos[1]} alt='' />
                        <img class="resize" src={allPhotos[2]} alt='' />

                    </Popover.Body>
                </Popover>
            );



            return (
                <>
                    <ToastContainer style={{ fontSize: "0.6rem" }} />

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        User 1
                    </button>
                    <div class="modal fade" id="staticBackdrop" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content" style={{ backgroundColor: color }}>
                                <div class="modal-header" style={{ backgroundColor: color }}>
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
                                    <div class="container">
                                        <div class="row justify-content-md-center">
                                            <div class="col-lg-9">
                                                <p> Cet utilisateur est  {nameGrade}</p>
                                            </div>
                                            <div class="col">
                                                <div class="tool">

                                                    <i id="tooltip" className="bi bi-app" style={{ color: 'black', 'background' : color, fontSize: "100%", "textAlign": "right" }}></i>
                                                    <Tooltip placement="left" style={{ 'fontSize': "15px" }} isOpen={tooltipOpen} target="tooltip" toggle={toggle}>
                                                        {nameGrade}
                                                    </Tooltip>

                                                </div>
                                            </div>
                                        </div>
                                    </div>








                                </div>

                                <div class="col-12">
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

        case false:
            return (
                <Preloader load={load} />
            )

        default:
            break
    }
}

export default Modification;