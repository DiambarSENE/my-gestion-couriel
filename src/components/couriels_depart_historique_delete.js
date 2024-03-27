import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import { createCourielDepart, deleteCourielDepartById, getAllCourielsDepart, getAllCourrielsDepartToday, getCourielDepartById,  updateCourielDepart } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie,  AppContextCourielDepartNotToday,  AppContextCourielDepartToday, AppContextDestinateur, AppContextToken } from "./context/contextApp";
import { ValidationDestinataire, ValidationNombreDePieces, ValidationNumeroOrdre, ValidationObjet } from "./validateur/validation";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Connexion from "./connexion";
import { Link } from "react-router-dom";
import Footer from "./templates/footer";
import Preloader from "./templates/preloader";
import AddCourielDepart from "./couriels_depart_add";
import { Modal } from "react-bootstrap";




function CourielDepartHistoriqueDelete({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {stateToken, setStateToken} = useContext(AppContextToken);
	const { stateCourielDepartNotToday, setStateCourielDepartNotToday} = useContext(AppContextCourielDepartNotToday);
	const { stateCategorie, setStateCategorie} = useContext(AppContextCategorie);
	const {stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);


	const [id, setId] = useState("");
	const [numeroDordre, setNumeroDordre] = useState("");
    const [nombreDePieces, setNombreDePieces] = useState("");
    const [dateDuDepart, setDateDuDepart] = useState("");
    const [destinataire, setDestinataire] = useState("");
	const [objet, setObjet] = useState("");
	const [numeroArChive, setNumeroArChive] = useState("");
	const [observations, setObservations] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	
	const [categorieNom, setCategorieNom] = useState();
	const [filePdf, setFilePdf] = useState(null);
	const [ file, setFile] = useState(null);
	const [ viewFile, setViewFile] = useState(null);
	
    const [errorDestinataire, setErrorDestinataire] = useState("");
	const [errorNumeroOrdre, setErrorNumeroOrdre] = useState("");
	const [errorNombreDePiece, setErrorNombreDePieces] = useState("");
	const [errorObjet, setErrorObjet] = useState("");


	const handleDeleteCourielDepart = (e) => {
		e.preventDefault();
	
		deleteCourielDepartById(id)
			.then(resp =>{
				 const newCourielDepart = stateCourielDepartNotToday.filter((u) => u.id != id);
				 setStateCourielDepartNotToday(newCourielDepart);
				 alert(resp.data);
				 
				 {handleClose();}
			} )
			.catch(err => {
			  console.log(err)
		  });
	 };

	 useEffect(() => {
		handleGetCourielDepartById(rowId)
	},[]);

	const handleGetCourielDepartById = (courielId) => {
			getCourielDepartById(courielId).then(resp => {
				 let couriel = resp.data;
				 setId(couriel.id);
				 setNumeroDordre(couriel.numeroDordre);
				 setNombreDePieces(couriel.nombreDePieces);
				 setDateDuDepart(couriel.dateDuDepart);
				 setDestinataire(couriel.destinataire);
				 setObjet(couriel.objet);
				 setNumeroArChive(couriel.numeroArChive);
				 setObservations(couriel.observations);
			     setFilePdf(couriel.filePdf)
				});

	  };


    return(
        <>
		
	
		{/* Delete couriel depart Modal */}
						
		<a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	    
	     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Supprimer couriel depart</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		     <div className="modal-body">Êtes-vous sûr de vouloir supprimer?</div>
				<div className="modal-footer">
				<button data-dismiss="modal" type="button" class="btn  btn-outline-secondary">Fermer 
							</button>
					<button type="button" onClick={handleDeleteCourielDepart}  class="btn  btn-outline-danger">Supprimer
							</button>
				</div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
		
		{/* /Delete couriel depart Modal */}

		
        </>
    );
}

export default CourielDepartHistoriqueDelete;