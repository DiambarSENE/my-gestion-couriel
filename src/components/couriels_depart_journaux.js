import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import {  getAllCourrielsDepartToday, getCourielDepartById } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextCategorie,  AppContextCourielDepartToday, AppContextDestinateur, AppContextMenuToggle, AppContextToken } from "./context/contextApp";

import { Viewer, Worker } from "@react-pdf-viewer/core";

import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Connexion from "./connexion";
import AddCourielDepart from "./couriels_depart_add";
import CourielDepartUpdate from "./couriels_depart_update";
import CourielDepartDelete from "./couriels_depart_delete";




function CourielDepartJournaux(){
	const [show, setShow] = useState(false);

	const {stateToken, setStateToken} = useContext(AppContextToken);
	const { stateCourielDepartToday, setStateCourielDepartToday} = useContext(AppContextCourielDepartToday);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


	const [id, setId] = useState("");
	const [numeroDordre, setNumeroDordre] = useState("");
    const [nombreDePieces, setNombreDePieces] = useState("");
    const [dateDuDepart, setDateDuDepart] = useState("");
    const [destinataire, setDestinataire] = useState("");
	const [objet, setObjet] = useState("");
	const [numeroArChive, setNumeroArChive] = useState("");
	const [observations, setObservations] = useState("");
	//const [categorieNom, setCategorieNom] = useState({id: 1,"nom":"nom"});

	const [filePdf, setFilePdf] = useState(null);

	 //permet de recuper le fichier pdf apres l'execution de la methode handleGetCourielById
	 let fileUrl = "http://localhost:8087/couriel/getFilePdfDepart/"+filePdf;
	 //let fileUrl = "http://depinfo-dev.tech:8087/couriel/getFilePdfDepart/"+filePdf;
	 //let fileUrl = "http://178.16.129.206:8087/couriel/getFilePdfDepart/"+filePdf;

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


	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getAllCourrielsDepartToday().then(resp => {
				setStateCourielDepartToday(resp.data)
			})
		}else{
			const recors = stateCourielDepartToday.filter((row) => {
				return row.objet.toLowerCase().includes(researchText);
		});
		setStateCourielDepartToday(recors);
		}
	}
	
	 const columns = [
      {
		  //   name: "Numero D'ordre",
		  //   selector:row => "row.numeroDordre",
		  name: (<strong >NUMERO D'ORDRE</strong>),
          selector:row => row.numeroDordre,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.numeroDordre}</div>
 
      },
      {
          name: (<strong >NOMBRE DE PIECES</strong>),
		  selector:row => row.nombreDePieces,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nombreDePieces}</div>
      },
      {
		  name: (<strong >DATE DE DEPART</strong>),
		  selector:row => row.dateDuDepart,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateDuDepart}</div>
      },
   
      {
		  name: (<strong >DESTINATAIRE</strong>),
		  selector:row => row.destinataire,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.destinataire}</div>
      },
	  {
		name: (<strong >OBJET</strong>),
		selector:row => row.objet,
		sortable: true,
		cell: (row) => <div style={{ fontWeight: "bold" }}>{row.objet}</div>
	 },
	 {
		name: (<strong >NUMERO D'ARCHIVE</strong>),
		selector:row => row.numeroArChive,
		sortable: true,
		cell: (row) => <div style={{ fontWeight: "bold" }}>{row.numeroArChive}</div>
	 },
	 {
		name: (<strong >OBSERVATIONS</strong>),
		selector:row => row.observations,
		sortable: true,
		cell: (row) => <div style={{ fontWeight: "bold" }}>{row.observations}</div>
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
		  name: (<strong >OPERATIONS</strong>),
          cell: row => (
			
              
			  <>         
			  		<a type="button" className="btn btn-sm btn-info" data-toggle="modal" data-target="#voir_pdf" onClick={() => handleGetCourielDepartById(row.id)}><i className="fa fa-eye m-r-5"></i></a>
					  {'       '}
				    {< CourielDepartUpdate rowId={row.id}/>}
					{'       '}
					{< CourielDepartDelete rowId={row.id}/>}
					{/* <a type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#edit_couriel" onClick={() => handleGetCourielDepartById(row.id)}><i className="la la-pencil"></i></a>
				
					<a  className="btn btn-sm btn-danger" data-toggle="modal" data-target="#delete_couriel" onClick={() => handleGetCourielDepartById(row.id)}><i className="la la-trash-o"></i></a>
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
		{/* <button type="button"  data-toggle="modal" data-target="#add_couriel" class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
										  </span>Ajouter</button> */}
		{< AddCourielDepart/>}
										  <br/><br/>
				<div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
					    <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Couriels</a></li>
                        
                            <li className="breadcrumb-item active"><a >Départ</a></li>
                        </ol>
                        
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					    <div className="welcome-text">
                            <h4>Courriels de départ envoyés aujourd'hui</h4>
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
						  data={stateCourielDepartToday}  
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
		
		{/* Vu couriel depart Modal Pdf*/}
			<div id="voir_pdf" className="modal custom-modal fade" role="dialog">
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title">View PDF</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
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
		{/* /Vu couriel depart Modal Pdf*/}
		
        </div>
    );
}

export default CourielDepartJournaux;