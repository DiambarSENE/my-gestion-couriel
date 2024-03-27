import React, { useContext, useEffect, useState } from "react";
import { AppContextUser } from "./context/contextApp";
import { deleteUsers, getUserById } from "./servicesBackEnd/gestion-couriel-api";
import { Modal } from "react-bootstrap";

function UserDelete({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {stateUser , setStateUser} = useContext(AppContextUser);

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

	const handleDeleteUser = (e) => {
			e.preventDefault();
		
			deleteUsers(id)
				.then(resp =>{
					const newUsers = stateUser.filter((u) => u.id != id);
					setStateUser(newUsers);
					alert(resp.data);
					{handleClose();}
				} )
				.catch(err => {
				console.log(err)
			});
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
	       <a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	    
		<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Supprimer l'utilisateur</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		<div className="modal-body">Êtes-vous sûr de vouloir supprimer?</div>
				<div className="modal-footer">
				<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
							</button>
					<button type="button"  class="btn btn-outline-danger"  onClick={handleDeleteUser}>Supprimer
							</button>
				</div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
			
	
  
		</>
	);
}

export default UserDelete;