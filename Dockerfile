# Utilisez une image Node.js comme base pour construire l'application
FROM node:18.2.0-alpine AS build-stage
ENV NODE_ENV production

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Construisez l'application React pour la production
RUN npm run build

# Utilisez une image légère basée sur Nginx pour servir les fichiers statiques
FROM nginx:1.21.4-alpine as production

ENV NODE_ENV production

# Copiez les fichiers construits à partir de l'étape précédente
COPY --from=build-stage /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exposez le port sur lequel l'application sera accessible
EXPOSE 81
# Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]

 

