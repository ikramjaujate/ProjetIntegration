import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect, useState} from "react" ;
import Toggle from "./components/ChangeTheme/Toggler"



function Settings() {
	

    return (
        <>
            <Toggle />

            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked /></div>
            <div style={{marginLeft: "281px"}} class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked /></div>

        </>
    )

} export default Settings;