import { Link, useNavigate } from "react-router-dom";
import { deleteToken } from "../servicesBackEnd/gestion-couriel-api";
import { AppContextCourielArriverToday, AppContextCourielDepartToday, AppContextMenuToggle, AppContextUserEmail, useAppStateUserEmail } from "../context/contextApp";
import { useContext, useState } from "react";

function Header(){
    const navigate = useNavigate();
    const {stateUserEmail, setStateUserEmail} = useContext(AppContextUserEmail);

    const {stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
    const {stateCourielDepartToday, setStateCourielDepartToday} = useContext(AppContextCourielDepartToday);
    
    const nombreCourrielsArriverStatusFalse = stateCourielArriverToday.filter(couriel => couriel.verifier === false).length;
    const nombreCourrielsDepartStatusFalse = stateCourielDepartToday.filter(couriel => couriel.verifier === false).length;
    
    const somme = nombreCourrielsArriverStatusFalse + nombreCourrielsDepartStatusFalse;

    const deconnexion = () => {
        deleteToken();
        navigate("/");
    };

  const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


  const toggleMenu = () => {
    setIsMenuToggle(!isMenuToggle);
  };

    return(
        <>
     
          <div className="nav-header">
            <a  className="brand-logo">
              <img className="logo-abbr" src="images/logoRegionmedical.jpg" alt="logo" />
           
            </a>
            <div className="nav-control" onClick={toggleMenu}>
              <div className={`hamburger ${isMenuToggle ? 'is-active' : ''}`}>
                <span className="line" /><span className="line" /><span className="line" />
              </div>
            </div>
          </div>
          <div className="header">
            <div className="header-content">
              <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse justify-content-between">
                  <div className="header-left">
                    <div className="search_bar dropdown">             
                    </div>
                    <marquee scrollamount={50} scrolldelay={2000}>
                        <ul className="l-top" style={{color: 'white'}}>
                            <li><i/> REGION MEDICALE DE ZIGUINCHOR</li>
                        </ul>
                    </marquee>
                  </div>
                  <ul className="navbar-nav header-right">
                    <li className="nav-item dropdown notification_dropdown" style={{color: 'white'}}>
                    { stateUserEmail } 
                      <a className="nav-link bell ai-icon" href="#" role="button" data-toggle="dropdown">
                        <svg id="icon-user" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          
                        </svg>
                      
                        <div className="pulse-css" />
                        <span className="badge badge-circle badge-danger">{somme}</span>
                      </a>
                      
                    </li>
                    
                    <li className="nav-item dropdown header-profile">
                      <a className="nav-link"  role="button" data-toggle="dropdown">
                        <img src="images/logoProfile.png" width={20} alt="profile" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link to={"/utilisateur-profile"} className="dropdown-item ai-icon">
                          <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                          <span   className="ml-2">Profile</span>
                        </Link>
                        <Link to={"/"} className="dropdown-item ai-icon">
                          <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                          <span  onClick={ deconnexion } className="ml-2">Déconnexion </span>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>



              

        </>
    );
}

export default Header;