import {useEffect, useState} from "react" ;
import { setGlobal } from 'reactn';
// Set an initial global state directly:
setGlobal({
  count: 0, 
  
});

function TestComponent() {
    const [informationsGrade, setInformationsGrade] = useState([]);
    const [informationsCameras, setinformationsCameras] = useState(null);
    const [colorGrades, setColorGrades] = useState([]);
    const [currentColor, setCurrentColor] = useState("");
    const [currentGrade, setCurrentGrade] = useState("");
    const [currentIdGrade, setCurrentIdGrade] = useState("");
    const optionsToast = {
        autoClose: 8000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };
    let newActions = {} ;
    let newNotifications = {} ;
    const errorMsgClient = "Une erreur s'est produite. Veuillez réessayer. Si l'erreur persite, contactez-nous." ;
    const [colorCreation, setColorCreation] = useState('red');
    const [showColorPicker, setShowColorPicker] = useState(false);
};
export default TestComponent;