FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/frontend

COPY /frontend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]