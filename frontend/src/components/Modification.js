import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import '../css/Modification.css'
import Popover from "react-bootstrap/Popover"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [etatModification, setEtatModification] = useState(0)
    const [userNow, setUserNow] = useState("")
    const [allGrade, setAllGrade] = useState(null)

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

        fetch(`/api/membres/${userNow}/update`, {
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
    /**
   * Retrieves the grade from a member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method GET
   * @param {integer} idMember identifier of the member for which we want to retrieve the grade
   */

    const gradeMembre = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/membres/${userNow}/grade`, informations)
            .then(response => response.json())
            .then(response => {
                setNameGrade(response[0]["name_grade"])
                setColor(response[0]["color"])
                setValueGrade(response["id_grade"])
                //console.log(color, nameGrade, valueGrade)
                setHasValue(true)

            });

    }

    /**
     * Recovers information about the different grades, such as their name, their associated color,
     * as well as the number of authorized and refused cameras
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    const gradeAll = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/grades`, informations)
            .then(response => response.json())
            .then(res => {
                setAllGrade(res)
            });
    }

    const updatePhoto = () => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/membres/${userNow}/photos`, informations)
            .then(response => response.json())
            .then(res => {
                let images = []
                for (let i in res) {
                    photos.push(res[i]["pictures"])
                    setAllPhotos(photos)
                    setProfilePhoto(res[0]["pictures"])
                }

                setProfilePhoto(photos[0])
                setHasValue(true)
            })

    }

    /**
     * Get user's first and last name
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */

    const nomMembre = (userNow) => {
        console.log(userNow)
        let informations = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        fetch(`/api/membres/${userNow}`, informations)
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

    }

    /**
     * Gets the number of photos owned by this member
     * 
     * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
     * @param {string} member  Identifier of the member
     */
    var listeGrade = {}

    const modificationUp = () => {
        setEtatModification(1)
        allGrade.map(grade =>
            listeGrade[grade.name_grade] = (grade.color).replace(/\s+/g, '')
        )
        if (nameGrade in listeGrade) {
            delete listeGrade[nameGrade]
        }

    }

    /**
     * Counts the number of photos owned by the member.
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve information
     */

    const countPhoto = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/membres/${userNow}/photos/count`, informations)
            .then(response => response.json())
            .then(response => {
                setCount(response[0]["count"])
                setHasValue(true)
            });
    }
    /**
    * Get user's pictures
    * 
    * @author Ikram Jaujate <i.jaujateouldkhala@students.ephec.be>
    * @param {string} member  Identifier of the member
    */

    const photoMembre = (userNow) => {
        let informations = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/membres/${userNow}/photos`, informations)
            .then(response => response.json())
            .then(res => {
                setAllPhotos(res)
                for (let i in res) {
                    photos.push(res[i]["pictures"])
                    setProfilePhoto(res[0]["pictures"])
                }
                setHasValue(true)
            })
        setProfilePhoto(photos[0])

    }


    /**
    * Eliminate picture of a member
    * 
    * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
    * @method DELETE
    * @param {integer} idMember identifier of the member for which we want to eliminate photo
    */

    const eliminate = (photo) => {
        console.log(photo)
        fetch(`/api/membres/${userNow}/eliminate/photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photo })
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success("Vous venez d'effacer la photo", optionsToast);
                photoMembre(userNow)
                countPhoto(userNow)
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })
    }



    const popover = (
        <Popover id="popover-basic">
            <Popover.Body id="popover-test">
                <div class="row">
                    {allPhotos.map(photo =>
                        <div class=" test col">
                            <i class="bi bi-x-circle-fill pr-2 mb-3" onClick={() => eliminate(photo.pictures)}></i>
                            <img class="img-thumbnail h-50" src={photo.pictures} alt='' />
                        </div>)}
                </div>
            </Popover.Body>
        </Popover>
    );

    const changeUser = async (id) => {
        setUserNow(id);
        nomMembre(id);
        gradeMembre(id);
        photoMembre(id);
        countPhoto(id);
        gradeAll(id)
    }

    const dimiss = () => {
        window.location.href = '/modification'
    }

    /**
    *  Change grade of a member
    * 
    * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
    * @method PUT
    * @param {integer} idMember identifier of the member for which we want to change the grade
    */
    const modificationChoixGrade = (idGrade) => {
        fetch(`/api/membres/${idGrade}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userNow })
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success("Vous venez de modifier le grade de l'utilisateur", optionsToast);
            }
            else {
                toast.error("Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous");
            }

        })
        changeUser(userNow)
        setEtatModification(0)
    }

    return (
        <>
            <ToastContainer style={{ fontSize: "0.6rem" }} />

            <button type="button" onClick={() => { changeUser(1); }} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                User 1
            </button>
            <button type="button" onClick={() => changeUser(2)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                User 2
            </button>
            <button type="button" onClick={() => changeUser(3)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                User 3
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content" style={{ backgroundColor: color }}>

                        <div class="modal-body">

                            <div class="hovereffect">

                                <div class="row">

                                    <div class="col">

                                        <ImgContainer>
                                            <img src={profilePhoto} alt='' />
                                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                <span className="badge nineplus" >{count}</span>
                                            </OverlayTrigger>

                                        </ImgContainer>

                                    </div>
                                    <div class="col">
                                    </div>
                                </div>
                            </div>

                            <div class="tool">
                                {etatModification === 0 ? <p class="affiche"> {nameGrade.toUpperCase()} <i onClick={modificationUp} className="bi bi-pencil-square" style={{ color: 'white', 'background': color, "backgroundSize": "10px", fontSize: "80%", "textAlign": "right", "paddingRight": '10px ', "paddingLeft": "4px" }}></i></p>
                                    : allGrade.map(grade => (grade.name_grade !== nameGrade ?
                                        <i key={grade.name_grade} onClick={() => { modificationChoixGrade(grade.id_grade); }} className="bi bi-person-square" style={{ color: grade.color, "border": "10px black", "fontSize" : "100%",'background': color, "textAlign": "right", "paddingRight": "20px" }}></i> : ''))
                                }
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

}

export default Modification;