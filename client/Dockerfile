# Dockerfile for React client

# Build react client
FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/src/app/my-app

COPY package.json /usr/src/app/my-app
COPY package-lock.json /usr/src/app/my-app

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
