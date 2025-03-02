# Use uma imagem oficial do Node.js como imagem base
FROM node:22-alpine3.20

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Adiciona ./node_modules/.bin ao PATH
ENV PATH ./node_modules/.bin:$PATH

# Copia o restante do código da aplicação
COPY . .

# Comando para executar a aplicação
CMD ["npm", "run", "dev"]