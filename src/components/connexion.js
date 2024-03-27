import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteToken, getConnexion, setAuthHeader } from "./servicesBackEnd/gestion-couriel-api";
import { AppContextRoleName, AppContextToken, AppContextUserEmail } from "./context/contextApp";


function Connexion(){
    const navigate = useNavigate();
    const {stateToken, setStateToken} = useContext(AppContextToken);
    const {stateRoleName, setStateRoleName} = useContext(AppContextRoleName);
    const {stateUserEmail, setStateUserEmail} = useContext(AppContextUserEmail);
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
      const handlerConnexion = async (e) => {
        e.preventDefault();
        try {
          const user = { email, password };
      
          const response = await getConnexion(user);
         
          // Vérifiez si la réponse a un token valide
          if (response.data.token !== "null") {
            //setStateUserByEmail(response.data.email);
            setAuthHeader(response.data.token, response.data.email, response.data.role);
            // Définissez le token dans l'état et redirigez vers la page d'accueil
            setStateToken(response.data.token);
            setStateUserEmail(response.data.email);
            setStateRoleName(response.data.role);

            
            navigate("/home");
           
          } else {
            // Si le token est "null", affichez une alerte indiquant une erreur de connexion
            alert("Email ou mot de passe incorrect");
          }
        }catch (error) {
          deleteToken();
          console.error(error);
          if (error.response) {
              // La demande a été faite et le serveur a répondu avec un code d'état
              // qui sort de la plage de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert(`${error.response.data.message}`);
              // alert(`Une erreur s'est produite :${error.response.data.message}`);
          } else if (error.request) {
              // La demande a été faite mais aucune réponse n'a été reçue
              console.log(error.request);
              alert("La connexion au serveur a échoué.");
          } else {
              // Quelque chose s'est produit lors de la mise en place de la demande qui a déclenché une erreur
              console.log('Error', error.message);
              alert("Une erreur s'est produite lors de la configuration de la demande.");
          }
      }
      
      };

    return(
        <>
           <br/><br/><br/><br/>
          
            <div className="container h-100">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                  <div className="authincation-content">
                    <div className="row no-gutters">
                      <div className="col-xl-12">
                        <div className="auth-form">
                          <h4 className="text-center mb-4">Se connecter à son compte</h4>
                          <form onSubmit={ handlerConnexion }>
                            <div className="form-group">
                              <label><strong>Adresse Email</strong></label>
                              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label><strong>Mot de passe</strong></label>
                              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                            </div>
                            <div className="form-row d-flex justify-content-between mt-4 mb-2">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox ml-1">
                                  {/* <input type="checkbox" className="custom-control-input" id="basic_checkbox_1" />
                                  <label className="custom-control-label" htmlFor="basic_checkbox_1">Remember my preference</label> */}
                                </div>
                              </div>
                              <div className="form-group">
                                <a>Mot de passe oublié ?</a>
                              </div>
                            </div>
                            <div className="text-center">
                              <button type="submit" className="btn btn-primary btn-block">Connexion</button>
                            </div>
                          </form>
                          <div className="new-account mt-3">
                            <p>ous n'avez pas encore de compte ?  <span className="text-primary" >Contacter l'administrateur</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




        </>
    );
}

export default Connexion;