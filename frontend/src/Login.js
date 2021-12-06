import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.min.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useState} from "react" ;



function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const [blankPassword, setBlankPassword] = useState('')
    const [blankUsername, setBlankUsername] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

	const loginUser = (event) => {
        event.preventDefault()
        usernameVerif()
        passwordVerif()        
        if(username !== '' && password !== ''){
            let informations = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ username, password })
            };
            fetch(`/api/login`, informations)
                .then(response => {
                    return (response.json())             
                }).then(token => {
                    setErrorMsg(<p style={{color:'red'}}>{token.message}</p>)
                    if (token.value) {
                        localStorage.setItem('access_token', token.value);
                        localStorage.setItem('id', token.id)

                        if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined") {
                            window.location.replace("/home")
                        }
                    }                
                })
        }    
	}
    
    const usernameVerif = () => {
        if(username === ''){
            setBlankUsername(<p style={{color : "red", fontSize : "calc(0.3rem + 0.4vw)", fontStyle:"italic"}}>Champ requis</p>)
        }
        else setBlankUsername('')
        
    }

    const passwordVerif = () => {
        if(password === ''){
            setBlankPassword(<p style={{color : "red", fontSize : "calc(0.3rem + 0.4vw)", fontStyle:"italic"}}>Champ requis</p>)
        }
        else setBlankPassword('')

    }



    return (
        <>
        <section class="vh-100 gradient-custom mx-md-0" style={{fontSize: "calc(0.5rem + 0.5vw", minWidth:"300px"}}>
            <div class="container  py-md-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                    <div class="card-body px-sm-3 p-md-4 text-center">

                        <div class="pb-2">

                            <h2 style={{fontSize: "calc(1rem + 0.5vw"}} class="fw-bold mb-2 text-uppercase">Connexion</h2>
                            <p class="text-white-50 mb-2">Entrez vos identifiants</p>
                            <form>
                                <div class="form-outline form-white mb-4">
                                
                                    <label class="form-label">Identifiant</label>
                                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="exemple" style={{fontSize: "calc(0.5rem + 0.5vw"}} class="form-control form-control-lg" />
                                    {blankUsername}
                                    
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <label class="form-label">Mot de passe</label>
                                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"  style={{fontSize: "calc(0.5rem + 0.5vw"}} class="form-control form-control-lg" />
                                    {blankPassword}
                                </div>                        

                                <button class="btn btn-outline-dark btn-lg px-4 px-md-5 px-lg-5" onClick={loginUser} style={{fontSize: "calc(0.7rem + 0.7vw", backgroundColor : "#457eaf"}}>Connexion</button>                        
                            
                            </form>
                            {errorMsg}

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