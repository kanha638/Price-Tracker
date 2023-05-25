# Use an official Node.js runtime as the base image
FROM node:16-alpine

WORKDIR /app

COPY package*.json .
COPY yarn.lock yarn.lock
# RUN npm install -g yarn
RUN yarn install
COPY . . 
EXPOSE 3000

CMD ["npm","start"]

