#  Dockerfile for Node Express Backend

FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/


RUN npm install --silent

# Copy app source code
COPY . usr/src/app

# Exports
EXPOSE 5000

CMD ["npm","start"]