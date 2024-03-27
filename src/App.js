//import logo from './logo.svg';
//import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/templates/home";


import { AppContextCategorie, AppContextCourielArriverNotToday, AppContextCourielArriverToday, AppContextCourielDepartNotToday, AppContextCourielDepartToday, AppContextDestinateur, AppContextExpediteur, AppContextMenuToggle, AppContextRoleName, AppContextToken, AppContextUser, AppContextUserEmail, useAppStateCategorie, useAppStateCouriel, useAppStateCourielArriverNotToday, useAppStateCourielArriverToday, useAppStateCourielDepartNotToday, useAppStateCourielDepartToday, useAppStateDestinateur, useAppStateExpediteur, useAppStateMenuToggle, useAppStateRoleName, useAppStateToken, useAppStateUser, useAppStateUserEmail } from "./components/context/contextApp";
import { deleteToken, getAllCategorys, getAllCourrielsArriverNotToday, getAllCourrielsArriverToday, getAllCourrielsDepartNotToday, getAllCourrielsDepartToday, getAllDestinateurs, getAllExpediteurs, getAuthEmail, getAuthRole, getAuthRoleName, getAuthToken, getUsers } from "./components/servicesBackEnd/gestion-couriel-api";
import Connexion from "./components/connexion";
import Inscription from "./components/inscription";
import Categorie from "./components/categories";
import CourielArriverJournaux from "./components/couriels_arriver_journaux";
import CourielDepartJournaux from "./components/couriels_depart_journaux";
import CourielDepartHistorique from "./components/couriels_depart_historique";
import CourielArriverHistorique from "./components/couriels_arriver_historique";
import Expediteur from "./components/expediteur";
import Destinateur from "./components/destinateur";
import Profile from "./components/utilisateur-profile";
import { decodeJWT } from "./components/validateur/decoteToken";
import UserList from "./components/userList";

function App() {

  const [stateUser, setStateUser] = useAppStateUser(AppContextUser);
  const [stateUserEmail, setStateUserEmail] = useAppStateUserEmail(AppContextUserEmail);
  const [stateRoleName, setStateRoleName] = useAppStateRoleName(AppContextRoleName);

  // const [stateCouriel, setStateCouriel] = useAppStateCouriel(AppContextCouriel);
  const [stateCourielArriverToday, setStateCourielArriverToday] = useAppStateCourielArriverToday(AppContextCourielArriverToday);
  const [stateCourielArriverNotToday, setStateCourielArriverNotToday] = useAppStateCourielArriverNotToday(AppContextCourielArriverNotToday);
  const [stateCourielDepartToday, setStateCourielDepartToday] = useAppStateCourielDepartToday(AppContextCourielDepartToday);
  const [stateCourielDepartNotToday, setStateCourielDepartNotToday] = useAppStateCourielDepartNotToday(AppContextCourielDepartNotToday);
  const [stateCategorie, setStateCategorie] = useAppStateCategorie(AppContextCategorie);
  const [stateToken , setStateToken] = useAppStateToken(AppContextToken);
  const [stateExpediteur, setStateExpediteur] = useAppStateExpediteur(AppContextExpediteur);
  const [stateDestinateur, setStateDestinateur] = useAppStateDestinateur(AppContextDestinateur);
    // État pour suivre si le menu est ouvert ou non
  const [isMenuToggle, setIsMenuToggle] = useAppStateMenuToggle(AppContextMenuToggle);


  const token = getAuthToken();
  useEffect(() => {
    handlerListUser();
    // handlerListCouriel();
    handlerListCategorys();
    handlerToken();
    handlerListCourielArriverToday();
    handlerListCourielArriverNotToday();
    handlerListCourielDepartToday();
    handlerListCourielDepartNotToday();
    handlerListDestinateur();
    handlerListExpediteur();

  },[token])
 
  const handlerToken = () => {
    // Récupérez le token JWT depuis le stockage local
    const token = getAuthToken();
    const email = getAuthEmail();
    const role = getAuthRoleName();
    if (token) {

      setStateToken(token);
      setStateUserEmail(email);
      setStateRoleName(role);
      const decodedToken = decodeJWT(token);
            //if (decodedToken && decodedToken.roles) {
      if (decodedToken) {
      
        //destructuration pour recuperer un attribut specifique
        const { exp } = decodedToken;
        const expirationTempsEnMiliseconde = exp * 1000;
        const tempsExpiration = expirationTempsEnMiliseconde - Date.now();

        if(tempsExpiration <= 0){
            deleteToken();
            window.location.href = '/';
        }else{
            setTimeout(handlerToken, tempsExpiration);
        }
    } else {
        // Gestion des erreurs de décodage
        console.error('Le décodage du token a échoué.');
        deleteToken();
        window.location.href = '/';
      }
      
    }
  };

  const handlerListUser = () => {
    getUsers()
        .then( response => {
            setStateUser(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  // const handlerListCouriel = () => {
  //   getAllCouriels()
  //       .then( response => {
  //           setStateCourielArriverToday(response.data)
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       })
  // };
  const handlerListDestinateur = () => {
    getAllDestinateurs()
        .then( response => {
            setStateDestinateur(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListExpediteur = () => {
    getAllExpediteurs()
        .then( response => {
            setStateExpediteur(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListCourielArriverToday = () => {
    getAllCourrielsArriverToday()
        .then( response => {
            setStateCourielArriverToday(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListCourielArriverNotToday = () => {
    getAllCourrielsArriverNotToday()
        .then( response => {
            setStateCourielArriverNotToday(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListCourielDepartToday = () => {
    getAllCourrielsDepartToday()
        .then( response => {
            setStateCourielDepartToday(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListCourielDepartNotToday = () => {
    getAllCourrielsDepartNotToday()
        .then( response => {
            setStateCourielDepartNotToday(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };
  const handlerListCategorys = () => {
    getAllCategorys()
        .then( response => {
            setStateCategorie(response.data)
        })
        .catch(error => {
          console.error(error);
        })
  };



  return (
     
        <AppContextUser.Provider value={{ stateUser, setStateUser}}>
          <AppContextUserEmail.Provider value={{ stateUserEmail, setStateUserEmail}}>
          <AppContextRoleName.Provider value={{ stateRoleName, setStateRoleName}}>
            {/* <AppContextCouriel.Provider value={{ stateCouriel, setStateCouriel}}> */}
              <AppContextCourielArriverToday.Provider value={{ stateCourielArriverToday, setStateCourielArriverToday}}>
                <AppContextCourielArriverNotToday.Provider value={{ stateCourielArriverNotToday, setStateCourielArriverNotToday}}>
                  <AppContextCourielDepartToday.Provider value={{ stateCourielDepartToday, setStateCourielDepartToday}}>
                    <AppContextCourielDepartNotToday.Provider value={{ stateCourielDepartNotToday, setStateCourielDepartNotToday}}>
                        <AppContextCategorie.Provider value={{ stateCategorie, setStateCategorie }}>
                        <AppContextExpediteur.Provider value={{ stateExpediteur, setStateExpediteur }}>
                          <AppContextDestinateur.Provider value={{ stateDestinateur, setStateDestinateur }}>
                          <AppContextToken.Provider value={{ stateToken, setStateToken}}>
                            <AppContextMenuToggle.Provider value={{ isMenuToggle, setIsMenuToggle}}>
                               <BrowserRouter>
                                  {/* <Header/>
                                  <Sidebar/> */}
                                  <Routes>
                                      <Route path="/" exact element={ <  Connexion /> }></Route>
                                      {/* <Route path="/employees" element={ < Employer /> }></Route> */}
                                      <Route path="/userList" element={ < UserList /> }></Route>
                                      <Route path="/home" element={ < Home /> }></Route>
                                      <Route path="/inscription" element={ < Inscription /> }></Route>
                                      <Route path="/couriels_a_j" element={ < CourielArriverJournaux /> }></Route>
                                      <Route path="/couriels_a_h" element={ < CourielArriverHistorique /> }></Route>
                                      <Route path="/couriels_d_j" element={ < CourielDepartJournaux /> }></Route>
                                      <Route path="/couriels_d_h" element={ < CourielDepartHistorique /> }></Route>
                                      <Route path="/categories" element={ < Categorie /> }></Route>
                                      <Route path="/expediteur" element={ < Expediteur /> }></Route>
                                      <Route path="/destinateur" element={ < Destinateur /> }></Route>
                                      <Route path="/utilisateur-profile" element={ < Profile /> }></Route>
                                  </Routes>
                              </BrowserRouter>
                            </AppContextMenuToggle.Provider>
                          </AppContextToken.Provider>
                          </AppContextDestinateur.Provider> 
                          </AppContextExpediteur.Provider> 
                        </AppContextCategorie.Provider> 
                      </AppContextCourielDepartNotToday.Provider> 
                  </AppContextCourielDepartToday.Provider>
                </AppContextCourielArriverNotToday.Provider> 
              </AppContextCourielArriverToday.Provider>
          {/* </AppContextCouriel.Provider>   */}
          </AppContextRoleName.Provider>
          </AppContextUserEmail.Provider>
        </AppContextUser.Provider>  
 
  );
}

export default App;
