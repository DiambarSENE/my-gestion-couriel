import { useContext, useEffect, useState } from "react";
import {  getAllCourrielsDepartToday, getCourielDepartById,  updateCourielDepart } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie,  AppContextCourielDepartToday, AppContextDestinateur, AppContextRoleName, AppContextToken } from "./context/contextApp";
import { ValidationDateDepart, ValidationDestinataire, ValidationNombreDePiece, ValidationObjet, ValidationeFilePdf, ValidationrNumeroOrdre } from "./validateur/validation";

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Modal } from "react-bootstrap";




function CourielDepartUpdate({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
	const { stateCourielDepartToday, setStateCourielDepartToday} = useContext(AppContextCourielDepartToday);
	const {stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);


	const [id, setId] = useState("");
	const [numeroDordre, setNumeroDordre] = useState(0);
    const [nombreDePieces, setNombreDePieces] = useState(0);
    const [dateDuDepart, setDateDuDepart] = useState("");
    const [destinataire, setDestinataire] = useState("");
	const [objet, setObjet] = useState("");
	const [numeroArchive, setNumeroArchive] = useState(0);
	const [observations, setObservations] = useState("");
	const [verifier, setVerifier] = useState(0);
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	const [filePdf, setFilePdf] = useState(null);
	const [ file, setFile] = useState(null);
	
    const [errorDestinataire, setErrorDestinataire] = useState("");
	const [errorNumeroOrdre, setErrorNumeroOrdre] = useState("");
	const [errorNombreDePiece, setErrorNombreDePieces] = useState("");
	const [errorObjet, setErrorObjet] = useState("");
	const [errorDateDepart, setErrorDateDepart] = useState("");
     // Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);
	


	const handlerUpdateCourielDepart = (e) => {
	
        e.preventDefault();
		setEnvoyer(true);

		const fd = new FormData();
		fd.append('id', id);
		fd.append('numeroDordre', numeroDordre);
		fd.append('nombreDePieces', nombreDePieces);
		fd.append('dateDuDepart', dateDuDepart);
		fd.append('destinataire', destinataire);
		fd.append('objet', objet);
		fd.append('numeroArchive', numeroArchive);
		fd.append('observations', observations);
		fd.append('file', file);
		if(stateRoleName == "Directeur"){
			fd.append('verifier', 1);
		}else{
	        fd.append('verifier', verifier);
		}
    
        const errorNumeroOrdre = ValidationrNumeroOrdre(numeroDordre);
        const errorNombreDePiece = ValidationNombreDePiece(nombreDePieces);
        const errorDateDepart = ValidationDateDepart(dateDuDepart);
	    const errorObjet = ValidationObjet(objet);
        const errorDestinataire = ValidationDestinataire(destinataire);
		const errorFilePdf = ValidationeFilePdf(file);
      

		if(!errorDestinataire && !errorNombreDePiece && !errorNumeroOrdre && !errorObjet && !errorDateDepart){
          
			//let couriel = {id, numeroDordre,nombreDePieces,dateDuDepart, destinataire, objet, numeroArChive, observations }
			updateCourielDepart(fd, {
				headers: {
					'content-Type': 'multipart/form-data'
				},
			}).then(resp => {
                alert("Couriel départ modifié avec succès");
               handleClose();
                getAllCourrielsDepartToday()
                    .then(response => {
                        setStateCourielDepartToday(response.data);
                    })
                    .catch(error => {
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
			setErrorNumeroOrdre(errorNumeroOrdre)
			setErrorObjet(errorObjet)
			setErrorDateDepart(errorDateDepart);
			setEnvoyer(false);
        }
      };

	useEffect(() => {
		handleGetCourielDepartById(rowId)
	},[])  

	const handleGetCourielDepartById = (rowId) => {
			getCourielDepartById(rowId).then(resp => {
				 let couriel = resp.data;
				 setId(couriel.id);
				 setNumeroDordre(couriel.numeroDordre);
				 setNombreDePieces(couriel.nombreDePieces);
				 setDateDuDepart(couriel.dateDuDepart);
				 setDestinataire(couriel.destinataire);
				 setObjet(couriel.objet);
				 setNumeroArchive(couriel.numeroArchive);
				 setObservations(couriel.observations);
			     setFilePdf(couriel.filePdf)
				});

	  };


    return(
        <>
		
		{/* Edit couriel depart Modal */}
		<a type="button" className="btn btn-sm btn-primary"  onClick={handleShow}><i className="la la-pencil"></i></a>
	    
		 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modifier un courriel de départ</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
				<form onSubmit={handlerUpdateCourielDepart}>
					<div className="row">
					<input className="form-control " type="hidden" value={id} onChange={(e) => setId(e.target.value)}/>
						
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Numero d'ordre: <span className="text-danger">*</span></label>{errorNumeroOrdre && <span style={{color : "red"}}>{errorNumeroOrdre}</span>}
						<input min={0} className="form-control" defaultValue={0} type="number" value={numeroDordre} onChange={(e) => setNumeroDordre(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Nombre de pieces: <span className="text-danger">*</span></label>{errorNombreDePiece && <span style={{color : "red"}}>{errorNombreDePiece}</span>}
						<input min={0} value={nombreDePieces} type="number" defaultValue={0} onChange={(e) => setNombreDePieces(e.target.value)}  className="form-control "  />
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
						<input min={0} value={numeroArchive} type="number" onChange={(e) => setNumeroArchive(e.target.value)} className="form-control "  />
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
						<label className="col-form-label">Choisir un fichier</label>
						<input className="form-control " type="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
					</div>
					<input  min={0} max={1} value={verifier} onChange={(e) => setVerifier(e.target.value)} type="hidden" className="form-control " placeholder="Entrer le numero de la reponse" />
					

					</div>
					
					<div className="modal-footer">
						<button onClick={handleClose} type="button" class="btn btn-outline-primary">Fermer 
									</button>
						<button type="submit" disabled={envoyer}  class="btn  btn-outline-primary">Modifier 
								</button>
					</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
		
		{/* /Edit couriel depart Modal */}
		
        </>
    );
}

export default CourielDepartUpdate;