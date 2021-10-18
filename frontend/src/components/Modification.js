import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from "react";
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import ReactDOM from "react-dom";
import '../css/Modification.css'
import Popover from "react-bootstrap/Popover"
import EdiText from "react-editext";
import styled from "styled-components";

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Les photos</Popover.Header>
        <Popover.Body>
            Voici un <strong>test</strong>
        </Popover.Body>
    </Popover>
);

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
function Test() {
    console.log('test ok')
}
function Modification() {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("Ikram Jaujate");

    const handleSave = (value) => {
        console.log(value);
        setValue(value);
    };
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

                                    <img src={'ikram2.jpg'} alt="" />

                                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                        <span className="badge nineplus">1+</span>
                                    </OverlayTrigger>

                                </ImgContainer>
                            </div>


                        </div>

                        <div class="col-xs-2">
                            <EdiText
                                value={value}
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