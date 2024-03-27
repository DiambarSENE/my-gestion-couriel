import { useContext, useEffect, useState } from "react";
import { deleteCourielArriverById, getCourielArriverById} from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie,  AppContextCourielArriverToday,  AppContextExpediteur,  AppContextToken } from "./context/contextApp";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Modal } from "react-bootstrap";




function CourielArriverDelete({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
	

	const [id, setId] = useState("");
	const [dateDarriver, setDateDarriver] = useState("");
	const [dateCorrespondance, setDateCorrespondance] = useState("");
    const [numeroCorrespondance, setNumeroCorrespondance] = useState("");
    const [expediteur, setExpediteur] = useState("");
    const [objet, setObjet] = useState("");
    const [dateReponse, setDateReponse] = useState("");
	const [numeroReponse, setNumeroReponse] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	const [filePdf, setFilePdf] = useState(null);





	const handleDeleteCourielArriver = (e) => {
		e.preventDefault();
	
		deleteCourielArriverById(id)
			.then(resp =>{
				 const newCouriel = stateCourielArriverToday.filter((u) => u.id != id);
				 setStateCourielArriverToday(newCouriel);
				 alert(resp.data);
				 {handleClose();}
			} )
			.catch(err => {
			  console.log(err)
		  });
	 };
    
	 useEffect(() => {
        handleGetCourielArriverById(rowId);
	},[]);

	const handleGetCourielArriverById = (rowId) => {
			getCourielArriverById(rowId).then(resp => {
				 let couriel = resp.data;
				 setId(couriel.id);
				 setDateCorrespondance(couriel.dateCorrespondance);
				 setNumeroCorrespondance(couriel.numeroCorrespondance);
				 setExpediteur(couriel.expediteur);
				 setObjet(couriel.objet);
				 setDateReponse(couriel.dateReponse);
				 setNumeroReponse(couriel.numeroReponse);
			     setFilePdf(couriel.filePdf)
				});

	  };



	const newplugin = defaultLayoutPlugin();
    return(
        <>
	
		{/* Delete couriel Modal */}
		<a className="btn btn-sm btn-danger"  onClick={handleShow}><i className="la la-trash-o"></i></a>
	    
		 <Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Supprimer un courriel d'arrivée</Modal.Title>
					<button type="button" className="close" onClick={handleClose} aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-body">Êtes-vous sûr de vouloir supprimer?</div>
						<div className="modal-footer">
						<button onClick={handleClose} type="button" class="btn  btn-outline-secondary">Fermer 
									</button>
							<button type="button"  class=" btn btn-outline-danger" onClick={handleDeleteCourielArriver}>Supprimer 
									</button>
						</div>
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
        </Modal>
		
        </>
    );
}

export default CourielArriverDelete;