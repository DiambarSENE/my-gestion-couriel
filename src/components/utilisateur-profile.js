import { Link } from "react-router-dom";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import { AppContextMenuToggle, AppContextToken, AppContextUserEmail } from "./context/contextApp";
import { getUserByEmail, updatePassword, updateUser } from "./servicesBackEnd/gestion-couriel-api";
import { useContext, useEffect, useState } from "react";
import Connexion from "./connexion";
import { Modal } from "react-bootstrap";
import { ValidationNewPassword, ValidationPassword, ValidationRepeteNewPassword } from "./validateur/validation";

function Profile() {
    const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    const {stateToken, setStateToken} = useContext(AppContextToken);
    const {stateUserEmail, setStateUserEmail} = useContext(AppContextUserEmail);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


    const [id, setId] = useState();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [matricule , setMatricule] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [adresse, setAdresse] = useState("");
    const [password, setPassword] = useState("");
    const [photoProfil, setPhotoProfil] = useState("");
    const [emailConnexion, setEmailConnexion] = useState("");
    const [file, setFile] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [repeteNewPassword, setRepeteNewPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorRepeteNewPassword, setRepeteErrorNewPassword] = useState("");
    

    const handlerUpdatePass = (e) => {
        e.preventDefault();
        const errorPassword = ValidationPassword(password);
        const errorNewPassword = ValidationNewPassword(newPassword);
        const errorRepeteNewPassword = ValidationRepeteNewPassword(repeteNewPassword);
        if(!errorPassword && !errorNewPassword && !errorRepeteNewPassword){
            if(password){
                if(newPassword === repeteNewPassword){
                    updatePassword(email, password,  newPassword).then(resp =>{
                        alert("Mot de passe modifier avec succes")
                        {handleClose();}
                })
                }else{
                    setRepeteErrorNewPassword("vos mot de pas doit etre identique")
                }
                
            }else{
                setErrorPassword("Entrez votre mot de passe")
            }
        }else{
            setErrorPassword(errorPassword);
            setErrorNewPassword(errorNewPassword);
            setRepeteErrorNewPassword(errorRepeteNewPassword);
        }    
    };

    useEffect(() => {
        
        findUserByEmail(stateUserEmail)
        
    }, [stateUserEmail]);

    const findUserByEmail = (email) => {
        getUserByEmail(email)
            .then(response => {
                let user = response.data;
            //setStateUserByEmail(response.data)
            setId(user.id)
            setNom(user.nom);
            setPrenom(user.prenom);
            setTelephone(user.telephone);
            setMatricule(user.matricule);
            setRole(user.role);
            setEmail(user.email);
            setAdresse(user.adresse);
            setPhotoProfil(user.photoProfil);
        })
        .catch(err =>{
            console.error(err);
        })
    };

    const handlerUpdateUser = (e) => {
        e.preventDefault();
        let user = { id, prenom, nom, telephone,role, matricule, email, adresse};

        updateUser(user)
            .then(resp =>{
              // {handleClose();}
            // getUsers()
            //      .then( resp => {
            //        setStateUtilisateur(resp.data);
            // }) 
            alert("utilisatur modifier avec success")
            
            } )
         .catch(err => {
          console.log(err)
      });
    };


    return(
        <div id="main-wrapper"  className={`show ${isMenuToggle ? 'menu-toggle' : ''}` }>
         { 
		 !stateToken || stateToken == "null" ? (
		   <Connexion />
		   ) : (
		   <>
         <Header/>
		<Sidebar/>
   
        <div className="content-body">
       
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                <div className="col-sm-6 p-md-0">
                    <div className="welcome-text">
                    <h4>Profile</h4>
                    </div>
                </div>
                <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"} >Home</Link></li>
                    <li className="breadcrumb-item active"><a >Profile</a></li>
                    </ol>
                </div>
                </div>
                <div className="row">
                <div className="col-xl-3 col-xxl-4 col-lg-4">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                        <div className="text-center p-3 overlay-box" style={{backgroundImage: 'url(images/big/img1.jpg)'}}>
                            <div className="profile-photo">
                              <img src="images/logoProfile.png" width={100} className="img-fluid rounded-circle" alt />
                            </div>
                            <h3 className="mt-3 mb-1 text-white">{prenom} {nom}</h3>
                            <p className="text-white mb-0">{role}</p>
                        </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="mb-0">Cliquez ici si vous souhaitez modifier votre mot de passe</span>
                         </li>
                    </ul>
                    <div class="card-footer text-center border-0 mt-0">				
                        <a class="btn btn-dark btn-rounded px-8" onClick={handleShow}>Modifier mot de passe</a>
                    </div>
                        </div>
                        
                    </div>
                   
                   
                    </div>
                </div>
                <div className="col-xl-9 col-xxl-8 col-lg-8">
                    <div className="card">
                    <div className="card-body">
                        <div className="profile-tab">
                        <div className="custom-tab-1">
                            <ul className="nav nav-tabs">
                            <li className="nav-item"><a href="#about-me" data-toggle="tab" className="nav-link active show">Information personal</a></li>
                            <li class="nav-item"><a href="#my-posts" data-toggle="tab" class="nav-link">Modifier profile</a></li>

                            </ul>
                            <div className="tab-content">
                            <div id="about-me" className="tab-pane fade active show">
                            
                                <div className="profile-skills pt-2 border-bottom-1 pb-2">
                                <h4 className="text-primary mb-4">Role</h4>
                                <a href="#" className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10">{role}</a>
                                     </div>
                               
                                <div className="profile-personal-info">
                                <h4 className="text-primary mb-4">Information Personel</h4>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Prenom <span className="pull-right">:</span>
                                    </h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{prenom}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Nom <span className="pull-right">:</span>
                                    </h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{nom}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Telephone <span className="pull-right">:</span>
                                    </h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{telephone}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Email <span className="pull-right">:</span>
                                    </h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{email}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Matricule <span className="pull-right">:</span></h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{matricule}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <h5 className="f-w-500">Adresse <span className="pull-right">:</span>
                                    </h5>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>{adresse}</span>
                                    </div>
                                </div>
                               
                                </div>
                            </div>
                             <div id="my-posts" className="tab-pane fade">
                              <form onSubmit={handlerUpdateUser}>
                                    <div className="row">
                                    <input className="form-control"  type="hidden"  value={id} onChange={(e) => setId(e.target.value)}/>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <label className="col-form-label">Prénom<span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                                        <input className="form-control form-control-lg"  type="text"  value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <label className="col-form-label">Nom <span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                                        <input className="form-control form-control-lg"  type="text"  value={nom} onChange={(e) => setNom(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <label className="col-form-label">Téléphone<span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                                        <input className="form-control form-control-lg"  type="number"  value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <label className="col-form-label">Email<span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
                                        <input className="form-control form-control-lg" type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-6">  
                                        <div className="form-group">
                                        <label className="col-form-label">Matricule </label>
                                        <input type="text" className="form-control form-control-lg"  value={matricule} onChange={(e) => setMatricule(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">  
                                        <div className="form-group">
                                        <label className="col-form-label">Adresse </label>
                                        <input className="form-control form-control-lg" type="text"  value={adresse} onChange={(e) => setAdresse(e.target.value)}/></div>
                                        
                                    </div>
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                        <label className="col-form-label">Role</label>
                                        <select class="form-control form-control-lg" value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value={role}>{role}</option>
                                 
                                            <option value="Directeur">Directeur</option>
                                            <option value="Secretaire" selected>Secretaire</option>
                                            
                                        </select>
                                        </div>
                                    </div>
{/*                                     
                                    <div className="col-sm-6" hidden>  
                                        <div className="form-group">
                                        <label className="col-form-label">Mot de passe </label>
                                        <input className="form-control form-control-lg" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                                        
                                    </div> */}
                                        </div>
                                    
                                        <div className="modal-footer">
                                       
                                        <button type="submit"  class="btn btn-outline-primary" > Modifier profile
                                                </button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                

                </div>
            </div>
            </div>
           

            
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier mon mot de passe</Modal.Title>
                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handlerUpdatePass}>
					<div className="row">
                    <input className="form-control" type="hidden" value={email} onChange={(e) => setEmail(e.target.value)} />
						
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Votre mot de passe<span className="text-danger">*</span></label> {errorPassword && <span style={{color : "red"}}>{errorPassword}</span>}
						<input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
					</div>
                    <div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Nouveau mot de passe<span className="text-danger">*</span></label> {errorNewPassword && <span style={{color : "red"}}>{errorNewPassword}</span>}
						<input className="form-control" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Repetez le nouveau mot de passe<span className="text-danger">*</span></label> {errorRepeteNewPassword && <span style={{color : "red"}}>{errorRepeteNewPassword}</span>}
						<input className="form-control" type="password" value={repeteNewPassword} onChange={(e) => setRepeteNewPassword(e.target.value)} />
						</div>
					</div>
					</div>
					<div className="modal-footer">
                        <button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
                                    </button>
                            <button type="submit"  class="btn btn-outline-primary"  >Modifier 
                                    </button>
				</div>
				</form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>

         {/* <Footer/>  */}
		</>
		)
		}


      </div>
    );
}
export default Profile;