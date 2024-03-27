import React, { useContext, useEffect, useState } from "react";
import { AppContextToken, AppContextUser } from "./context/contextApp";
import { getUserById, getUsers, updateUser } from "./servicesBackEnd/gestion-couriel-api";
import { ValidationEmail, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "./validateur/validation";
import { Modal } from "react-bootstrap";

function UserUpdate({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {stateToken, setStateToken} = useContext(AppContextToken);
	const {stateUser , setStateUser} = useContext(AppContextUser);
	const [currentUserId, setCurrentUserId] = useState(null);

	const [id, setId] = useState("");
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

	const handleUpdateUser = (e) => {
	   e.preventDefault();
	   setEnvoyer(true);
	//    const id = currentUserId;
	   //const userCreate = stateIdUserFromToken;
	   const errorPrenom = ValidationPrenom(prenom);
	   const errorNom = ValidationName(nom);
	   const errorEmail = ValidationEmail(email);
	   const errorTelephone = ValidationTelephone(telephone);
	   const errorRole = ValidationRole(role);
	  
	   if(!errorPrenom && !errorNom && !errorEmail && !errorTelephone && !errorRole){
		   let user = {id, prenom, nom, telephone, matricule, email, role, adresse };
			updateUser(user).then(resp =>{
					handleClose();
					getUsers()
						.then( resp => {
							setStateUser(resp.data);
					}) 
					alert("Utilisateur modifié avec succès")
					
				} )
				.catch(error => {
					console.error(error);
					const errorMessage = error.response && error.response.data && error.response.data.message
										 ? error.response.data.message
										 : "Une erreur est survenue";
					alert(errorMessage);
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

	useEffect( () => {
		handleGetUserById(rowId);
		},[])
	const handleGetUserById = (rowId) => {
			getUserById(rowId).then(resp => {
				let user = resp.data;
				setId(user.id);
				setPrenom(user.prenom);
				setNom(user.nom);
				setTelephone(user.telephone);
				setMatricule(user.matricule);
				setEmail(user.email);
				setAdresse(user.adresse);
				setRole(user.role);
			});
		
	};
	

	return(
		<>

		<a type="button" className="btn btn-sm btn-primary" onClick={handleShow} ><i className="la la-pencil"></i></a>
		<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modifier Utilisateur</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>

				<form onSubmit={handleUpdateUser}>
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
						<select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
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
					<button type="submit" disabled={envoyer}  class="btn btn-outline-primary" >Modifier 
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

export default UserUpdate;