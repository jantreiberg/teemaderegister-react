FROM node:8.9-alpine

RUN mkdir -p /var/www/teemaderegister-react

WORKDIR /var/www/teemaderegister-react

COPY package.json /var/www/teemaderegister-react/package.json
COPY package-lock.json /var/www/teemaderegister-react/package-lock.json
COPY webpack.config.js /var/www/teemaderegister-react/webpack.config.js

RUN npm install

VOLUME /var/www/teemaderegister-react
