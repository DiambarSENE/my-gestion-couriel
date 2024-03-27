import React, { useState } from "react";
import { useContext } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { AppContextCourielArriverNotToday, AppContextCourielArriverToday, AppContextCourielDepartNotToday, AppContextCourielDepartToday, AppContextMenuToggle, AppContextToken, AppContextUser } from "../context/contextApp";
import Connexion from "../connexion";
import Footer from "./footer";
import Preloader from "./preloader";
import DataTable from "react-data-table-component";

function Home(){
     //j'utilise le token pour la redirection entre le page d'accueil et la page de connexion
    const {stateToken, setStateToken} = useContext(AppContextToken);
    const {stateUser , setStateUser} = useContext(AppContextUser);
    const {stateCourielArriverToday, setStateCourielArriverToday} = useContext(AppContextCourielArriverToday);
    const {stateCourielArriverNotToday, setStateCourielArriverNotToday} = useContext(AppContextCourielArriverNotToday);
    const {stateCourielDepartToday, setStateCourielDepartToday} = useContext(AppContextCourielDepartToday);
    const {stateCourielDepartNotToday, setStateCourielDepartNotToday} = useContext(AppContextCourielDepartNotToday);
    
     // État pour suivre si le menu est ouvert ou non
  const {isMenuToggle, setIsMenuToggle} = useContext(AppContextMenuToggle);

   
    const columnsArrive = [
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
    }
      ];

    const columnsDepart = [
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
     }
      ];



    return(
      <div id="main-wrapper"  className={`show ${isMenuToggle ? 'menu-toggle' : ''}` }>

        { 
           !stateToken || stateToken == "null" ? (
             <Connexion />
           ) : (
            <>
                <Header />
                <Sidebar/> 
                <div className="content-body">
              {/* row */}
              <div className="container-fluid">
                <div className="row">

          
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-primary">
                      <div className="card-body">
                        <div className="media">
                          <strong className="mr-3">
                            <i className="la la-dollar" />
                          </strong>
                          <div className="media-body text-white">
                            <p className="mb-1">Nombre total de départs</p>
                            <h3 className="text-white">{stateCourielDepartToday.length}</h3>
                            <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{width: '5%'}} />
                            </div>
                            <small>Courriel du jour</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-warning">
                      <div className="card-body">
                        <div className="media">
                          <strong className="mr-3">
                            <i className="la la-dollar" />
                          </strong>
                          <div className="media-body text-white">
                            <p className="mb-1">Nombre total d'arrivées </p>
                            <h3 className="text-white">{stateCourielArriverToday.length}</h3>
                            <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{width: '5%'}} />
                            </div>
                            <small>Courriel du jour</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-secondary">
                      <div className="card-body">
                        <div className="media">
                          <strong className="mr-3">
                            <i className="la la-dollar" />
                          </strong>
                          <div className="media-body text-white">
                            <p className="mb-1">Total des arrivées historiques</p>
                            <h3 className="text-white">{stateCourielArriverNotToday.length}</h3>
                            <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{width: '76%'}} />
                            </div>
                            <small>Depuis que la version numérique est en place..</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-danger">
                      <div className="card-body">
                        <div className="media">
                          <strong className="mr-3">
                            <i className="la la-dollar" />
                          </strong>
                          <div className="media-body text-white">
                            <p className="mb-1">Total des départs historiques</p>
                            <h3 className="text-white">{stateCourielDepartNotToday.length}</h3>
                            <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{width: '30%'}} />
                            </div>
                            <small>Depuis que la version numérique est en place..</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Liste des couriels</h4>
                      </div>
                    <div className="card-body">
                        <div className="profile-tab">
                        <div className="custom-tab-1">
                            <ul className="nav nav-tabs">
                            <li className="nav-item"><a href="#about-me" data-toggle="tab" className="nav-link active show">Arrivé</a></li>
                            <li className="nav-item"><a href="#my-posts" data-toggle="tab" className="nav-link">Départ</a></li>

                            </ul>
                            <div className="tab-content">
                            <div id="about-me" className="tab-pane fade active show">
                            <DataTable 
                                    columns={columnsArrive} 
                                    data={stateCourielArriverToday}  
                                    fixedHeader
                                    pagination
                                    striped
                                    /> 
                            </div>
                            <div id="my-posts" className="tab-pane fade">
                                  <DataTable 
                                    columns={columnsDepart} 
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
                </div>
                      </div>
                    </div>
                  </div>
            </>
           )

        }     
  {/* <Footer/> */}
        </div>
    );
}

export default Home;