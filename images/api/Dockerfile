
FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet

RUN npm install -g nodemon

RUN npm install -g knex


COPY ./ ./ 

CMD ["npm", "start"]


