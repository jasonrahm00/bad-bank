FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/frontend

COPY ./frontend/package*.json /app/frontend/

RUN npm install

RUN npm build

COPY . .

CMD [ "npm", "start" ]