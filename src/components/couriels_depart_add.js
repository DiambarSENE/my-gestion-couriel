import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import { createCourielDepart, deleteCourielDepartById, getAllCourrielsDepartNotToday, getAllCourrielsDepartToday, getCourielDepartById, updateCourielDepart } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie, AppContextCourielDepartNotToday,  AppContextCourielDepartToday,  AppContextDestinateur,  AppContextRoleName,  AppContextToken } from "./context/contextApp";
import { ValidationDateDepart, ValidationDestinataire, ValidationNombreDePiece, ValidationObjet, ValidationeFilePdf, ValidationrNumeroOrdre } from "./validateur/validation";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Connexion from "./connexion";
import { Link } from "react-router-dom";
import Footer from "./templates/footer";
import Preloader from "./templates/preloader";
import { Modal } from "react-bootstrap";




function AddCourielDepart(){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
	const {stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);
	const { stateCourielDepartToday, setStateCourielDepartToday} = useContext(AppContextCourielDepartToday);
	
	const [numeroDordre, setNumeroDordre] = useState("");
    const [nombreDePieces, setNombreDePieces] = useState("");
    const [dateDuDepart, setDateDuDepart] = useState("");
    const [destinataire, setDestinataire] = useState("");
	const [objet, setObjet] = useState("");
	const [numeroArChive, setNumeroArChive] = useState(0);
	const [observations, setObservations] = useState("");
	const [verifier, setVerifier] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	const [categorieNom, setCategorieNom] = useState();
	const [filePdf, setFilePdf] = useState(null);
	const [ file, setFile] = useState(null);
	const [ viewFile, setViewFile] = useState(null);
	
    const [errorDestinataire, setErrorDestinataire] = useState("");
	const [errorNumeroOrdre, setErrorNumeroOrdre] = useState("");
	const [errorNombreDePiece, setErrorNombreDePieces] = useState("");
	const [errorObjet, setErrorObjet] = useState("");
	const [errorDateDepart, setErrorDateDepart] = useState("");
	const [errorFilePdf, setErrorFilePdf] = useState("");

	// Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);

	

	const handlerAddCourielDepart = (e) => {
		
        e.preventDefault();
		setEnvoyer(true);

		const fd = new FormData();
		fd.append('numeroDordre', numeroDordre);
		fd.append('nombreDePieces', nombreDePieces);
		fd.append('dateDuDepart', dateDuDepart);
		fd.append('destinataire', destinataire);
		fd.append('objet', objet);
		fd.append('numeroArChive', numeroArChive);
		fd.append('observations', observations);
		fd.append('file', file);
		
		if(stateRoleName === "Directeur"){
			fd.append('verifier', 1);
		}else{
			fd.append('verifier', 0);
		}

		
		const errorNumeroOrdre = ValidationrNumeroOrdre(numeroDordre);
        const errorNombreDePiece = ValidationNombreDePiece(nombreDePieces);
        const errorDateDepart = ValidationDateDepart(dateDuDepart);
	    const errorObjet = ValidationObjet(objet);
        const errorDestinataire = ValidationDestinataire(destinataire);
		const errorFilePdf = ValidationeFilePdf(file);
       // let couriel = {nom, description,typeCouriel, categorie}

        if(!errorDestinataire && !errorNombreDePiece && !errorNumeroOrdre && !errorObjet && !errorDateDepart && !errorFilePdf){
			createCourielDepart(fd, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}).then(resp => {
                alert("Couriel départ ajouté  avec succès");
				setNumeroDordre(" ");
				setNombreDePieces(" ");
				setDateDuDepart(" ");
				setDestinataire(" ");
				setObjet(" ");
				setNumeroArChive(" ");
				setObservations(" ");
				setFile("")

                handleClose();
			   getAllCourrielsDepartToday()
			        .then(response => {
						setStateCourielDepartToday(response.data);
					})
					.catch( error => {
						console.log(error)
					});
               
            })
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
            setErrorDestinataire(errorDestinataire);
			setErrorNombreDePieces(errorNombreDePiece);
			setErrorNumeroOrdre(errorNumeroOrdre);
			setErrorObjet(errorObjet);
			setErrorDateDepart(errorDateDepart);
			setErrorFilePdf(errorFilePdf);
			setEnvoyer(false);
        }
      };

    return(
        <>

		{/* Add couriel depart Modal */}
		

		<button   onClick={handleShow} style={{ float: 'right'}} class="btn btn-rounded btn-primary">
			<span class="btn-icon-left text-primary">
				<i class="fa fa-plus color-info"></i>
			</span>Ajouter un courriel de départ</button>
	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un courriel de départ</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		       <form onSubmit={handlerAddCourielDepart}>
					<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Numero d'ordre: <span className="text-danger">*</span></label>{errorNumeroOrdre && <span style={{color : "red"}}>{errorNumeroOrdre}</span>}
						<input min={0} className="form-control " type="number" value={numeroDordre} onChange={(e) => setNumeroDordre(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Nombre de pieces: <span className="text-danger">*</span></label>{errorNombreDePiece && <span style={{color : "red"}}>{errorNombreDePiece}</span>}
						<input min={0} value={nombreDePieces} type="number" onChange={(e) => setNombreDePieces(e.target.value)}  className="form-control "  />
					</div>
					</div>
					
					
					 <div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Date depart: <span className="text-danger">*</span></label>{errorDateDepart && <span style={{color : "red"}}>{errorDateDepart}</span>}
						<input value={dateDuDepart} type="date" onChange={(e) => setDateDuDepart(e.target.value)}  className="form-control "  />
					</div>
					</div> 
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Destinataire: <span className="text-danger">*</span></label>{errorDestinataire && <span style={{color : "red"}}>{errorDestinataire}</span>}
						{/* <input value={destinataire} type="test" onChange={(e) => setDestinataire(e.target.value)} className="form-control "  /> */}
					    <select className="form-control "  value={destinataire} type="test" onChange={(e) => setDestinataire(e.target.value)}>
						   <option value={""}></option>
						   {
							stateDestinateur.map(stateDestinateur => 
								<option key={stateDestinateur.id} value={stateDestinateur.nom}>{stateDestinateur.nom}</option>
								)
						   }
						   
							
						</select>
					</div>
					</div>
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Objet: <span className="text-danger">*</span></label>{errorObjet && <span style={{color : "red"}}>{errorObjet}</span>}
						<textarea value={objet} type="test" onChange={(e) => setObjet(e.target.value)} rows={4} placeholder="Entrer l'objet du couriel" defaultValue={""}  className="form-control "  />
					</div>
					</div>
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Numero archive</label>
						<input min={0} value={numeroArChive} type="number" onChange={(e) => setNumeroArChive(e.target.value)} className="form-control "  />
					</div>
					</div>
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Observations</label>

						<textarea value={observations} type="test" onChange={(e) => setObservations(e.target.value)} rows={4} placeholder="Entrer l'objet du couriel" defaultValue={""}  className="form-control "  />
					</div>
					</div>
					<div className="col-md-12">
					<div className="form-group">
						<label className="col-form-label">Choisir un fichier: <span className="text-danger">*</span></label>{errorFilePdf && <span style={{color : "red"}}>{errorFilePdf}</span>}
						<input className="form-control " type="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
					</div>
				

					</div>
					
					<div className="modal-footer">
						<button onClick={handleClose} type="button" class="btn btn-outline-primary">Fermer 
									</button>
						<button type="submit" disabled={envoyer}  class="btn  btn-outline-primary">+ Ajouter 
								</button>
					</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
		
		{/* /Add couriel depart Modal */}

        </>
    );
}

export default AddCourielDepart;