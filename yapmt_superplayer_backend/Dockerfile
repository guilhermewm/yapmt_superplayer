FROM node:10

WORKDIR /usr/src/moodbox_backend

COPY package*.json ./

RUN npm install

RUN npm install nodemon -g

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "prod"]