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

                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
                </button> */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header row">
                            <h5 class="p-1 modal-title shadow-sm rounded col-sm-8 align-self-center offset-sm-2" style={{backgroundColor:'#BBDEFB', color:"white", textAlign:"center"}} id="exampleModalLabel">Bénéficaire</h5>
                            {/* <button type="button" class="btn-close col-sm-1" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body">

                            <div class="container-fluid">
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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
  }
  
  export default Grades;