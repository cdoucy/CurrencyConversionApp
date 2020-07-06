FROM node:13.2.0-alpine as build

WORKDIR /public

COPY front/ .

RUN npm install

RUN npm run build

WORKDIR /app

COPY back/package.json .

RUN npm install

COPY back/ .

RUN npm run build

CMD npm run start