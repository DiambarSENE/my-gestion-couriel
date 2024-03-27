import axios from "axios";

// Fonction pour récupérer le token depuis le localStorage
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};
export const getAuthEmail = () => {
    return window.localStorage.getItem('auth_email');
};
export const getAuthRoleName = () => {
    return window.localStorage.getItem('auth_role');
};
// Fonction pour stocker le token dans le localStorage
export const setAuthHeader = (token, email, role) => {
    window.localStorage.setItem('auth_token', token);
    window.localStorage.setItem('auth_email', email);
    window.localStorage.setItem('auth_role', role);
};

// Fonction pour supprimer le token du localStorage
export const deleteToken = () => {
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('auth_email');
    window.localStorage.removeItem('auth_role');
}

export const backEndApi = axios.create({
   
    //baseURL: "http://depinfo-dev.tech:8087",
     baseURL: "http://localhost:8087",
    //baseURL: "http://178.16.129.206:8087",
});



//Utilisation d'un intercepteur de requête pour ajouter conditionnellement le header Authorization
backEndApi.interceptors.request.use(
    config => {
      // Ici, vous pouvez ajouter une logique pour déterminer si la requête nécessite une authentification
      // Par exemple, vérifier l'URL ou une partie de l'URL
      const requiresAuth = true; // Mettez votre propre condition ici
  
      if (requiresAuth) {
        const authToken = getAuthToken();
        if (authToken) {
          config.headers['Authorization'] = `Bearer ${authToken}`;
        }
      }
  
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export const createUsers = (user) => {
    return backEndApi.post("/users/ajouter", user)
};

export const getUsers = () => {
    return backEndApi.get(`/users/getAll`);
};


export const deleteUsers = (id) => {
    return backEndApi.delete("/users/delete/"+id);
};

export const updateUser = (user) => {
    return backEndApi.patch("/users/update", user);
};

export const updatePassword = (email, password, newPassword) => {
    return backEndApi.patch(`/users/updatePassword/${email}/${password}/${newPassword}`);
}

export const getUserById = (idUser) => {
    return backEndApi.get(`/users/getUserById/${idUser}`);
};

export const getUserByEmail = (email) => {
    return backEndApi.get(`/users/getUserByEmail/${email}`);
};
export const getUserByToken = (token) => {
    return backEndApi.get(`/users/getUserByToken/${token}`);
};
export const getConnexion = (user) => {
    return backEndApi.post("/users/connexion", user);
};

export const getDeconnexion = () => {
    return backEndApi.post("/users/deconnexion")
};

// export const updateProfilePhoto = (user) => {
//     return backEndApi.patch("/users/updateProfilePhoto", user);
// };

//  ROLE ==================     Role      ========================== ROLE
export const addRole = (role) => {
    return backEndApi.post("/role/addRole", role)
};

export const getAllRoles = () => {
    return backEndApi.get(`/role/getAllRoles`);
};

export const deleteRole = (id) => {
    return backEndApi.delete(`/role/deleteRole/${id}`);
};

export const updateRole = (role) => {
    return backEndApi.put("/role/updateRole", role);
};

export const getRoleByUser = (userId) => {
    return backEndApi.get(`/role/getRoleByUser/${userId}`);
};

export const getRoleById = (roleId) => {
    return backEndApi.get(`/role/getRoleById/${roleId}`);
};


//  Categorie ==========================  Categorie ====================== Categorie


export const createCategory = (category) => {
    return backEndApi.post("/category/addCategory", category);
};

export const updateCategory = (category) => {
    return backEndApi.put("/category/updateCategory", category);
};

export const getCategoryById = (categoryId) => {
    return backEndApi.get(`/category/getCategoryById/${categoryId}`);
};

export const deleteCategoryById = (categoryId) => {
    return backEndApi.delete(`/category/deleteCategory/${categoryId}`);
};

export const getAllCategorys = () => {
    return backEndApi.get("/category/getAllCategorys");
};



//  Couriel Arriver ==========================  Couriel Arriver ====================== Couriel Arriver


export const createCourielArriver = (couriel) => {
    return backEndApi.post("/couriel/addCourielArriver", couriel);
};

export const updateCourielArriver = (couriel) => {
    return backEndApi.put("/couriel/updateCourielArriver", couriel);
};

export const getCourielArriverById = (courielId) => {
    return backEndApi.get(`/couriel/getCourielArriverById/${courielId}`);
};

export const getFilePdfArriver = (nameFilePdf) => {
    return backEndApi.get(`/couriel/getFilePdfArriver/${nameFilePdf}`);
};

export const getAllCourrielsArriverToday = () => {
    return backEndApi.get(`/couriel/getAllCourrielsArriverToday`);
};
export const getAllCourrielsArriverNotToday = () => {
    return backEndApi.get(`/couriel/getAllCourielsArriverNotToday`);
};

export const deleteCourielArriverById = (courielId) => {
    return backEndApi.delete(`/couriel/deleteCourielArriver/${courielId}`);
};

export const getAllCourielsArriver = () => {
    return backEndApi.get("/couriel/getAllCourielsArriver");
};

//  Couriel Depart ==========================  Couriel Depart ====================== Couriel Depart


export const createCourielDepart = (couriel) => {
    return backEndApi.post("/couriel/addCourielDepart", couriel);
};

export const updateCourielDepart = (couriel) => {
    return backEndApi.put("/couriel/updateCourielDepart", couriel);
};

export const getCourielDepartById = (courielId) => {
    return backEndApi.get(`/couriel/getCourielDepartById/${courielId}`);
};

export const getFilePdfDepart = (nameFilePdf) => {
    return backEndApi.get(`/couriel/getFilePdfDepart/${nameFilePdf}`);
};

export const getAllCourrielsDepartToday = () => {
    return backEndApi.get(`/couriel/getAllCourrielsDepartToday`);
};
export const getAllCourrielsDepartNotToday = () => {
    return backEndApi.get(`/couriel/getAllCourielsDepartNotToday`);
};

export const deleteCourielDepartById = (courielId) => {
    return backEndApi.delete(`/couriel/deleteCourielDepart/${courielId}`);
};

export const getAllCourielsDepart = () => {
    return backEndApi.get("/couriel/getAllCourielsDepart");
};

//  Destinateur ==========================  Destinateur ====================== Destinateur


export const createDestinateur = (destinateur) => {
    return backEndApi.post("/destinateur/addDestinateur", destinateur);
};

export const updateDestinateur = (destinateur) => {
    return backEndApi.put("/destinateur/updateDestinateur", destinateur);
};

export const getDestinateurById = (destinateurId) => {
    return backEndApi.get(`/destinateur/getDestinateurById/${destinateurId}`);
};

export const deleteDestinateurById = (destinateurId) => {
    return backEndApi.delete(`/destinateur/deleteDestinateur/${destinateurId}`);
};

export const getAllDestinateurs = () => {
    return backEndApi.get("/destinateur/getAllDestinateurs");
};

//  Expediteur ==========================  Expediteur ====================== Expediteur


export const createExpediteur = (expediteur) => {
    return backEndApi.post("/expediteur/addExpediteur", expediteur);
};

export const updateExpediteur = (expediteur) => {
    return backEndApi.put("/expediteur/updateExpediteur", expediteur);
};

export const getExpediteurById = (expediteurId) => {
    return backEndApi.get(`/expediteur/getExpediteurById/${expediteurId}`);
};

export const deleteExpediteurById = (expediteurId) => {
    return backEndApi.delete(`/expediteur/deleteExpediteur/${expediteurId}`);
};

export const getAllExpediteurs = () => {
    return backEndApi.get("/expediteur/getAllExpediteurs");
};