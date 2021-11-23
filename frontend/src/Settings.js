import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect, useState} from "react" ;
import Toggle from "./components/ChangeTheme/Toggler";
import { ToastContainer, toast } from 'react-toastify';


import  {useThemeMode} from "./components/ChangeTheme/userThemeMode"
import { useGlobal  } from 'reactn';
import './css/Settings.css';


function Settings() {

    const [theme, setTheme] = useThemeMode();
    const [color, setColor] = useGlobal("color");

    const [errorOld, setErrorOld] = useState("");
    const [errorNew, setErrorNew] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [borderOldPassword, setBorderOldPassword] = useState("null");
    const [borderNewPassword, setBorderNewPassword] = useState("null");
    const optionsToast = {
        autoClose: 8000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme:"colored"
    };
    const [actualPassword, setActualPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [borderNewUsername, setBorderNewUsername] = useState("null");
    const [borderActualPassword, setBorderActualPassword] = useState("null");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    
    /**
     * Clear all the error message when refreshing
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */    
    useEffect(()=> {
        deleteErrorMsgPassword(true, true);
        deleteErrorMsgUsername(true, true);
	}, []);


    /**
     * Switch the theme of the site according to the param given
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {string} theme name of the theme that is switch
     */
     const changeTheme = (theme) => {
        let newColor ;
        //document.getElementById(theme + "-switch").checked ? setColor(theme) : setColor("light") ;
        document.getElementById(theme + "-switch").checked ? newColor = theme : newColor = "light" ;
        setColor(newColor)
        setTheme(newColor) ;
    }


    /**
     * Suppression of error messages at modification of the password
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const deleteErrorMsgPassword = (OldError, NewError) => {
        if (OldError) {
            setBorderOldPassword("1px solid #ced4da");
            setErrorOld("");
        }
        if (NewError) {
            setErrorNew("");
            setBorderNewPassword("1px solid #ced4da");
        }
    }


    /**
     * Modify the password, checking beforehand that the information requested is complete
     * and correct
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const modifyPassword = () => {
        let oldPassword = passwordOld ;
        let newPassword = passwordNew ;
        let id = localStorage.getItem("id") ;
        let oldPasswordok = false, newPasswordok = false ;
        let limitCharacter = 12;
        var format_mdp = /^[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]*$/;

        if (oldPassword === "") {
            setBorderOldPassword("1px solid var(--error)");
            setErrorOld("Veuillez enter votre ancien mot de passe");
        }
        else {
            deleteErrorMsgPassword(true, false) ;
            oldPasswordok = true ;
        }
        
        if (newPassword === "") {
            setErrorNew("Veuillez entrer votre nouveau mot de passe");
            setBorderNewPassword("1px solid var(--error)");
        }
        else {
            if(newPassword.length < limitCharacter) {
                setErrorNew("Mot de passe trop court, au moins 12 caractère");
                setBorderNewPassword("1px solid var(--error)");
            }
            else if (newPassword.split('').filter(lettre => lettre === lettre.toUpperCase()).length === 0 || newPassword.split('').filter(lettre => !isNaN(lettre)).length === 0 || newPassword.split('').filter(lettre => lettre.match(format_mdp)).length === 0) {
                setErrorNew("Veuillez entrer un mot de passe plus sécurisé (comprenant 1 lettre, 1 chiffre, et 1 caractère spécial)");
                setBorderNewPassword("1px solid var(--error)");
            }
            else {
                deleteErrorMsgPassword(false, true) ;
                newPasswordok = true ;
            }
        }

        if (newPasswordok && oldPasswordok) {
            deleteErrorMsgPassword(true, true) ;
            console.log("bien true")
            fetch (`/api/${id}/password`,{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({oldPassword:oldPassword, newPassword:newPassword})
            })
            .then((res)=> {
                return res.json();
            })
            .then(data => {
                if (data.count === 1) {
                    setPasswordOld("") ;
                    setPasswordNew("") ;
                    toast.success("Mot de passe modifié avec succès !", optionsToast);
                }
                else if (data.count === "ancien mot de passe incorrect") {
                    setErrorOld("Mot de passe incorect");
                    setBorderOldPassword("1px solid var(--error)");
                }
                else {
                    console.log('erreur modification mot de passe')
                }
            })
        }
    }


    /**
     * Suppression of error messages at modification of the username
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
     const deleteErrorMsgUsername = (usernameError, passwordError) => {
        if (usernameError) {
            setBorderNewUsername("1px solid #ced4da");
            setErrorUsername("");
        }
        if (passwordError) {
            setErrorPassword("");
            setBorderActualPassword("1px solid #ced4da");
        }
    }


    /**
     * Modify the username, checking beforehand that the information requested is complete
     * and correct (like the password or the number of character of the new username)
     * 
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     */
    const modifyUsername = () => {
        let username = newUsername ;
        let password = actualPassword ;
        let id = localStorage.getItem("id") ;
        let passwordok = false, usernameok = false ;
        let limitCharacter = 5;

        if (username === "") {
            setBorderNewUsername("1px solid var(--error)");
            setErrorUsername("Veuillez entrer votre nom d'utilisateur");
        }
        else {
            if (username.length < limitCharacter) {
                setBorderNewUsername("1px solid var(--error)");
                setErrorUsername("Trop court, au moins " + limitCharacter.toString() + " caractères");
            }
            else {
                usernameok = true ;
                deleteErrorMsgUsername(true, false);
            }
        }
        if (password === "") {
            setErrorPassword("Veuillez entrer votre mot de passe");
            setBorderActualPassword("1px solid var(--error)");
        }
        else {
            passwordok = true ;
            deleteErrorMsgUsername(false, true);
        }

        if (usernameok && passwordok) {
            deleteErrorMsgUsername(true, true);
            fetch (`/api/${id}/username`,{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({username:username, password:password})
            })
            .then((res)=> {
                return res.json();
            })
            .then(data => {
                if (data.count === 1) {
                    setNewUsername("") ;
                    setActualPassword("") ;
                    toast.success("username modifié", optionsToast);
                }
                else if (data.count === "mot de passe incorrect") {
                    setErrorPassword("Mot de passe incorect");
                    setBorderActualPassword("1px solid var(--error)");
                }
                else if (data.count === "nom d'utilisateur déjà utilisé") {
                    setErrorUsername("Nom utilisateur déjà utilisé");
                    setBorderNewUsername("1px solid var(--error)");
                }
                else {
                    console.log('erreur modification username')
                }
            })
        }
    }
    
    return (
        <>
            {/* <Toggle /> */}

            {color === "dark" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode sombre<input id="dark-switch" onChange={() => {changeTheme("dark")}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div>
            : color === "daltonism" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode sombre<input id="dark-switch" onChange={() => {changeTheme("dark")}} class="form-check-input" type="checkbox" role="switch" disabled /></div>
            : <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode sombre<input id="dark-switch" onChange={() => {changeTheme("dark")}} class="form-check-input" type="checkbox" role="switch" /></div>
            }

            {color === "daltonism" ?
            <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode daltonien<input id="daltonism-switch" onChange={() => {changeTheme("daltonism")}} class="form-check-input" type="checkbox" role="switch" defaultChecked /></div>
            : color === "dark" ? 
            <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode daltonien<input id="daltonism-switch" onChange={() => {changeTheme("daltonism")}} class="form-check-input" type="checkbox" role="switch" disabled/></div>
            : <div style={{marginLeft: "281px"}} class="form-check form-switch">Mode daltonien<input id="daltonism-switch" onChange={() => {changeTheme("daltonism")}} class="form-check-input" type="checkbox" role="switch" /></div>
            }

            <form style={{marginLeft:'200px'}} class="row g-3 needs-validation" novalidate>
                <div class="col-md-4">
                    <label for="oldPassword" class="form-label">Ancien mot de passe</label>
                    <input type="password" class="form-control" id="oldPassword" required value={passwordOld} onChange={(e) => {setPasswordOld(e.target.value)}} style={{border:borderOldPassword}}/>
                </div>
                <div class="col-md-4">
                    <label for="newPassword" class="form-label">Nouveau mot de passe</label>
                    <input type="password" maxLength='20' class="form-control" id="newPassword" required value={passwordNew} onChange={(e) => {setPasswordNew(e.target.value)}} style={{border:borderNewPassword}}/>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="button" onClick={modifyPassword}>Sauvegarder mot de passe</button>
                </div>
                <div className="errorMessagePassword col-12 col-md-6 order-2 order-md-3">{errorOld}</div>
                <div className="errorMessagePassword col-12 col-md-6 order-4">{errorNew}</div>


                <div class="col-md-4">
                    <label for="newUsername" class="form-label">Nouveau username</label>
                    <input type="text" maxLength="15" class="form-control" id="newUsername" required value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}} style={{border:borderNewUsername}}/>
                </div>
                <div class="col-md-4">
                    <label for="actualPassword" class="form-label">Mot de passe</label>
                    <input type="password" class="form-control" id="actualPassword" required value={actualPassword} onChange={(e) => {setActualPassword(e.target.value)}} style={{border:borderActualPassword}}/>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="button" onClick={modifyUsername}>Sauvegarder username</button>
                </div>
                <div className="errorMessagePassword col-12 col-md-6 order-2 order-md-3">{errorUsername}</div>
                <div className="errorMessagePassword col-12 col-md-6 order-4">{errorPassword}</div>
            </form>

            <ToastContainer style={{fontSize:"0.6rem"}}/>      

        </>
    )

} export default Settings;