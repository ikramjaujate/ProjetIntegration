import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import'bootstrap/scss';
import'bootstrap/scss/_variables.scss';

import './css/Grades.css';


function Grades() {
    return (
        <div>
            <div>
                <div className="row p-3 justify-content-center">
                    <div className="col-sm-5">
                        <div className="p-4 bd-blue-100 shadow-sm rounded row">cc
                            <div className="col-sm-2 bg-$red-500"></div>
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