import { useContext, useEffect, useState } from "react";
import { getAllCourrielsArriverToday,  getCourielArriverById,  updateCourielArriver } from "./servicesBackEnd/gestion-couriel-api";
import {  AppContextCourielArriverToday, AppContextExpediteur,  AppContextRoleName } from "./context/contextApp";
import { ValidationDateCorrespondance, ValidationDateDarriver, ValidationName, ValidationNumeroCorrespondance, ValidationObjet, ValidationeFilePdf } from "./validateur/validation";

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Modal } from "react-bootstrap";




function CourielArriverUpdate({rowId}){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
	const { stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
	

	const {stateExpediteur, setStateExpediteur} = useContext(AppContextExpediteur);



	const [id, setId] = useState("");
	const [dateDarriver, setDateDarriver] = useState("");
	const [dateCorrespondance, setDateCorrespondance] = useState("");
    const [numeroCorrespondance, setNumeroCorrespondance] = useState(0);
    const [expediteur, setExpediteur] = useState("");
    const [objet, setObjet] = useState("");
    const [dateReponse, setDateReponse] = useState("");
	const [numeroReponse, setNumeroReponse] = useState(0);
	const [verifier, setVerifier] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	const [filePdf, setFilePdf] = useState(null);
	const [ file, setFile] = useState(null);
	//const [ viewFile, setViewFile] = useState(null);
	
    const [errorExpediteur, setErrorExpediteur] = useState("");
	const [errorDateCorrespondance, setErrorDateCorrespondance] = useState("");
	const [errorNumeroCorrespondance, setErrorNumeroCorrespondance] = useState("");
	const [errorObjet, setErrorObjet] = useState("");
	//const [errorFilePdf, setErrorFilePdf] = useState("");
	const [errorDateDarriver, setErrorDateDarriver] = useState("");
	
	// Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);

	const handlerUpdateCourielArriver = (e) => {
		
        e.preventDefault();
		setEnvoyer(true);

		const fd = new FormData();
		fd.append('id', id);
		fd.append('dateDarriver', dateDarriver);
		fd.append('dateCorrespondance', dateCorrespondance);
		fd.append('numeroCorrespondance', numeroCorrespondance);
		fd.append('expediteur', expediteur);
		fd.append('objet', objet);
		fd.append('dateReponse', dateReponse);
		fd.append('numeroReponse', numeroReponse);
		fd.append('file', file);
		if(stateRoleName == "Directeur"){
			fd.append('verifier', 1);
		}else{
	        fd.append('verifier', verifier);
		}
		
        
        const errorExpediteur= ValidationName(expediteur);
		const errorDateCorrespondance = ValidationDateCorrespondance(dateCorrespondance);
		const errorNumeroCorrespondance = ValidationNumeroCorrespondance(numeroCorrespondance);
		const errorObjet = ValidationObjet(objet);
		const errorFilePdf = ValidationeFilePdf(file);
		const errorDateDarriver = ValidationDateDarriver(dateDarriver);
        
         //let couriel = {id, dateCorrespondance,numeroCorrespondance,expediteur, objet, dateDarriver ,dateReponse, numeroReponse, filePdf}
		
		 if(!errorExpediteur && !errorDateCorrespondance && !errorNumeroCorrespondance && !errorObjet && !errorDateDarriver){
			updateCourielArriver(fd,{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then(resp => {
                alert("Couriel modifier avec succes");
               handleClose();
                getAllCourrielsArriverToday()
                    .then(response => {
                        setStateCourielArriverToday(response.data);
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
            setErrorExpediteur(errorExpediteur);
			setErrorDateCorrespondance(errorDateCorrespondance);
			setErrorNumeroCorrespondance(errorNumeroCorrespondance);
			setErrorObjet(errorObjet);
			setErrorDateDarriver(errorDateDarriver);
			setEnvoyer(false);
        }
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
				 setDateDarriver(couriel.dateDarriver);
				 setObjet(couriel.objet);
				 setDateReponse(couriel.dateReponse);
				 setNumeroReponse(couriel.numeroReponse);
			     setFilePdf(couriel.filePdf)
				 setFile(couriel.filePdf)
				 setVerifier(couriel.verifier)
				});

	  };


    return(
        <>

         {/* /Edit couriel arriver Modal */}
		<a type="button" className="btn btn-sm btn-primary" onClick={handleShow}><i className="la la-pencil"></i></a>
	     
		 <Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modifier un courriel d'arrivée</Modal.Title>
					<button type="button" className="close" onClick={handleClose} aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
				</Modal.Header>
				<Modal.Body>
				  <form onSubmit={handlerUpdateCourielArriver}>
					<div className="row">
					<input className="form-control " type="hidden" value={id} onChange={(e) => setId(e.target.value)}/>
						
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Date de la Correspondance:<span className="text-danger">*</span></label>{errorDateCorrespondance && <span style={{color : "red"}}>{errorDateCorrespondance}</span>}
						<input className="form-control " type="date" value={dateCorrespondance} onChange={(e) => setDateCorrespondance(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Numero de la Correspondance:<span className="text-danger">*</span></label>{errorNumeroCorrespondance && <span style={{color : "red"}}>{errorNumeroCorrespondance}</span>}
						<input value={numeroCorrespondance} type="number" onChange={(e) => setNumeroCorrespondance(e.target.value)} className="form-control " placeholder="Entrer le Numero de la Correspondance"  />
					</div>
					</div>
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Date d'arriver: <span style={{color: "red"}}>*</span></label>{errorDateDarriver && <span style={{color : "red"}}>{errorDateDarriver}</span>}
						<input value={dateDarriver} type="date" onChange={(e) => setDateDarriver(e.target.value)}  className="form-control "  />
					</div>
					</div> 
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Expediteur: <span style={{color: "red"}}>*</span></label>{errorExpediteur && <span style={{color : "red"}}>{errorExpediteur}</span>}
						{/* <input value={expediteur} type="text" onChange={(e) => setExpediteur(e.target.value)}  className="form-control " placeholder="Entrer l'expediteur" /> */}
						<select className="form-control " value={expediteur} type="text" onChange={(e) => setExpediteur(e.target.value)}>
						<option value={""}></option>
						   {
							stateExpediteur.map(expediteur => 
								<option key={expediteur.id} value={expediteur.nom}>{expediteur.nom}</option>
								)
						   }
						   
							
						</select>
					</div>
					</div>
					<div className="col-sm-12">
					<div className="form-group">
						<label className="col-form-label">Objet: <span className="text-danger">*</span></label>{errorObjet && <span style={{color : "red"}}>{errorObjet}</span>}
						<textarea value={objet} type="test" onChange={(e) => setObjet(e.target.value)} rows={4} className="form-control " placeholder="Entrer l'objet du couriel" defaultValue={""} />
					</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Date de la Reponse</label>
						<input value={dateReponse} onChange={(e) => setDateReponse(e.target.value)} type="date" className="form-control " placeholder="Entrer la date de la reponse" />
					</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Numero de la Reponse</label>
						<input value={numeroReponse} onChange={(e) => setNumeroReponse(e.target.value)} type="number" className="form-control"  placeholder="Entrer le numero de la reponse" />
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
						<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
									</button>
						<button type="submit" disabled={envoyer}  class="btn  btn-outline-primary">Modifier 
								</button>
								
			
					</div>
				</form>	
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
        </Modal>
		{/* /Edit couriel arriver Modal */}
		
        </>
    );
}

export default CourielArriverUpdate;