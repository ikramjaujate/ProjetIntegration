import '../css/Grades.css';


const ModalConfirmationCancel = ({activateButton, deleteModification}) => {

    
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
                        <button type="button" className="btn modal-button bouton-close col-11 col-sm-5" onClick={() => {activateButton("close-cancel");activateButton("open-modify-grade")}}>Non</button>
                        <button type="button" id="open-desc-grade-2" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#gradeModal" data-bs-toggle="modal">Revenir desc grades</button>
                        <button type="button" id="open-modify-grade" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-target="#modifyGradeModal" data-bs-toggle="modal">Revenir modif grades</button>
                        <button type="button" id="close-cancel" className="btn hidden-btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" aria-label="Close">Fermer tout</button>
                        <button type="button" className="btn modal-button bouton-warning col-11 col-sm-5" onClick={() => {deleteModification()}}>Oui</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmationCancel;