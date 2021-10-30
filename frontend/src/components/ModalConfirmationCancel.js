import '../css/Grades.css';
import ButtonGrade from './ButtonGrade';


const ModalConfirmationCancel = ({activateButton, deleteModification}) => {

    console.log('activatebut : ', activateButton);
    return (
        <div id="confirmationCancelModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirmationCancelModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="layout-modal-cancel row justify-content-center container">
                            <i id="icon-cancel" className="bi bi-x-circle"></i>
                            <h4>Voulez-vous vraiment annuler ? </h4>
                            <p>Toutes vos modifications seront perdues.</p>
                        </div>
                    </div>
                    <div className="modal-footer row justify-content-between">
                        {/* <button type="button" className="btn modal-button bouton-close col-11 col-sm-5" onClick={() => {activateButton("close-cancel");activateButton("open-modify-grade")}}>Non</button> */}
                        {/* <button type="button" id="open-desc-grade-2" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir desc grades</button> */}
                        {/* <button type="button" id="open-modify-grade" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal">Revenir modif grades</button> */}
                        {/* <button type="button" id="close-cancel" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer tout</button> */}
                        {/* <button type="button" className="btn modal-button bouton-warning col-11 col-sm-5" onClick={() => {deleteModification()}}>Oui</button> */}
                        <ButtonGrade className="bouton-close" text="Non" func1={activateButton} param1="close-cancel" func2={activateButton} param2="open-modify-grade" />
                        <ButtonGrade id="open-desc-grade-2" className="hidden-btn bouton-close" text="Revenir desc grade" targetToggle="#gradeModal" dataToggle="modal" />
                        <ButtonGrade id="open-modify-grade" className="hidden-btn bouton-close" text="Revenir modif grades" targetToggle="#modifyGradeModal" dataToggle="modal" />
                        <ButtonGrade id="close-cancel" className="hidden-btn bouton-close" text="Fermer tout" dataDismiss="modal" ariaLabel="Close" />
                        <ButtonGrade className="bouton-warning" text="Oui" func1={deleteModification} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmationCancel;