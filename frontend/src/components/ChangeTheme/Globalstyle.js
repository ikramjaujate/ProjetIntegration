import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    --camera-allow : ${({ theme }) => theme.switchOn}!important;
    --camera-refuse : ${({ theme }) => theme.switchOff}!important;
    --error-border : ${({ theme }) => theme.switchOff}!important;
  }


  body {
    background: ${({ theme }) => theme.body};
    color : ${({ theme }) => theme.bodyColor};
  }
  .gradespage .bg-light {
    background-color: ${({ theme }) => theme.carteGrade}!important;
  }
  .navbar-main {
    background-color: ${({ theme }) => theme.bgNavbar};
  }
  #desription-page{
    color:${({ theme }) => theme.textColorTitle};
  }
  .cam2 .titre {
    color:${({ theme }) => theme.textColorTitle};
  }
  .add-user {
    color: ${({ theme }) => theme.addGrade};
  }
  .allowed-camera {
    color: ${({ theme }) => theme.cameraAllowed};
  }
  .refused-camera {
    color: ${({ theme }) => theme.cameraRefused};
  }
  .modal-content {
    background-color: ${({ theme }) => theme.bgModalGrade};
  }
  .modal-header {
    border-bottom: ${({ theme }) => theme.borderModal};
  }
  .modal-footer {
    border-top: ${({ theme }) => theme.borderModal};
  }
  .bouton-close {
    background-color: ${({ theme }) => theme.fermerModalBtn};
  }
  .bouton-close:hover {
    background-color: ${({ theme }) => theme.fermerModalBtnHover};
  }
  .settings .bg-light {
    background-color: ${({ theme }) => theme.newBgLight}!important;
  }
  .modal-body {
    background-color: ${({ theme }) => theme.bodyModal};
  }
  .bi-bell-slash-fill {
    color: ${({ theme }) => theme.slashBellColor};
  }
  .downPart {
    background-color: ${({ theme }) => theme.newBgLight}!important;
  }
  .cadreBouton {
    background-color: ${({ theme }) => theme.lineCamera};
    color : ${({ theme }) => theme.bodyColor};
  }
  .addMember {
    background-color: ${({ theme }) => theme.addMember}!important;
  }
  .cardPicture {
    background-color: ${({ theme }) => theme.carteGrade}!important;
  }

  .members .shadow {
    box-shadow : ${({ theme }) => theme.shadowMember}!important;
  }
  input[type=text], input[type=password], select {
    background-color : ${({ theme }) => theme.bgInput}!important;
  }
  .save-button {
    background-color : ${({ theme }) => theme.saveInformations};
  }
  .save-button:hover {
    background-color : ${({ theme }) => theme.saveInformationsHover};
  }
  .errorMessageModify {
    color: ${({ theme }) => theme.errorMessage};
  }
  .errorMessage {
    color: ${({ theme }) => theme.errorMessage};
  }
  .bi-brightness-high-fill {
    color: ${({ theme }) => theme.nonUseIcon};
  }
  .bi-moon-stars-fill {
    color:${({ theme }) => theme.useIcon};
  }
  .bi-eye-slash {
    color:${({ theme }) => theme.desactivateIconLeft};
  }
  .bi-eye-fill {
    color: ${({ theme }) => theme.desactivateIconRight};
  }
  .frameModify {
    background-color: ${({ theme }) => theme.modificationIcon};
  }
  .frameSee {
    background-color: ${({ theme }) => theme.seeingIcon};
  }
  .settings a:link {
    color : ${({ theme }) => theme.text};
  }
  .settings a:active {
      color : ${({ theme }) => theme.text};
  }
  .settings a:focus {
      color : ${({ theme }) => theme.text};
  }
  .settings a:hover {
      color : ${({ theme }) => theme.text};
  }
  .settings a:visited {
      color : ${({ theme }) => theme.text};
  }
  .cam2  .bg-light {
    background-color: ${({ theme }) => theme.carteGrade}!important;
  }
  .form-check-input:checked {
    background-color: ${({ theme }) => theme.cameraAllowed};
    border-color: ${({ theme }) => theme.cameraAllowed};
  }
  .voirPhoto #imgModalLabel {
    color: ${({ theme }) => theme.text} !important;
  }



  .form-check-input:checked {
    background-color : ${({ theme }) => theme.switchOn};
  }
  .form-check-input {
    background-color : ${({ theme }) => theme.switchOff};
  }
  .allowed-camera {
    color : ${({ theme }) => theme.switchOn}!important;
  }
  .refused-camera {
    color : ${({ theme }) => theme.switchOff}!important;
  }
  #icon-cancel {
    color : ${({ theme }) => theme.switchOff}!important;
  }
  .bouton-warning {
    background-color : ${({ theme }) => theme.switchOff}!important;
  }
  #modifyGradeModal .bi-bell-fill {
    color : ${({ theme }) => theme.colorBell};
  }
  
  `

  //    transition: background 0.50s linear;
