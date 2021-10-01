import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './css/Grades.css';
import LayoutGrade from './components/LayoutGrade';

function Grades() {
    return (
        <div>
            <div>
                <LayoutGrade name ="Directeur" color="teal lighten-4" members="2" allowed_camera="14" refused_camera="0"/>
                <LayoutGrade name ="Personnel" color="pink lighten-4" members="18" allowed_camera="10" refused_camera="4"/>
                <LayoutGrade name ="Bénéficiaire" color="blue lighten-4" members="82" allowed_camera="3" refused_camera="11"/>


                
            </div>
        </div>
    );
  }
  
  export default Grades;