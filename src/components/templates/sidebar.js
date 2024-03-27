import { Link } from "react-router-dom";
import { AppContextRoleName } from "../context/contextApp";
import { useContext } from "react";
import Footer from "./footer";


function Sidebar(){
  const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
  
    return(
        <>
            <div className="dlabnav">
              <div className="dlabnav-scroll">
                <ul className="metismenu" id="menu">
                  <li>
                      <Link to={"/home"} aria-expanded="false">
                      <i className="la la-home"></i>
                      <span className="nav-text">Accueil</span>
                    </Link>
                  </li>

                  <li><a className="has-arrow"  aria-expanded="false">
                      <i className="la la-book" />
                      <span className="nav-text">Couriels</span>
                    </a>
                    <ul aria-expanded="false">
                    
                      <li><Link to={"/couriels_a_j"} >Arriver</Link></li>
                      <li><Link to={"/couriels_d_j"}>Depart</Link></li>
                    </ul>
                  </li>
                  <li><a className="has-arrow" aria-expanded="false">
                      <i className="la la-building" />
                      <span className="nav-text">Historiques</span>
                    </a>
                    <ul aria-expanded="false">
                      <li><Link to={"/couriels_a_h"} >Arriver</Link></li>
                      <li><Link to={"/couriels_d_h"}>Depart</Link></li>
                    </ul>
                  </li>
                  { 
                    !stateRoleName || stateRoleName == "Directeur" ? (
                      <> 
                  <li>
                      <Link to={"/userList"} aria-expanded="false">
                      <i className="la la-users"></i>
                      <span className="nav-text">Utilisateurs</span>
                    </Link>
                  </li>
                  
                    <li>
                        
                      <a className="has-arrow" aria-expanded="false" >
                      <i className="la la-plus-square-o"></i>
                      <span className="nav-text">Parametres</span>
                      </a>
                          <ul aria-expanded="false">
                              <li><Link to={"/expediteur"}>Gestion expediteur</Link></li>
                              <li><Link to={"/destinateur"}>Gestion Destinataire</Link></li>
                             
                              <li><Link to={"/Categories"}>Gestion Categorie</Link></li>
                          </ul>
                         
                      </li>

                      
                  
                      </>) : ""
                    
                  }

              
                </ul>
              
                <div className="sidebar-footer">
                    <span  style={{ color: 'white' }}>© Yaatout SARL 2024, tous droits réservés</span>
                </div>
               
              </div>
          
            </div>
        </>
    );
}
export default Sidebar;