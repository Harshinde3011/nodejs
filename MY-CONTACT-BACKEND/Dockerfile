FROM node:20.20.0-alpine

#create a app directory
WORKDIR /app

#install all dependencies
COPY package*.json ./

#run npm install
RUN npm install

#copy all source code 
COPY . .

#expose app on port 3001
EXPOSE 3001

#cmd to execute while creating container
CMD [ "npm", "start" ]