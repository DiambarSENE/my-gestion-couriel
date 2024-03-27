import { useContext, useEffect, useState } from "react";
import { AppContextCategorie } from "./context/contextApp";
import {  getAllCategorys, getCategoryById, updateCategory } from "./servicesBackEnd/gestion-couriel-api";
import { ValidationName } from "./validateur/validation";
import { Modal } from "react-bootstrap";

function CategorieUpdate({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { stateCategorie, setStateCategorie} = useContext(AppContextCategorie);
	const [id, setId] = useState("");
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	const [errorNom, setErrorNom] = useState("");
	// Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);


	  const handlerUpdateCategorie = (e) => {
        e.preventDefault();
		// Désactive le bouton pour éviter les clics multiples
		setEnvoyer(true);
        const errorNom = ValidationName(nom);
        
        let categorie = {id, nom,description}

        if( !errorNom ){
            updateCategory(categorie).then(resp => {
                alert("Catégorie modifiée avec succès");
                handleClose();
                getAllCategorys()
                    .then(response => {
                        setStateCategorie(response.data);
                    })
                    .catch(error => {
                        console.error(error)
                    });
            })
			.catch(error => {
				const errorMessage = error.response && error.response.data && error.response.data.message
                                     ? error.response.data.message
                                     : "Une erreur est survenue lors de la modification de la catégorie.";
                alert(errorMessage);
                
			})
			.finally(() => {
				setEnvoyer(false);
			});
        }else{
            setErrorNom(errorNom);
			setEnvoyer(false);
        }
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
		
<       a type="button" className="btn btn-sm btn-primary" onClick={handleShow}><i className="la la-pencil"></i></a>
	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modifier Catégorie</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		       <form onSubmit={handlerUpdateCategorie}>
					<div className="row">
				
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Nom  <span className="text-danger">*</span></label>
						<input className="form-control" defaultValue="" type="text" value={nom} onChange={(e) => setNom(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Description <span className="text-danger">*</span></label>
						<textarea rows={4}  className="form-control" defaultValue="" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
						</div>
					</div>
					</div>
					<div className="modal-footer">
				<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
							</button>
					<button type="submit" disabled={envoyer}  class="btn btn-outline-primary" >Modifier </button>
				</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>

        </>
    );
}

export default CategorieUpdate;