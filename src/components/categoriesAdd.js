import { useContext, useState } from "react";
import { AppContextCategorie } from "./context/contextApp";
import { createCategory, getAllCategorys} from "./servicesBackEnd/gestion-couriel-api";
import { ValidationName } from "./validateur/validation";
import { Modal } from "react-bootstrap";

function AddCategorie(){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { stateCategorie, setStateCategorie} = useContext(AppContextCategorie);

	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	const [errorNom, setErrorNom] = useState("");
	// Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);


	  const handlerAddCategorie = (e) => {
        e.preventDefault();
		// Désactive le bouton pour éviter les clics multiples
		setEnvoyer(true);
        const errorNom = ValidationName(nom);
        
        let categorie = {nom,description}

        if( !errorNom ){
            createCategory(categorie).then(resp => {
                alert("Catégorie ajoutée avec succès");
               handleClose();
			   setNom("");
			   setDescription("");
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
                                     : "Une erreur est survenue";
				//alert(errorMessage);
				
				alert(`${error.response.data.message}`);
				setErrorNom(error.response.data.message);
			})
			.finally(() => {
				// Réactive le bouton en réinitialisant l'envoie à false, que la promesse soit résolue ou rejetée
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
										  </span>Ajouter Catégorie</button>

	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter Catégorie</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		<form onSubmit={handlerAddCategorie}>
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
						<textarea rows={4}  className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
						</div>
					</div>
					</div>
					<div className="modal-footer">
				<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer
							</button>
					<button type="submit" disabled={envoyer} class="btn btn-outline-primary"  >+ Ajouter </button>
				</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>

		
	
        </>
    );
}

export default AddCategorie;