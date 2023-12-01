FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "start" ]