import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar.js';


function Bootstrap() {

    const div = [];

    for (let i=1 ; i<16 ; i++){
        div.push(
            <div className="col-8 col-md-5 col-lg-3  offset-2 p-3 mb-4 mt-4">
                <div className="bg-danger">Colonne {i}</div>
            </div>
        )
    }

    return (
        
            <div>
            <Navbar/>
                <div className="row justify-content-center">
                    {div}
                </div>                
            </div>        
        
    )
}

export default Bootstrap