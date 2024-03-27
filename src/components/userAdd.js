import React, { useContext, useState } from "react";
import { AppContextUser } from "./context/contextApp";
import { createUsers, getUsers } from "./servicesBackEnd/gestion-couriel-api";
import { ValidationEmail, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "./validateur/validation";
import { Modal } from "react-bootstrap";

function UserAdd(){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {stateUser , setStateUser} = useContext(AppContextUser);


	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [telephone, setTelephone] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [matricule , setMatricule] = useState("");
	const [adresse , setAdresse] = useState("");
	//recupere la valeur de l'identifiant
	//const userId = stateIdUserFromToken;
	//const [userCreate, setUserCreate] = useState(userId);

	const [errorPrenom, setErrorPrenom] = useState("");
	const [errorNom, setErrorNom] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorTelephone, setErrorTelephone] = useState("");
	const [errorRole, setErrorRole] = useState("");
	// Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);

	const handlerAddUser = (e) => {
        e.preventDefault();
		setEnvoyer(true);
		
        const errorPrenom = ValidationPrenom(prenom);
        const errorNom = ValidationName(nom);
        const errorEmail = ValidationEmail(email);
        const errorTelephone = ValidationTelephone(telephone);
        const errorRole = ValidationRole(role);
        
        let utilisateur = {nom, prenom,telephone, email, matricule, adresse, role}
        if(!errorPrenom && !errorNom && !errorEmail && !errorTelephone && !errorRole){
            createUsers(utilisateur).then(resp => {
                alert("Utilisateur crée avec succès");
               handleClose();
				setNom("");
				setPrenom("");
				setTelephone("");
				setEmail("");
				setRole("");
				setMatricule("");
				setAdresse("");
                getUsers()
                    .then(response => {
                        setStateUser(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
			.catch(error => {
				console.error(error);
				const errorMessage = error.response && error.response.data && error.response.data.message
                                     ? error.response.data.message
                                     : "Une erreur est survenue";
				//alert(errorMessage);
				alert(`${error.response.data.message}`)
				setErrorEmail(error.response.data.message);
			})
			.finally(() => {
				setEnvoyer(false);
			});
        }else{
            setErrorPrenom(errorPrenom);
            setErrorNom(errorNom);
            setErrorEmail(errorEmail);
            setErrorTelephone(errorTelephone);
            setErrorRole(errorRole);
			setEnvoyer(false);
        }
      };

	return(
		<>
		 <button type="button" style={{ float: 'right'}}  onClick={handleShow} class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
                                    </span>+ Ajouter utilisateur</button>
	    {/* <Link onClick={handleShow} className="btn btn-primary btn-rounded fs-18" >+ Ajouter utilisateur</Link> */}
	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter Utilisateur</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		       <form onSubmit={handlerAddUser}>
					<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Prénom <span className="text-danger">*</span></label> {errorPrenom && <span style={{color : "red"}}>{errorPrenom}</span>}
						<input className="form-control " type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Nom <span className="text-danger">*</span></label> {errorNom && <span style={{color : "red"}}>{errorNom}</span>}
						<input className="form-control " type="text" value={nom} onChange={(e) => setNom(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Téléphone <span className="text-danger">*</span></label> {errorTelephone && <span style={{color : "red"}}>{errorTelephone}</span>}
						<input className="form-control " type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Email <span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
						<input className="form-control " type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
						</div>
					</div>
				
					<div className="col-sm-6">  
						<div className="form-group">
						<label className="col-form-label">Matricule </label>
						<input type="text" className="form-control "  value={matricule} onChange={(e) => setMatricule(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">  
						<div className="form-group">
						<label className="col-form-label">Adresse </label>
						<input className="form-control " type="text"  value={adresse} onChange={(e) => setAdresse(e.target.value)}/>
						</div>
					</div>
				
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Role <span className="text-danger">*</span></label> {errorRole && <span style={{color : "red"}}>{errorRole}</span>}
						<select className="form-control" onChange={(e) => setRole(e.target.value)}>
						    <option value={""}></option> 
							<option value="Directeur">Directeur</option>
							<option value="Secretaire">Secretaire</option>
						</select>
						</div>
					</div>
					
					
					</div>
					<div className="modal-footer">
				    <button type="button"   onClick={handleClose}   class="btn btn-outline-secondary " > Fermer 
							</button>
					<button type="submit" disabled={envoyer} class="btn btn-outline-primary" > + Enregistrer 
							</button>
				</div>
					
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
		
	
	
  
		</>
	);
}

export default UserAdd;