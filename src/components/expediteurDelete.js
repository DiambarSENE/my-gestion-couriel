import { useContext, useEffect, useState } from "react";
import { AppContextExpediteur } from "./context/contextApp";
import { deleteExpediteurById, getExpediteurById } from "./servicesBackEnd/gestion-couriel-api";
import { Modal } from "react-bootstrap";

function ExpediteurDelete({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { stateExpediteur, setStateExpediteur} = useContext(AppContextExpediteur);

	const [id, setId] = useState("");
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	  const handleDeleteUser = (e) => {
		e.preventDefault();
	
		deleteExpediteurById(id)
			.then(resp =>{
				 const newExp = stateExpediteur.filter((u) => u.id != id);
				 setStateExpediteur(newExp);
				 alert(resp.data);
				 handleClose();
			} )
			.catch(err => {
			  console.log(err)
		  });
	 };

	 useEffect( () => {
        handleGetExpediteurById(rowId);
	  },[])

	const handleGetExpediteurById = (rowId) => {
			getExpediteurById(rowId).then(resp => {
				 let expediteur = resp.data;
				 setId(expediteur.id);
				 setNom(expediteur.nom);
				 setDescription(expediteur.description);
			});

	  };


    return(
        <>

        <a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	    
		 <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
            <Modal.Title>Supprimer un expéditeur</Modal.Title>
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

export default ExpediteurDelete;