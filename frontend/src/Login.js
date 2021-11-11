import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect, useState} from "react" ;
import { useCookies } from 'react-cookie';
import { withCookies } from "react-cookie";


function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useState(0);
    const [cookie, setCookie] = useCookies(['user'])

	const loginUser = () => {
		let informations = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
			body: JSON.stringify({ username, password })
        };
        fetch(`/api/login`, informations)
            .then(response => {
				return response.json()	
			}).then(response => {
				console.log(response.value)
                if(response.value.rowCount){
                    setCookie('Id', username, { path: '/' });
                }
			})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
	}

    const showCookie = () => {
        console("cookies = " + cookie)
    }


    return (
        <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nom d'utilisateuuuuuuuur</label>
                    <input type="text" placeholder='toto' value={username} onChange={(e) => setUsername(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1"/>
                </div>
                
                <button onClick={loginUser} class="btn btn-primary">Connecter</button><br/>
                <button onClick={showCookie} class="btn btn-primary">CLICK</button>

            </form>
    	</div>
    
        </>
    )

} export default withCookies(Login);