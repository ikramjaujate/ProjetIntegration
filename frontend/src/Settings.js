import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect, useState} from "react" ;
import Toggle from "./components/ChangeTheme/Toggler"

// import  {useDarkMode} from "./components/ChangeTheme/userDarkMode"
// import  {useDaltonismkMode} from "./components/ChangeTheme/userDaltonismMode"
import  {useTh} from "./components/ChangeTheme/userTh"
import { useGlobal  } from 'reactn';
import './css/Settings.css';


function Settings() {

    // const [themeDark, toggleThemeDark] = useDarkMode();
    // const [themeDaltonism, toggleThemeDaltonism] = useDaltonismkMode();
    const [test, setTest] = useTh();
    const [color, setColor] = useGlobal("color");

    const [errorOld, setErrorOld] = useState("");
    const [errorNew, setErrorNew] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [validationModification, setValidationModification] = useState("");

    
    useEffect(()=> {
        setValidationModification("")
	}, []);

    const changeDark = () => {
        //toggleThemeDark() ;
        //setColor(themeDark)
        document.getElementById("dark-switch").checked ? setColor("dark") : setColor("light") ;
        console.log("checked : ", document.getElementById("dark-switch").checked, "color : ", color)
        setTest(color) ;
        //console.log("depuis dark : dark : ", themeDark, " dalt : ", themeDaltonism, " color : ", color)
    }

    const changeDaltonism = () => {
        //toggleThemeDaltonism() ;
        //setColor(themeDaltonism) ;
        document.getElementById("daltonism-switch").checked ? setColor("daltonism") : setColor("light") ;
        console.log("checked : ", document.getElementById("daltonism-switch").checked, "color : ", color)
        setTest(color) ;
        //console.log("depuis dalt : dark : ", themeDark, " dalt : ", themeDaltonism, " color : ", color)
    }

    const click = () => {
        console.log("color : ", color)
    }
	
    // const disableOther = (idDisabling) => {
    //     let idToDisable = idDisabling === "dark-switch" ? "daltonism-switch" : "dark-switch" ;
    //     console.log(idDisabling, " desactive ", idToDisable);
    //     if (document.getElementById(idDisabling).checked === true) {
    //         console.log("en true");
    //         document.getElementById(idToDisable).disabled = true ;
    //     }
    //     else {
    //         document.getElementById(idToDisable).disabled = false ;
    //         console.log("en false");
    //     }
    // }

    const modifyPassword = () => {
        setValidationModification("")
        // let oldPassword = document.getElementById("validationCustom01").value;
        // let newPassword = document.getElementById("validationCustom02").value;
        let oldPassword = passwordOld ;
        let newPassword = passwordNew ;
        let id = localStorage.getItem("id") ;
        // let newName = textNewNameGrade ;
        // let newColor = finalIdColor ;
        let newNameok = false, newColorok = false ;
        if (oldPassword === "") {
            console.log("old vide")
            //setBorderNewNameGrade("1px solid var(--error)");
            setErrorOld("Veuillez choisir un nom");
        }
        else {
            console.log("old rempli")
            //setBorderNewNameGrade("1px solid var(--error)");
            setErrorOld("");
            newNameok = true ;
        }
        // else {
        //     deleteErrorMsg(true, false);
        //     newNameok = true ;
        // }
        
        if (newPassword === "") {
            console.log("new vide")
            setErrorNew("Veuillez choisir une couleur");
        }
        else {
            console.log("new rempli")
            setErrorNew("");
            newColorok = true ;
        }

        console.log("colo : ", newColorok, " nam : ", newNameok)
        if (newColorok && newNameok) {
            console.log("bien true")
            fetch (`/api/${id}/password`,{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({oldPassword:oldPassword, newPassword:newPassword, id_user:localStorage.getItem("id")})
            })
            .then((res)=> {
                return res.json();
            })
            .then(data => {
                console.log("data : ", data)
                if (data.count === 1) {
                    console.log("ok !")
                    setValidationModification("Modifié avec succès");
                }
                else if (data.count === "ancien mot de passe incorrect") {
                    console.log("incorrect ancien")
                    setErrorOld("Mot de passe incorect");
                }
                else {
                    console.log('erreur')
                }
            })
        }

    }
    
    return (
        <>
            <Toggle />

            {color === "dark" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="dark-switch" onChange={() => {changeDark()}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div>
            : color === "daltonism" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="dark-switch" onChange={() => {changeDark()}} class="form-check-input" type="checkbox" role="switch" disabled /></div>
            : <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="dark-switch" onChange={() => {changeDark()}} class="form-check-input" type="checkbox" role="switch" /></div>
            }

            {color === "daltonism" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="daltonism-switch" onChange={() => {changeDaltonism()}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div>
            : color === "dark" ? 
            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="daltonism-switch" onChange={() => {changeDaltonism()}} class="form-check-input" type="checkbox" role="switch" disabled/></div>
            : <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="daltonism-switch" onChange={() => {changeDaltonism()}} class="form-check-input" type="checkbox" role="switch" /></div>
            }
            {/* <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="dark-switch" onChange={() => {test("dark-switch")}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div> */}
            {/* <div style={{marginLeft: "281px"}} class="form-check form-switch"><input id="daltonism-switch" onChange={() => {test("daltonism-switch")}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div> */}

            <button onClick={click}>iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</button>

            <form style={{marginLeft:'200px'}} class="row g-3 needs-validation" novalidate>
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Ancien mot de passe</label>
                    <input type="password" class="form-control" id="validationCustom01" required value={passwordOld} onChange={(e) => {setPasswordOld(e.target.value)}}/>
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please choose a username.
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Nouveau mot de passe</label>
                    <input type="password" class="form-control" id="validationCustom02" required value={passwordNew} onChange={(e) => {setPasswordNew(e.target.value)}}/>
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Please choose a username.
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="button" onClick={modifyPassword}>Submit form</button>
                </div>
                <div id="error-name" className="errorMessagePassword col-12 col-md-6 order-2 order-md-3">{errorOld}</div>
                <div id="error-color" className="errorMessagePassword col-12 col-md-6 order-4">{errorNew}</div>
                <div id="validation" className="validationMessagePassword col-12 col-md-6 order-4">{validationModification}</div>
            </form>
        </>
    )

} export default Settings;