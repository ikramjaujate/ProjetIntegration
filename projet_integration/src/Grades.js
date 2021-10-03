import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
// import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'mdb-ui-kit/css/mdb.min.css';

import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';
import CameraInfo from './components/CameraInfo';
import {useEffect, useState} from "react" ;

function Grades() {

    // var myModal = document.getElementById('myModal') ;
    // var myInput = document.getElementById('myInput') ;

   

    // useEffect(()=> {
    //     myModal.addEventListener('shown.bs.modal', function () {
    //         myInput.focus()
    //         })
	// }, []);


    /**
     * Assigne une couleur au grade qui est en train d'être créé
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} newColor  Couleur sélectionnée pour le grade
     */
    const chooseColor = (newColor) => {
        document.getElementById('final-color').style.color= newColor;
    }

    
    return (
        <div>
            <div>
                <LayoutGrade name ="Directeur" color="#B2DFDB" members="2" allowed_camera="14" refused_camera="0"/>
                <LayoutGrade name ="Personnel" color="#F8BBD0" members="18" allowed_camera="10" refused_camera="4"/>
                <LayoutGrade name ="Bénéficiaire" color="#BBDEFB" members="82" allowed_camera="3" refused_camera="11"/>

                <div className="row p-1 justify-content-center">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 p-1 bg-light shadow-sm rounded row">
                        <div className='col-sm-3 rounded' style={{backgroundColor:'#E0E0E0'}}>
                            <i className="bi bi-person" style={{color:'white', fontSize:'350%'}}></i>
                        </div>
                        <div className="col-sm-6 align-self-center" style={{color:"#BDBDBD", fontSize:'175%'}}>Nouveau</div>
                        <div className="p-0 col-sm-3 col row" style={{fontSize:'65%', margin:'0px', textAlign:'left'}}>
                            <div>
                                <i type="button" data-bs-toggle="modal" data-bs-target="#addGradeModal" className="p-0 bi bi-plus-circle-fill align-self-start add-user" style={{color:"#81C784", fontSize:'280%', left:'120px', position:'relative',top:'-39px'}}></i>
                            </div>
                            <div className="p-0 col-sm-12 align-self-end" style={{color:"#BDBDBD"}}>0 membre</div>
                        </div>
                        {/* <i className="bi bi-plus-circle-fill green-text text-lighten-2"></i> */}
                    </div>
                </div>  

                {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gradeModal">
                Launch demo modal
                </button> */}

                <div className="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="p-1 modal-title shadow-sm rounded col-sm-8 align-self-center offset-sm-2" style={{backgroundColor:'#BBDEFB', color:"white", textAlign:"center"}} id="gradeModalLabel">Bénéficaire</h5>
                            {/* <button type="button" className="btn-close col-sm-1" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">

                            <div className="container-fluid">
                                <CameraInfo color="#90e093" name="CAM1" notification={false}/>
                                <CameraInfo color="#90e093" name="CAM2" notification={false}/>
                                <CameraInfo color="#ff6060" name="CAM3" notification={false}/>
                                <CameraInfo color="#ff6060" name="CAM4" notification={true}/>
                                <CameraInfo color="#ff6060" name="CAM5" notification={true}/>
                                <CameraInfo color="#90e093" name="CAM6" notification={false}/>
                                <CameraInfo color="#90e093" name="CAM7" notification={false}/>
                                <CameraInfo color="#ff6060" name="CAM8" notification={false}/>
                                <CameraInfo color="#ff6060" name="CAM9" notification={false}/>
                                <CameraInfo color="#ff6060" name="CAM10" notification={true}/>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addGradeModal" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="p-1 modal-title col-sm-8 align-self-center offset-sm-2" style={{textAlign:"center"}} id="addGradeModalLabel">Ajouter un grade</h5>
                            {/* <button type="button" className="btn-close col-sm-1" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">

                            <div className="container-fluid">
                                <div className="row bg-light rounded">
                                    <div className="col-md-4 p-1 m-2 bg-light rounded">
                                        <label for="name-grade" className="col-form-label">Nom : </label>
                                    </div>
                                    <div className="p-1 m-2 col-md-4 bg-light rounded">
                                        <input type="text" className="col-sm-4 form-control" id="name-grade" />
                                    </div>
                                </div>
                                <div className="row bg-light rounded">
                                    <div className="col-md-4 p-1 m-2 bg-light rounded">
                                        <label for="color-grade" className="col-form-label">Couleur : </label>
                                    </div>
                                    <div className="p-0 m-2 col-md-6 bg-light rounded row">
                                        {/* <input type="text" className="col-sm-4 form-control" id="color-grade" /> */}
                                        <div className="col-md-5"><i id="final-color" className="bi bi-square-fill" style={{color:"#BDBDBD", fontSize:"175%"}}></i></div>
                                        <div className="col-md-1"><i type="button" className="bi bi-square-fill" style={{color:"#B2DFDB"}} onClick={() => chooseColor("#B2DFDB")}></i></div>
                                        <div className="col-md-1"><i type="button" className="bi bi-square-fill" style={{color:"#F8BBD0"}} onClick={() => chooseColor("#F8BBD0")}></i></div>
                                        <div className="col-md-1"><i type="button" className="bi bi-square-fill" style={{color:"#BBDEFB"}} onClick={() => chooseColor("#BBDEFB")}></i></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer justify-content-evenly">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary">Sauvegarder</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* <div><i type="button" className="bi bi-square-fill" style={{color:"#B2DFDB"}}></i></div>
                <div><i type="button" className="bi bi-square-fill" style={{color:"#F8BBD0"}}></i></div>
                <div><i type="button" className="bi bi-square-fill" style={{color:"#BBDEFB"}}></i></div> */}

            </div>
        </div>
    );
  }
  
  export default Grades;