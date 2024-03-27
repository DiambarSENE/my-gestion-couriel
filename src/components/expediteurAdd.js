import { useContext, useState } from "react";
import { AppContextExpediteur } from "./context/contextApp";
import { createExpediteur, getAllExpediteurs } from "./servicesBackEnd/gestion-couriel-api";

import { ValidationName } from "./validateur/validation";
import { Modal } from "react-bootstrap";

function AddExpediteur(){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { stateExpediteur, setStateExpediteur} = useContext(AppContextExpediteur);

	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	const [errorNom, setErrorNom] = useState("");
    // Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);

	  const handlerAddExpediteur = (e) => {
        e.preventDefault();
		setEnvoyer(true);

        const errorNom = ValidationName(nom);
        
        let expediteur = {nom,description}

        if( !errorNom ){
            createExpediteur(expediteur).then(resp => {
                alert("Expediteur ajouté avec succès");
               handleClose();
			   setNom("");
			   setDescription("");
                getAllExpediteurs()
                    .then(response => {
                        setStateExpediteur(response.data);
                    })
                    .catch(error => {
                       console.log(error);
                    });
            })
			.catch(error => {
				console.log(error);
				const errorMessage = error.response && error.response.data && error.response.data.message
                                     ? error.response.data.message
                                     : "Une erreur est survenue";
				//alert(errorMessage);
			
				 alert(`${error.response.data.message}`);
				 setErrorNom(error.response.data.message);
			})
			.finally(() => {
				setEnvoyer(false);
			});
        }else{
            setErrorNom(errorNom);
			setEnvoyer(false);
        }
      };


    return(
        <>
		
		<button   onClick={handleShow} style={{ float: 'right'}} class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
										  </span>Ajouter un expéditeur</button>
		 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un expéditeur</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		        <form onSubmit={handlerAddExpediteur}>
					<div className="row">
				
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Nom <span className="text-danger">*</span></label>{errorNom && <span style={{color : "red"}}>{errorNom}</span>}
						<input className="form-control" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
						</div>
					</div>
					<div className="col-sm-12">
						<div className="form-group">
						<label className="col-form-label">Description </label>
						<textarea rows={4} className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
						</div>
					</div>
					</div>
					<div className="modal-footer">
				<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
							</button>
					<button type="submit" disabled={envoyer}  class="btn btn-outline-primary"  >Ajouter 
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

export default AddExpediteur;