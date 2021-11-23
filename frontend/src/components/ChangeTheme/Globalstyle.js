import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color : ${({ theme }) => theme.bodyColor};
  }
  .gradeCard {
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
  .bg-light {
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
  .cardMember {
    border: ${({ theme }) => theme.borderCardMember}!important;
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
  `

  //    transition: background 0.50s linear;
