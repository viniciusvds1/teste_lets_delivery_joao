# Use uma imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código do projeto para dentro do container
COPY . .

# Exponha a porta onde o servidor irá rodar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
