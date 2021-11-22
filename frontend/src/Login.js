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
                //console.log(token)
                if (token.value) {
                    localStorage.setItem('access_token', token.value);
                    localStorage.setItem('id', token.id);
                    if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined") {
                        window.location.replace("/home")
                    }
                }

                
			})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
	}


    return (
        <>
        {/* <div className="container">
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
    	</div> */}
        <section class="vh-100 gradient-custom mx-md-0" style={{fontSize: "calc(0.5rem + 0.5vw", minWidth:"300px"}}>
            <div class="container  py-md-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                    <div class="card-body px-sm-3 p-md-4 text-center">

                        <div class="pb-2">

                        <h2 style={{fontSize: "calc(1rem + 0.5vw"}} class="fw-bold mb-2 text-uppercase">Connexion</h2>
                        <p class="text-white-50 mb-2">Entrez vos identifiants</p>

                        <div class="form-outline form-white mb-4">
                            <label class="form-label" for="typeEmailX">Identifiant</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="identifiant" id="typeEmailX" style={{fontSize: "calc(0.5rem + 0.5vw"}} class="form-control form-control-lg" />
                            
                        </div>

                        <div class="form-outline form-white mb-4">
                            <label class="form-label" for="typePasswordX">Mot de passe</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="typePasswordX" style={{fontSize: "calc(0.5rem + 0.5vw"}} class="form-control form-control-lg" />
                            
                        </div>

                        <button class="btn bg-success btn-outline-dark btn-lg px-4 px-md-5 px-lg-5" onClick={loginUser} style={{fontSize: "calc(0.7rem + 0.7vw"}}>Connexion</button>

                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    
        </>
    )

} export default Login;