import { useContext, useState } from "react";
import { AppContextDestinateur, AppContextMenuToggle, AppContextToken } from "./context/contextApp";
import { getAllDestinateurs } from "./servicesBackEnd/gestion-couriel-api";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import DataTable from "react-data-table-component";
import Connexion from "./connexion";
import AddDestinateur from "./destinateurAdd";
import DestinateurDelete from "./destinateurDelete";
import DestinateurUpdate from "./destinateurUpdate";

function Destinateur(){
	const {stateToken, setStateToken} = useContext(AppContextToken);

	const { stateDestinateur, setStateDestinateur} = useContext(AppContextDestinateur);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getAllDestinateurs().then(resp => {
				setStateDestinateur(resp.data)
			})
		}else{
			const recors = stateDestinateur.filter((row) => {
				return row.nom.toLowerCase().includes(researchText);
		});
		setStateDestinateur(recors);
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
          name:(<strong>Operations</strong>),
          cell: row => (
		  
		<>         
		  { < DestinateurUpdate rowId={row.id} /> }
		  { < DestinateurDelete rowId={row.id} /> }
		
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
		{/* <button type="button"  data-toggle="modal" data-target="#add_destinateur" class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
										  </span>Ajouter</button>
	 */}
		{<AddDestinateur/>}
		
		<br/><br/>
		
		       <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
					    <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Parametres</a></li>
                        
                            <li className="breadcrumb-item active"><a >Gestion destinateur</a></li>
                        </ol>
                       
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					    <div className="welcome-text">
                            <h4>Liste des destinateurs</h4>
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
						  data={stateDestinateur}  
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

export default Destinateur;