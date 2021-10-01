import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
// import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'mdb-ui-kit/css/mdb.min.css';

import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';
import {useEffect, useState} from "react" ;

function Grades() {

    // var myModal = document.getElementById('myModal') ;
    // var myInput = document.getElementById('myInput') ;

   

    // useEffect(()=> {
    //     myModal.addEventListener('shown.bs.modal', function () {
    //         myInput.focus()
    //         })
	// }, []);

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
                            
                            <i type="button" className="p-0 bi bi-plus-circle-fill align-self-start add-user" style={{color:"#81C784", fontSize:'280%', left:'120px', position:'relative',top:'-39px'}}></i>
                            <div className="p-0 col-sm-12 align-self-end" style={{color:"#BDBDBD"}}>0 membre</div>
                        </div>
                        {/* <i class="bi bi-plus-circle-fill green-text text-lighten-2"></i> */}
                    </div>
                </div>  


                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div class="modal-dialog modal-dialog-centered" id="staticBackdrop">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                        </div>
                    </div>
                </div> */}

                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

                    <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Modal Header</h4>
                        </div>
                        <div class="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        </div>

                    </div>
                    </div>

            </div>
        </div>
    );
  }
  
  export default Grades;