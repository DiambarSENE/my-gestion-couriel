import { useContext, useEffect, useState } from "react";
import { AppContextDestinateur, AppContextToken } from "./context/contextApp";
import {  deleteDestinateurById, getDestinateurById } from "./servicesBackEnd/gestion-couriel-api";
import Modal from 'react-bootstrap/Modal';


function DestinateurDelete({rowId}){
	const {stateToken, setStateToken} = useContext(AppContextToken);

	const { stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [id, setId] = useState("");
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");



	  const handleDeleteUser = (e) => {
		e.preventDefault();
	
		deleteDestinateurById(id)
			.then(resp =>{
				 const newDes = stateDestinateur.filter((u) => u.id != id);
				 setStateDestinateur(newDes);
				 alert(resp.data);
				 handleClose();
			} )
			.catch(err => {
			  console.log(err)
		  });
	 };

	useEffect(() =>{
		handleGetDestinateurById(rowId);
   },[]);

	const handleGetDestinateurById = (rowId) => {
	getDestinateurById(rowId).then(resp => {
			let destinateur = resp.data;
			setId(destinateur.id);
			setNom(destinateur.nom);
			setDescription(destinateur.description);
	});

  };  

	
    return(
        <>
	<a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	    
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Supprimsser destinataire</Modal.Title>
				<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
			</Modal.Header>
				<Modal.Body>
			
				<div className="modal-body">Êtes-vous sûr de vouloir supprimer?</div>
					<div className="modal-footer">
					<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
								</button>
						<button type="button"  class="btn btn-outline-danger"  onClick={handleDeleteUser}>Supprimer </button>
					</div>
				
				</Modal.Body>
	
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DestinateurDelete;