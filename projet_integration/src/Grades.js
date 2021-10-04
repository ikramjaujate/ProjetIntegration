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
    const [informationsCameras, setinformationsCameras] = useState([]);
    const [colorGrades, setColorGrades] = useState([]);
  

    /**
     * Récupère au chargement de la page les informations concernant les différents grades
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    useEffect(()=> {
        var informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };
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
                console.log("camera : ", dataCamera, " members : ", dataMembers);
                dataCamera.map(grade => grade["members"] = dataMembers.filter(gradeMembers =>gradeMembers.id === grade.id)[0].members) ;
                setInformationsGrade(dataCamera) ;
            });
        });

        fetch(`http://localhost:3001/api/grades`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCamera => {
            fetch(`http://localhost:3001/api/grades/members`, informations)
            .then(result => {
                return result.json();
            })
            .then(data => {
                console.log("data : ", data) ;
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


    /**
     * Adapte le nom et la couleur du grade sur lequel on souhaite avoir des détails
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} mainColor  Couleur du grade sélectionné
     * @param {string} mainName   Nom du grade sélectionné
     */
    const openCameraInfo = (mainColor, mainName, grade) => {
        document.getElementById('gradeModalLabel').style.backgroundColor= mainColor;
        document.getElementById('gradeModalLabel').innerHTML= mainName;

        var informations = { method: 'GET',
               headers: {'Content-Type': 'application/json'},
        };

        fetch(`http://localhost:3001/api/grades/${grade}/cameras`, informations)
        .then(result => {
            return result.json();
        })
        .then(dataCameras => {
            setinformationsCameras(dataCameras) ;
        });
    }

    /**
     * Créer un nouveau grade
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const createGrade = () => {
        console.log("nom : ", document.getElementById("name-grade").value);
        console.log("couleur : ", document.getElementById("final-color").style.color);

        let newName = document.getElementById("name-grade").value ;
        let newColor = document.getElementById("final-color").style.color ;
        fetch ("http://localhost:3001/api/grades",{
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({name:newName, color:newColor})
        })
        .then((res)=> {
            console.log("res : ", res);
            return res;
        })
    }

    
    return (
        <div>
            <div>
                {informationsGrade && informationsGrade.map(grade => (
                    <div type="button" onClick={() => openCameraInfo(grade.color, grade.name, grade.id)}>
                        <LayoutGrade name ={grade.name} color={grade.color} members={grade.members} allowed_camera={grade.allowedcamera} refused_camera={grade.refusedcamera}/>
                    </div>
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
                    </div>
                </div>  

                <div className="modal fade" id="gradeModal" tabindex="-1" aria-labelledby="gradeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="p-1 modal-title shadow-sm rounded col-sm-8 align-self-center offset-sm-2" style={{backgroundColor:'#F8F9FA', color:"white", textAlign:"center"}} id="gradeModalLabel">Chargement</h5>
                        </div>
                        <div className="modal-body">

                            <div className="container-fluid">
                                {informationsCameras && informationsCameras.map(camera => (
                                    <CameraInfo allowed={camera.allowed} name={camera.name} notification={camera.notification}/>
                                ))}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addGradeModal" tabindex="-1" aria-labelledby="addGradeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header row">
                            <h5 className="p-1 modal-title col-sm-8 align-self-center offset-sm-2" style={{textAlign:"center"}} id="addGradeModalLabel">Ajouter un grade</h5>
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
                            <button type="button" className="btn btn-primary" onClick={() => createGrade()}>Créer</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
  }
  
  export default Grades;