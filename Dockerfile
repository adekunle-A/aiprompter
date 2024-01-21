FROM node:21-alpine

#create a user with permission to run the app rather than runing the app as a root user
# -S =>  create a system user
# -G =>  add the user(app) to a group 
RUN addgroup app && adduser -S -G app app

#set the user to run the app
USER app

#set the working directory to /app
WORKDIR /app

#copy package.json and package-locjk.json to the workig directory 
#This is done before copying the rest of the file to take advantage of the Docker cqche
COPY package*.json ./

#change ownership of the working file to user to prevent EACCES:persiommison diened error 
#becuase sometime ownership of the files in the working directo is changed to root.
USER root

#change ownwership of app directory to app user 
# chown -R <user>:<group> <directory>
RUN chown -R app:app .

#install all dependencies using npm install
RUN npm install

#copy the rest of the file 
COPY . .

#expose the port where this app can be accessed
EXPOSE 3000

CMD npm run dev