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

    const [informationsGrade, setInformationsGrade] = useState([]);

    const listGrades = [{id:'dir', name : 'Directeur', color:'#B2DFDB', members:'2', allowedCamera:'14', refusedCamera:'0'}, 
    {id:'pers', name : 'Personnel', color:'#F8BBD0', members:'18', allowedCamera:'10', refusedCamera:'4'},
    {id:'benef', name : 'Bénéficiaire', color:'#BBDEFB', members:'82', allowedCamera:'3', refusedCamera:'11'}];

    const listCameras = [{name:"CAM1", allowed:true, notification:false},
    {name:"CAM2", allowed:true, notification:false},
    {name:"CAM3", allowed:false, notification:false},
    {name:"CAM4", allowed:false, notification:true},
    {name:"CAM5", allowed:false, notification:true},
    {name:"CAM6", allowed:true, notification:false},
    {name:"CAM7", allowed:true, notification:false},
    {name:"CAM8", allowed:true, notification:false},
    {name:"CAM9", allowed:false, notification:true},
    {name:"CAM10", allowed:false, notification:false}] ;

    // var myModal = document.getElementById('myModal') ;
    // var myInput = document.getElementById('myInput') ;

   

    useEffect(()=> {
        var informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
        console.log("go");
        fetch(`http://localhost:3001/api/grades`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCamera => {
            fetch(`http://localhost:3001/api/grades/members`, informations)
            .then(result => {
                return result.json();
            })
            .then(dataMembers => {
                //console.log("donnees1 : ", dataCamera);
                //console.log("donnees2 : ", dataMembers);
                dataCamera.map(element => element["membres"] = dataMembers.filter(elem =>elem.id === element.id)[0].members) ;
                console.log('data', dataCamera);
                setInformationsGrade(dataCamera) ;
            });
        });
    
	}, []);


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
                {listGrades.map(grade => (
                    <LayoutGrade name ={grade.name} color={grade.color} members={grade.members} allowed_camera={grade.allowedCamera} refused_camera={grade.refusedCamera}/>
                ))}

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
                            <h5 className="p-1 modal-title shadow-sm rounded col-sm-8 align-self-center offset-sm-2" style={{backgroundColor:'#F8F9FA', color:"white", textAlign:"center"}} id="gradeModalLabel">Chargement</h5>
                            {/* <button type="button" className="btn-close col-sm-1" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">

                            <div className="container-fluid">
                                {listCameras.map(camera => (
                                    <CameraInfo allowed={camera.allowed} name={camera.name} notification={camera.notification}/>
                                ))}
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