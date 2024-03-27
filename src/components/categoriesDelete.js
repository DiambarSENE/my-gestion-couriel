import { useContext, useEffect, useState } from "react";
import { AppContextCategorie } from "./context/contextApp";
import { deleteCategoryById, getCategoryById } from "./servicesBackEnd/gestion-couriel-api";
import { Modal } from "react-bootstrap";

function CategorieDelete({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { stateCategorie, setStateCategorie} = useContext(AppContextCategorie);
	const [id, setId] = useState("");
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	
	  const handleDeleteUser = (e) => {
		e.preventDefault();
		deleteCategoryById(id)
			.then(resp =>{
				 const newCat = stateCategorie.filter((u) => u.id != id);
				 setStateCategorie(newCat);
				 alert(resp.data);
				 handleClose();
			} )
			.catch(err => {
			  console.log(err)
		  });
	 };

	 useEffect(() => {
        handleGetCategorieById(rowId);
	 },[]);

	const handleGetCategorieById = (rowId) => {
			getCategoryById(rowId).then(resp => {
				 let categorie = resp.data;
				 setId(categorie.id);
				 setNom(categorie.nom);
				 setDescription(categorie.description);
			});

	  };

    return(
        <>

		 <a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Supprimer ce categorie</Modal.Title>
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

export default CategorieDelete;