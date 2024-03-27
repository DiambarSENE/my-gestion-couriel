import { useContext,  useState } from "react";
import { AppContextExpediteur, AppContextMenuToggle, AppContextToken } from "./context/contextApp";
import {  getAllExpediteurs } from "./servicesBackEnd/gestion-couriel-api";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import DataTable from "react-data-table-component";
import Connexion from "./connexion";
import AddExpediteur from "./expediteurAdd";
import ExpediteurDelete from "./expediteurDelete";
import ExpediteurUpdate from "./expediteurUpdate";

function Expediteur(){
	const { stateExpediteur, setStateExpediteur} = useContext(AppContextExpediteur);
	const {stateToken, setStateToken} = useContext(AppContextToken);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);

	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getAllExpediteurs().then(resp => {
				setStateExpediteur(resp.data)
			})
		}else{
			const recors = stateExpediteur.filter((row) => {
				return row.nom.toLowerCase().includes(researchText);
		});
		setStateExpediteur(recors);
		}
	}

	 const columns = [
      {
          name : (<strong>Nom</strong>),
          selector:row => row.nom,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.nom}</div>
      },
      {
          name: (<strong>Description</strong>),
          selector: row => row.description,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.description}</div>
      },
      {
          name: (<strong>Date de creation</strong>),
          selector: row => row.dateCreation,
          sortable: true,
		  cell: (row) => <div style={{ fontWeight: "bold" }}>{row.dateCreation}</div>
      },
      {
          name: (<strong>Operations</strong>),
          cell: row => (
		  
		    <>   
			   {< ExpediteurUpdate rowId={row.id}/>}      
                {< ExpediteurDelete rowId={row.id }/> }
				
		 	</>

            ),
            sortable: true
      }
    ];
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
		{<AddExpediteur/>}
		<br/><br/>
		<div class="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
					    <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Parametres</a></li>
                        
                            <li className="breadcrumb-item active"><a >Gestion expéditeur</a></li>
                        </ol>
                        
                    </div>
                    <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					   <div className="welcome-text">
                            <h4>Liste des expéditeurs</h4>
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
						  data={stateExpediteur}  
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
		
    
		</div>
	
    );
}

export default Expediteur;