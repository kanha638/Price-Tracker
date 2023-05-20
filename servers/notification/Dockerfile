# Use an official Node.js runtime as the base image
FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . . 

EXPOSE 4200

CMD ["npm","run","dev"]

