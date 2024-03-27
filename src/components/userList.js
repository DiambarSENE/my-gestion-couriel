import React, { useContext, useState } from "react";
import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import { AppContextMenuToggle, AppContextToken, AppContextUser } from "./context/contextApp";
import { getUsers } from "./servicesBackEnd/gestion-couriel-api";
import DataTable from "react-data-table-component";
import Connexion from "./connexion";
import UserUpdate from "./userUpdate";
import UserAdd from "./userAdd";
import UserDelete from "./userDelete";

function UserList(){


	const {stateToken, setStateToken} = useContext(AppContextToken);
	const {stateUser , setStateUser} = useContext(AppContextUser);
    const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);


	
	
	function handleFilter(e) {
		const researchText = e.target.value.toLowerCase();
		if(researchText === ""){
			getUsers().then(resp => {
				setStateUser(resp.data)
			})
		}else{
			const recors = stateUser.filter((row) => {
				return row.nom.toLowerCase().includes(researchText);
		});
		setStateUser(recors);
		}
	}

	 const columns = [
      {
          name : "Prenom",
          selector:row => row.prenom,
          sortable: true
      },
      {
          name: "Nom",
          selector: row => row.nom,
          sortable: true
      },
      {
          name: "Telephone",
          selector: row => row.telephone,
          sortable: true
      },
      {
		name: "Email",
		selector: row => row.email,
		sortable: true
	},
	{
		name: "Matricule",
		selector: row => row.matricule,
		sortable: true
	},
	{
		name: "Role",
		selector: row => row.role,
		sortable: true
	},
	{
		name: "Adresse",
		selector: row => row.adresse,
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
		// 	<div className="dropdown profile-action">
		// 	<a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
		// 	<div className="dropdown-menu dropdown-menu-right">

		// 	 <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employeeList" ><i className="fa fa-pencil m-r-5" /> Modifier</a>
		// 	<a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employeeList" ><i className="fa fa-trash-o m-r-5"  /> Supprimer</a>
		// 	</div>
		//    </div>

        <>         
		 { < UserUpdate rowId={row.id}/>}
		{< UserDelete rowId={row.id}/>}
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
  {/* <button type="button"  data-toggle="modal" data-target="#add_utilisateur" class="btn btn-rounded btn-primary"><span class="btn-icon-left text-primary"><i class="fa fa-plus color-info"></i>
                                    </span>Ajouter</button> */}
	{ < UserAdd />}								
									<br/><br/>
    <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
		{/* <Link to={"/userList"} className="grid-view btn btn-link"><i className="fa fa-th" /></Link>
		<Link to={"/userList"} className="list-view btn btn-link active"><i className="fa fa-bars" /></Link> */}

          {/* <span className="ml-1">Datatable</span> */}
		 
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Utilisateurs</a></li>
          <li className="breadcrumb-item active"><a href="#">Gestion utilisateurs</a></li>
        </ol>
    
        </div>
      </div>
	  <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
		<ol className="breadcrumb">
			<li className="breadcrumb-item">Table liste utilisateur</li>
			
		</ol>
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
					data={stateUser}  
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

export default UserList;