# Use uma imagem base do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos de código para o container
COPY . .

# Compile o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta da API
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
