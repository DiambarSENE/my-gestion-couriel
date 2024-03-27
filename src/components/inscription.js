import { useState } from "react";
import { createUsers } from "./servicesBackEnd/gestion-couriel-api";
import { ValidationEmail, ValidationName, ValidationPrenom, ValidationRole, ValidationTelephone } from "./validateur/validation";

function Inscription(){


	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [telephone, setTelephone] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [matricule , setMatricule] = useState("");
	const [adresse , setAdresse] = useState("");


	const [errorPrenom, setErrorPrenom] = useState("");
	const [errorNom, setErrorNom] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorTelephone, setErrorTelephone] = useState("");
	const [errorRole, setErrorRole] = useState("");

	const handlerAddUser = (e) => {
        e.preventDefault();
        const errorPrenom = ValidationPrenom(prenom);
        const errorNom = ValidationName(nom);
        const errorEmail = ValidationEmail(email);
        const errorTelephone = ValidationTelephone(telephone);
        const errorRole = ValidationRole(role);
        
        let utilisateur = {nom, prenom,telephone, email, matricule, adresse, role}

        if(!errorPrenom || !errorNom || !errorEmail || !errorTelephone || !errorRole){
            createUsers(utilisateur).then(resp => {
                alert("Utilisateur cree avec success");
               // {handleClose();}
				setNom("");
				setPrenom("");
				setTelephone("");
				setEmail("");
				setRole("");
				setMatricule("");
				setAdresse("");
                
            })
        }else{
            setErrorPrenom(errorPrenom);
            setErrorNom(errorNom);
            setErrorEmail(errorEmail);
            setErrorTelephone(errorTelephone);
            setErrorRole(errorRole);
        }
      };
    return(
        <>



		<div className="authincation h-100">
		<div className="container h-100">
			<div className="row justify-content-center h-100 align-items-center">
			<div className="col-md-6">
				<div className="authincation-content">
				<div className="row no-gutters">
					<div className="col-xl-12">
					<div className="auth-form">
						<h4 className="text-center mb-4">Création de compte</h4>
						<form onSubmit={handlerAddUser}>
					<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Prénom <span className="text-danger">*</span></label> {errorPrenom && <span style={{color : "red"}}>{errorPrenom}</span>}
						<input className="form-control form-control-lg" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Nom <span className="text-danger">*</span></label> {errorNom && <span style={{color : "red"}}>{errorNom}</span>}
						<input className="form-control form-control-lg" type="text" value={nom} onChange={(e) => setNom(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Téléphone <span className="text-danger">*</span></label> {errorTelephone && <span style={{color : "red"}}>{errorTelephone}</span>}
						<input className="form-control form-control-lg" type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
						<label className="col-form-label">Email <span className="text-danger">*</span></label> {errorEmail && <span style={{color : "red"}}>{errorEmail}</span>}
						<input className="form-control form-control-lg" type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
						</div>
					</div>
				
					<div className="col-sm-6">  
						<div className="form-group">
						<label className="col-form-label">Matricule </label>
						<input type="text" className="form-control form-control-lg"  value={matricule} onChange={(e) => setMatricule(e.target.value)}/>
						</div>
					</div>
					<div className="col-sm-6">  
						<div className="form-group">
						<label className="col-form-label">Adresse </label>
						<input className="form-control form-control-lg" type="text"  value={adresse} onChange={(e) => setAdresse(e.target.value)}/>
						</div>
					</div>
				
					<div className="col-sm-12">
						<div className="form-group">{role}
						<label className="col-form-label">Role <span className="text-danger">*</span></label> {errorRole && <span style={{color : "red"}}>{errorRole}</span>}
						<select className="form-control form-control-lg" value={role} onChange={(e) => setRole(e.target.value)}>
							<option value="Administrateur">Administrateur</option>
							<option value="Directeur">Directeur</option>
							<option value="Secretaire">Secretaire</option>
						</select>
						</div>
					</div>
					
					</div>
					<div className="modal-footer">
				    <button  data-dismiss="modal" type="button"   class="btn btn-outline-secondary " > Fermer 
							</button>
					<button type="submit"  class="btn btn-outline-primary" > + Enregistrer 
							</button>
				</div>
					
				</form>
					{/* <form onSubmit={handlerAddUser}>
						<div className="form-group">
							<label><strong>Prénom</strong></label>
							<input type="text" className="form-control" placeholder="username" />
						</div>
						<div className="form-group">
							<label><strong>Nom</strong></label>
							<input type="text" className="form-control" placeholder="username" />
						</div>
						<div className="form-group">
							<label><strong>Téléphone</strong></label>
							<input type="tel" className="form-control" placeholder="username" />
						</div>
						<div className="form-group">
							<label><strong>Matricule</strong></label>
							<input type="text" className="form-control" placeholder="username" />
						</div>
						<div className="form-group">
							<label><strong>Email</strong></label>
							<input type="email" className="form-control" placeholder="hello@example.com" />
						</div>
						<div className="form-group">
							<label><strong>Adresse</strong></label>
							<input type="text" className="form-control" placeholder="username" />
						</div>
						<div className="form-group">
							<label><strong>Mot de passe</strong></label>
							<input type="password" className="form-control" defaultValue="" />
						</div>
						<div className="text-center mt-4">
							<button type="submit" className="btn btn-primary btn-block">Enregistrer</button>
						</div>
						</form> */}
						<div className="new-account mt-3">
						<p>Vous avez déja un compte? <a className="text-primary" >Connecter</a></p>
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
    );
}

export default Inscription;