import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import { getAllCourielsArriver,getCourielArriverById } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie, AppContextCourielArriverToday, AppContextExpediteur, AppContextMenuToggle, AppContextToken } from "./context/contextApp";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Connexion from "./connexion";
import AddCourielArriver from "./couriels_arriver_add";
import CourielArriverUpdate from "./couriels_arriver_update";
import CourielArriverDelete from "./couriels_arriver_delete";




function CourielArriverJournaux(){
	
	const {stateToken, setStateToken} = useContext(AppContextToken);
	const { stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);




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
	
	 //permet de recuper le fichier pdf apres l'execution de la methode handleGetCourielById
	 let fileUrl = "http://localhost:8087/couriel/getFilePdfArriver/"+filePdf;
	 //let fileUrl = "http://depinfo-dev.tech:8087/couriel/getFilePdfArriver/"+filePdf;
	//  let fileUrl = "http://178.16.129.206:8087/couriel/getFilePdfArriver/"+filePdf;

	const handleGetCourielArriverById = (courielId) => {
			getCourielArriverById(courielId).then(resp => {
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


	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getAllCourielsArriver().then(resp => {
				setStateCourielArriverToday(resp.data)
			})
		}else{
			const recors = stateCourielArriverToday.filter((row) => {
				return row.expediteur.toLowerCase().includes(researchText);
		});
		setStateCourielArriverToday(recors);
		}
	}
	
	const columns = [
		{
			name : ( <strong> DATE D'ARRIVEE</strong>),
			selector:row => row.dateDarriver,
			sortable: true,
			cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateDarriver}</div>
		},
		{
			name: ( <strong> DATE DE LA  CORRESPONDANCE</strong>),
			selector: row => row.dateCorrespondance,
			sortable: true,
			cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateCorrespondance}</div>
		},
	 
		{
			name: ( <strong> EXPEDITEUR</strong>),
			selector: row => row.expediteur,
			sortable: true,
			cell: (row) => <div style={{ fontWeight: "bold" }}>{row.expediteur}</div>
		},
		{
		  name: ( <strong> OBJET</strong>),
		  selector: row => row.objet,
		  sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.objet}</div>
	  },
	  {
		  name: ( <strong> DATE DE LA REPONSE</strong>),
		  selector: row => row.dateReponse,
		  sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateReponse}</div>
	  },
	  {
		  name: ( <span> NUMERO DE LA REPONSE</span>),
		  selector: row => row.numeroReponse,
		  sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.numeroReponse}</div>
	  },
	  {
		name: (<strong >STATUS</strong>),
		selector:row => row.verifier,
		sortable: true,
		cell: (row) => <div style={{ fontWeight: "bold" }}>
			    {row.verifier ? <span className="badge badge-rounded badge-primary">OK</span>: <span className="badge badge-rounded badge-danger">à confirmer</span>}
			 </div>
	},
		{
			name: ( <strong> OPERATIONS</strong>),
			cell: row => (
			  
				
				<>         
						<a type="button" className="btn btn-sm btn-info" data-toggle="modal" data-target="#voir_pdf" onClick={() => handleGetCourielArriverById(row.id)}><i className="fa fa-eye m-r-5"></i></a>
						{'       '}
						{< CourielArriverUpdate rowId={row.id}/>}
						{'       '}
						{< CourielArriverDelete rowId={row.id}/>}
					  {/* <a type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#edit_couriel" onClick={() => handleGetCourielArriverById(row.id)}><i className="la la-pencil"></i></a>
					 {'       '}
					  <a  className="btn btn-sm btn-danger" data-toggle="modal" data-target="#delete_couriel" onClick={() => handleGetCourielArriverById(row.id)}><i className="la la-trash-o"></i></a>
				*/}
				</>
				
					  
  
			  ),
			  sortable: true
		}
	  ];

	const newplugin = defaultLayoutPlugin();
    return(
        <div id="main-wrapper"  className={`show ${isMenuToggle ? 'menu-toggle' : ''}` }>
		{ 
		 !stateToken || stateToken == "null" ? (
		   <Connexion />
		   ) : (
		   <>
			<Header/>
			<Sidebar/>
			
			<div className="content-body">
		

		<div className="container-fluid">
			{< AddCourielArriver/>}
			<br/><br/>
		 
			<div class="row page-titles mx-0">
                    <div class="col-sm-6 p-md-0">
					    <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a>Couriels</a></li>
                        
                            <li class="breadcrumb-item active"><a >Arriver</a></li>
                        </ol>
                        
                    </div>
                    <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					<div class="welcome-text">
                            <h4>Courriels d'arrivée reçus aujourd'hui</h4>
                        </div>
                    </div>
                </div>	

		  <div className="row">
			<div className="col-12">
			  <div className="card">
				<div className="card-header">
				   <input type='text' onChange={ handleFilter }/>
				</div>
				<div className="card-body">
				  
					  <DataTable 
						  columns={columns} 
						  data={stateCourielArriverToday}  
						  fixedHeader
						  pagination
						  striped
						  /> 
				</div>
			  </div>
			</div>
		  </div>
		</div>
	       </div>
	  
		   {/* <Footer/> */}
		</>
		)
		}
		
		{/* Vu couriel arrive Modal Pdf*/}
			<div id="voir_pdf" className="modal custom-modal fade" role="dialog">
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title">View PDF</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<strong aria-hidden="true">×</strong>
				</button>
				</div>
				<div className="modal-body">
					<div>
						<div style={{ height: '750px' }}>
						
							<Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
							{  fileUrl && <>
								<Viewer fileUrl={fileUrl}   plugins={[newplugin]}/> 
								</> 
							}
							{!fileUrl && <>No PDF</>}
							</Worker>
						</div>
					</div>
				</div>
				<div className="modal-footer">
						<button  data-dismiss="modal"  type="button" class="btn btn-outline-secondary">Fermer 
									</button>
						
								
			
					</div>
			</div>
			
			</div>
		</div>
		{/* /Vu couriel arrive  Modal Pdf*/}
		
        </div>
    );
}

export default CourielArriverJournaux;