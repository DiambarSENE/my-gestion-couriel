import { useContext, useEffect, useState } from "react";
import { AppContextDestinateur, AppContextToken } from "./context/contextApp";
import { getAllDestinateurs, getDestinateurById, updateDestinateur } from "./servicesBackEnd/gestion-couriel-api";
import { ValidationName } from "./validateur/validation";
import Modal from 'react-bootstrap/Modal';

function DestinateurUpdate({rowId}){
	const { stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [id, setId] = useState("");
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	const [errorNom, setErrorNom] = useState("");
    // Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);

	const handlerUpdateDestinateur = (e) => {
        e.preventDefault();
		setEnvoyer(true);
		
        const errorNom = ValidationName(nom);
        
        let destinateur = {id, nom,description}

        if( !errorNom ){
            updateDestinateur(destinateur).then(resp => {
                alert("Destinateur modifié avec succès");
                handleClose();
			  
                getAllDestinateurs()
                    .then(response => {
                        setStateDestinateur(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
			.catch(error => {
				console.log(error);
				const errorMessage = error.response && error.response.data && error.response.data.message
                                     ? error.response.data.message
                                     : "Une erreur est survenue";
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
		<a type="button" onClick={handleShow} className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modifier le Destinataire</Modal.Title>
				<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
			</Modal.Header>
				<Modal.Body>
					<form onSubmit={handlerUpdateDestinateur}>
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
							<textarea  rows={4} className="form-control" defaultValue="" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
							</div>
						</div>
						</div>
						<div className="modal-footer">
					<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
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

export default DestinateurUpdate;