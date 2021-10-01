import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import './css/Grades.css';


function Grades() {
    return (
        <div>
            <div>
                <div className="row p-3 justify-content-center">
                    <div className="col-sm-5">
                    <i className="bi bi-person"></i>
                    <i className="bi bi-person-circle" ></i>
                        <div className="p-2 bg-light shadow-sm rounded row">
                            <div className="col-sm-2 teal lighten-2 image"></div>
                            <div className="col-sm-5"></div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                </div>
                <div className="row p-3 justify-content-center">
                <div className="col-sm-5">
                        <div className="p-4 bg-light shadow-sm rounded">cc</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Grades;