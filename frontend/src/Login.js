import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect, useState} from "react" ;



function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useState(0);

	const loginUser = () => {
		let informations = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
			body: JSON.stringify({ username, password })
        };
        fetch(`/api/login`, informations)
            .then(response => {
				return response.json()	
			}).then(token => {
                console.log(token.value)
                if (token.value) {
                    localStorage.setItem('access_token', token.value);

                    if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined") {
                        window.location.replace("/grades")
                    }
                }

                
			})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
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

            </form>
    	</div>
    
        </>
    )

} export default Login;