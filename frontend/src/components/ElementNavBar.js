import '../css/Navbar.css';

function ElementNavbar( {href, dataIcon, text, d, className, viewBox}) {
    return (
        <li className="nav-item">
            <a href={href} className="nav-link-main">  
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon={dataIcon} className={className} role="img" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
                    <path fill="currentColor" d={d}></path>
                </svg>
                <span className="link-text">{text}</span>
            </a>                 
        </li>   
    );
  }
  
  export default ElementNavbar;