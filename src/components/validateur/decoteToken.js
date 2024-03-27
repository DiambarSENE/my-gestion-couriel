// npm install jsonwebtoken

// import jwt from 'jsonwebtoken';

// export const decodeJWT = (token) => {
//     try {
//         const decodedToken = jwt.decode(token);
//         return decodedToken;
//     } catch (error) {
//         console.error('Erreur de décodage du token JWT', error);
//         return null;
//     }
// };
//Fonction pour décoder le token JWT (vous pouvez utiliser une bibliothèque comme 'jsonwebtoken')
export const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    } catch (error) {
        console.error('Erreur de décodage du token JWT', error);
        return null;
    }
};
