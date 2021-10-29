import '../css/Grades.css';
import {useState} from "react" ;
import {ChromePicker} from 'react-color' ;


const ModalAddGrade = ({nameGrade, borderGrade, colorGrade, idColorGrade, colors, errorName, errorColor, setNameGrade, resetCreation, createGrade, chooseColor}) => {

    const [colorCreation, setColorCreation] = useState('red');
    const [showColorPicker, setShowColorPicker] = useState(false);

    /**
     * Add a border around the selected color
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idColor  Identifier of the selected color
     */
     const highlithColor = (idColor) => {
        
        let styleElemNewColor = document.head.appendChild(document.createElement("style"));
        styleElemNewColor.innerHTML = `#little-square-${idColor}:before {border:1px solid var(--frame-choice-color); border-radius:4px;}`;

        let styleElemOldColor = document.head.appendChild(document.createElement("style"));
        let oldIdColor = idColorGrade ;
        styleElemOldColor.innerHTML = `#little-square-${oldIdColor}:before {border:none;}`;
    }

    return (
        <div id="addGradeModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header row">
                        <h5 className="modal-title p-1 col-sm-8 offset-sm-2" id="addGradeModalLabel">Ajouter un grade</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-md-6 order-1">
                                    <div className="frame-grade-label p-0 m-1 col-11"> 
                                        <label id="name-grade-label" className="col-form-label" for="name-grade">Nom</label>
                                    </div>
                                    <div id="frame-name-grade-input" className="p-0 m-1 col-10">
                                        <input type="text" id="name-grade" className=" form-control" maxlength="10" value={nameGrade} style={{border:borderGrade}} onChange={(e) => {setNameGrade(e.target.value)}}/>
                                        {/* <i className="bi bi-exclamation-circle" style={{color:"red"}}></i> */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 order-3 order-md-2">
                                    <div className="frame-grade-label p-0 m-1 col-11">
                                        <label id="color-grade-label" for="color-grade" className="col-form-label">Couleur</label>
                                    </div>
                                    <div id="frame-colors" className="row p-0 m-0 rounded col-11">
                                        <div className="container-final-color col-12">
                                            <i id={idColorGrade} className="bi bi-square-fill final-color" style={{color:colorGrade, fontSize:"175%"}}></i>
                                        </div>
                                        {colors && colors.map(color => (
                                            <div className="container-choosing-color col-1">
                                                <i type="button" id={`little-square-${color.id_color}`} className={`bi bi-square-fill ${color.id_color}`} style={{color:color.name_color}} onClick={() => {highlithColor(color.id_color);chooseColor(color.id_color, color.name_color)}}></i>
                                            </div>
                                        ))}
                                        <div className="container-choosing-color col-1">
                                            <i type="button" className={`bi bi-plus-square square-selection`} style={{color:colorCreation}} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}></i>
                                            {showColorPicker && (<ChromePicker color={colorCreation} onChange={updatedColor => setColorCreation(updatedColor.hex)}></ChromePicker>)}
                                        </div>
                                    </div>
                                </div>
                                <div id="error-name" className="errorMessage col-12 col-md-6 order-2 order-md-3">{errorName}</div>
                                <div id="error-color" className="errorMessage col-12 col-md-6 order-4">{errorColor}</div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer row justify-content-between">
                        <button type="button" id="cancel-creation" className="btn modal-button bouton-close col-11 col-sm-5" data-bs-dismiss="modal" onClick={resetCreation}>Annuler </button>
                        <button type="button" className="btn modal-button bouton-action col-11 col-sm-5" onClick={() => createGrade()}>Créer </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddGrade;