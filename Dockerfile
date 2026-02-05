FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y lock para cache
COPY package*.json ./

# Instalamos SOLO dependencias de producción
RUN npm install --production

# Copiamos el código
COPY . .

# Puerto de la API
EXPOSE 3000

# Arranque
CMD ["npm", "run", "start"]
