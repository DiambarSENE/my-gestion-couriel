import { useContext, useState } from "react";
import { AppContextCategorie, AppContextMenuToggle, AppContextToken } from "./context/contextApp";
import { getAllCategorys } from "./servicesBackEnd/gestion-couriel-api";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import DataTable from "react-data-table-component";
import Connexion from "./connexion";
import AddCategorie from "./categoriesAdd";
import CategorieDelete from "./categoriesDelete";
import CategorieUpdate from "./categoriesUpdate";

function Categorie(){
	const [show, setShow] = useState(false);


	const { stateCategorie, setStateCategorie} = useContext(AppContextCategorie);
	const {stateToken, setStateToken} = useContext(AppContextToken);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getAllCategorys().then(resp => {
				setStateCategorie(resp.data)
			})
		}else{
			const recors = stateCategorie.filter((row) => {
				return row.nom.toLowerCase().includes(researchText);
		});
		setStateCategorie(recors);
		}
	}

	 const columns = [
      {
          name : "Nom",
          selector:row => row.nom,
          sortable: true
      },
      {
          name: "Description",
          selector: row => row.description,
          sortable: true
      },
      {
          name:"Date de creation",
          selector: row => row.dateCreation,
          sortable: true
      },
      {
          name:"Operations",
          cell: row => (
		  
		    <>         
			{< CategorieUpdate rowId={row.id}/>}
			{< CategorieDelete rowId={row.id}/>}
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
		{/* <button type="button"  data-toggle="modal" data-target="#add_categorie" class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
										  </span>Ajouter</button> */}
		{<AddCategorie/>}
										  <br/><br/>
		<div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
					    <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Parametres</a></li>
                        
                            <li className="breadcrumb-item active"><a >Gestion catégories</a></li>
                        </ol>
                        
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
					   <div className="welcome-text">
                            <h4>Liste des catégories</h4>
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
						  data={stateCategorie}  
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

export default Categorie;