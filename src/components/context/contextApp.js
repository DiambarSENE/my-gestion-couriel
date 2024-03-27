import { createContext, useContext, useState } from "react";

export const AppContextUser = createContext();
export const AppContextCouriel = createContext();
export const AppContextCategorie = createContext();
export const AppContextToken = createContext();
export const AppContextCourielArriverToday = createContext();
export const AppContextCourielArriverNotToday = createContext();
export const AppContextCourielDepartToday = createContext();
export const AppContextCourielDepartNotToday = createContext();
export const AppContextExpediteur = createContext();
export const AppContextDestinateur = createContext();
export const AppContextUserEmail = createContext();
export const AppContextRoleName = createContext();
export const AppContextMenuToggle = createContext();



export const useAppStateUser = () =>{
    const appStateUser = useState([]);
    return appStateUser;
};

export const useAppStateUserEmail = () =>{
    const appStateUserEmail = useState("");
    return appStateUserEmail;
};

export const useAppStateCouriel = () =>{
    const appStateCouriel = useState([]);
    return appStateCouriel;
};

export const useAppStateRoleName = () =>{
    const appStateRoleName = useState("");
    return appStateRoleName;
};

export const useAppStateCourielArriverToday = () => {
    const appStateCourielToday = useState([]);
    return appStateCourielToday;
};

export const useAppStateCourielArriverNotToday = () => {
    const appStateCourielNotToday = useState([]);
    return appStateCourielNotToday;
};
export const useAppStateCourielDepartToday = () => {
    const appStateCourielToday = useState([]);
    return appStateCourielToday;
};

export const useAppStateCourielDepartNotToday = () => {
    const appStateCourielNotToday = useState([]);
    return appStateCourielNotToday;
};

export const useAppStateCategorie = () =>{
    const appStateUser = useState([]);
    return appStateUser;
};

export const useAppStateExpediteur = () =>{
    const appStateExpediteur = useState([]);
    return appStateExpediteur;
};
export const useAppStateDestinateur = () =>{
    const appStateDestinateur = useState([]);
    return appStateDestinateur;
};

export const useAppStateToken = () => {
    const appStateToken = useState("");
    return appStateToken;
};


export const useAppStateMenuToggle = () => {
    const appStateMenuToggle = useState(false);
    return appStateMenuToggle;
};