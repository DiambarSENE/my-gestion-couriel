import { useContext, useState } from "react";
import { createCourielArriver,  getAllCourrielsArriverToday } from "./servicesBackEnd/gestion-couriel-api";
import {   AppContextCourielArriverToday,  AppContextExpediteur,  AppContextRoleName } from "./context/contextApp";
import { ValidationDateCorrespondance, ValidationDateDarriver, ValidationExpediteur, ValidationNumeroCorrespondance, ValidationObjet, ValidationeFilePdf } from "./validateur/validation";

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Modal } from "react-bootstrap";




function AddCourielArriver(){
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const {stateExpediteur, setStateExpediteur} = useContext(AppContextExpediteur);
	const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
	const { stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
	

	const [dateDarriver, setDateDarriver] = useState("");
	const [dateCorrespondance, setDateCorrespondance] = useState("");
    const [numeroCorrespondance, setNumeroCorrespondance] = useState("");
    const [expediteur, setExpediteur] = useState("");
    const [objet, setObjet] = useState("");
    const [dateReponse, setDateReponse] = useState("");
	const [numeroReponse, setNumeroReponse] = useState(0);
	const [verifier, setVerifier] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});
	
	const [categorieNom, setCategorieNom] = useState();
	const [filePdf, setFilePdf] = useState(null);
	const [ file, setFile] = useState(null);
	const [ viewFile, setViewFile] = useState(null);

    const [errorExpediteur, setErrorExpediteur] = useState("");
	const [errorDateCorrespondance, setErrorDateCorrespondance] = useState("");
	const [errorNumeroCorrespondance, setErrorNumeroCorrespondance] = useState("");
	const [errorObjet, setErrorObjet] = useState("");
	const [errorFilePdf, setErrorFilePdf] = useState("");
	const [errorDateDarriver, setErrorDateDarriver] = useState("");
    // Ajout d'un état pour contrôler la désactivation du bouton
    const [envoyer, setEnvoyer] = useState(false);
	

	const handlerAddCourielArriver = (e) => {
		
        e.preventDefault();
		setEnvoyer(true);
		
		const fd = new FormData();
		fd.append('dateDarriver', dateDarriver);
		fd.append('dateCorrespondance', dateCorrespondance);
		fd.append('numeroCorrespondance', numeroCorrespondance);
		fd.append('expediteur', expediteur);
		fd.append('objet', objet);
		fd.append('dateReponse', dateReponse);
		fd.append('numeroReponse', numeroReponse);
		fd.append('file', file);
		
		if(stateRoleName === "Directeur"){
			fd.append('verifier', 1);
		}else{
			fd.append('verifier', 0);
		}
    
        const errorExpediteur = ValidationExpediteur(expediteur);
		const errorDateCorrespondance = ValidationDateCorrespondance(dateCorrespondance);
		const errorNumeroCorrespondance = ValidationNumeroCorrespondance(numeroCorrespondance);
		const errorObjet = ValidationObjet(objet);
		const errorFilePdf = ValidationeFilePdf(file);
		const errorDateDarriver = ValidationDateDarriver(dateDarriver);
       // let couriel = {nom, description,typeCouriel, categorie}
        if(!errorExpediteur && !errorDateCorrespondance && !errorNumeroCorrespondance && !errorObjet && !errorDateDarriver && !errorFilePdf){
           
			createCourielArriver(fd, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}).then(resp => {
                    alert("Courriel arrivé ajouté avec succès");
					setDateDarriver(" ");
					setDateCorrespondance(" ");
					setNumeroCorrespondance(" ");
					setExpediteur(" ");
					setObjet(" ");
					setDateReponse(" ");
					setNumeroReponse(" ");
					handleClose();
					getAllCourrielsArriverToday()
							.then(response => {
								setStateCourielArriverToday(response.data);
							})
							.catch( error => {
								console.error(error)
							});
             
            }).catch(error => {
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
            setErrorExpediteur(errorExpediteur);
			setErrorDateCorrespondance(errorDateCorrespondance);
			setErrorNumeroCorrespondance(errorNumeroCorrespondance);
			setErrorObjet(errorObjet);
			setErrorFilePdf(errorFilePdf);
			setErrorDateDarriver(errorDateDarriver);
            setEnvoyer(false);
        }
      };
      


    return(
        <>
	
	   <button   onClick={handleShow} style={{ float: 'right'}} class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
										  </span>Ajouter un courriel d'arrivée</button>
		 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter un courriel d'arrivée</Modal.Title>
			<button type="button" className="close" onClick={handleClose} aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
        </Modal.Header>
        <Modal.Body>
		       <form onSubmit={handlerAddCourielArriver}>
					<div className="row">
						
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Date de la Correspondance:  <span className="text-danger">*</span></label>{errorDateCorrespondance && <span style={{color : "red"}}>{errorDateCorrespondance}</span>}
						<input className="form-control " type="date" value={dateCorrespondance} onChange={(e) => setDateCorrespondance(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
					<div className="form-group">
						<label className="col-form-label">Numero de la Correspondance: <span className="text-danger">*</span></label>{errorNumeroCorrespondance && <span style={{color : "red"}}>{errorNumeroCorrespondance}</span>}
						<input min={0} value={numeroCorrespondance} type="number" onChange={(e) => setNumeroCorrespondance(e.target.value)}  className="form-control " placeholder="Entrer le Numero de la Correspondance"  />
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
						<input  min={0} value={numeroReponse} onChange={(e) => setNumeroReponse(e.target.value)} type="number" className="form-control " placeholder="Entrer le numero de la reponse" />
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
						<button onClick={handleClose} type="button" class="btn btn-outline-secondary">Fermer 
									</button>
						<button type="submit" disabled={envoyer}  class="btn  btn-outline-primary">+ Ajouter 
								</button>
								
			
					</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>


                   {/* <div className="modal fade none-border" id="add-category">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title"><strong>Add a category</strong></h4>
      </div>
      <div className="modal-body">
        <form>
          <div className="row">
            <div className="col-md-6">
              <label className="control-label">Category Name</label>
              <input className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
            </div>
            <div className="col-md-6">
              <label className="control-label">Choose Category Color</label>
              <select className="form-control form-white" data-placeholder="Choose a color..." name="category-color">
                <option value="success">Success</option>
                <option value="danger">Danger</option>
                <option value="info">Info</option>
                <option value="pink">Pink</option>
                <option value="primary">Primary</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger waves-effect waves-light save-category" data-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div> */}

        </>
    );
}

export default AddCourielArriver;