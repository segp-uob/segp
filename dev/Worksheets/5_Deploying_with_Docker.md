# Deploying with Docker

In workshop 1 we setup Docker on your machines. Now we will integrate our site so far into a container so that it can be deployed and reproduced with ease. 

In Docker we talk about Images and Containers. Now images can exist without containers, whereas a container needs to run an image to exist. In this workshop we build an image to run the application using a pre-built container. The image produces an unchangable run-time environment to run an application. 

> ### Milestone checklist
> - Essential: Workshop walkthrough
> - Essential: 
> - Recommended: [Images and containers (15 minutes)](https://stackify.com/docker-image-vs-container-everything-you-need-to-know/)
***

## Create and test a Docker File

First we create a Dockerfile and first test the building of an individual image. Create the Dockerfile: ```nano Dockerfile``` and add the template below:

```
FROM node:10-alpine
# We use the official image as a parent image.
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Set the working directory.
WORKDIR /home/node/app
# Copy the file from your host to your current location.
COPY package*.json ./
USER node
# Run the command inside your image filesystem.
RUN npm install
COPY --chown=node:node . .
# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3000
# Run the specified command within the container.
CMD [ "node", "server.js" ]
```

To build from the Dockerfile, we must then issue the command ```docker build .```. This will use the Dockerfile in the directory to create and save an image (which can't be changed). The first time this is run it will take longer as the official base image will be downloaded (in our case alpine). If this is sucessful you will see ```Successfully built <imagename>```. Keep a note of the name of this image. 

The name of the image will be unique and it must be rebuilt if you wish to change the image. This is one of the advantages of Docker as this image can now be shared or used by someone looking to run your app in a container (but we require dockerfiles & dockercompose files in your repo). 

Once we have the container must expose port 3000 to the host for routing. This flag provides host->container access and must map our server.js config: 

```
docker run --publish 3000:3000 <nameofimage>
```
Notice --publish asks Docker to forward traffic incoming on the host’s port 8000 to the container’s port 8080. Containers have their own private set of ports, so if you want to reach one from the network, you have to forward traffic to it in this way.

Visit locahost:3000 and you should see your same Dashboard site, but this time served from the image. Now we have sucessfully implimented a node application within a Docker container! 

To stop the container from running issue:
```$ docker ps -a```
Then issue the command: 
```
docker stop <nameofcontainer>
```

# Multiple containers: Node & Mongo

The previous example would work perfectly well for a simple site, however, we are obviously using MongoDB and ideally this would be hosted via a separate container on the same physical server. In Docker terms this will be two separate containers which will communicate over a similar port protocol. Because this requires some additional complexity we use Docker-compose to make the process of starting all the required components automatic. You are required to use a Docker Compose YML so that your system can be rebuilt easily. In the following steps we will create environmental variables for our database, add a wait script to ensure the DB is running before Node tries to connect and finally setup our existing Dockerfile and MongoDB containers to run automatically together using Docker-compose. If you complete this section you will understand how the process works and have a robust pipeline for shipping you application to practically any hosting provider. 

## Environmental variables

When using a database we will, of course, be using sensitive information such as passwords to authenticate our client. It's important that sensitive information such as usernames and passwords are not stored in public git repos - this is a major security flaw. We therefore create a .env file locally and save our credentials there:

Create a new file in the repo
```
nano .env
```

Add the following to the .env file and save:

```
MONGO_USERNAME=sammy
MONGO_PASSWORD=your_password
MONGO_PORT=27017
MONGO_DB=sharkinfo
```
Finally, you need to make sure the .env file is added to your gitignore:
```
nano .gitignore
```
Add .env to the .gitignore file. 

## Wait script

To ensure that the MongoDB instance is running before we connect Node we need to add a wait script. `./wait-for` is a script designed to synchronize services like docker containers. (It is [sh](https://en.wikipedia.org/wiki/Bourne_shell) and [alpine](https://alpinelinux.org/) compatible. It was inspired by [vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it), but the core has been rewritten at [Eficode](http://eficode.com/) by [dsuni](https://github.com/dsuni) and [mrako](https://github.com/mrako).)

So we need to create 'wait-for.sh' and make the script executable. Follow these steps: 

```
wget -O wait-for.sh https://raw.githubusercontent.com/eficode/wait-for/master/wait-for
chmod +x wait-for.sh
```

## Create Docker Compose config to run

We must then create a docker compose file: ```nano docker-compose.yml``` and a template is provided below. Here we cite the .env file we just created and the wait script as well as specifying the Mongodb instance we need. You'll notice that here we set the published ports/mapping and command to run our express server once the script has completed. We don't need a separate Mongodb Dockerfile because we are just using the vanilla mongo:4.1.8-xenial instance. 

```
version: '3'

services:
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_USERNAME=$MONGO_USERNAME
      - MONGO_PASSWORD=$MONGO_PASSWORD
      - MONGO_HOSTNAME=db
      - MONGO_PORT=$MONGO_PORT
      - MONGO_DB=$MONGO_DB
    ports:
      - "3000:3000"
    volumes:
      - .:/home/node/app
      - node_modules:/home/node/app/node_modules
    networks:
      - app-network
    command: ./wait-for.sh db:27017 -- /home/node/app/node_modules/.bin/nodemon server.js

  db:
    image: mongo:4.1.8-xenial
    container_name: db
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
      - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
    volumes:
      - dbdata:/data/db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  dbdata:
  node_modules:
```
# Using the Docker template

Now we need to see how we can start and use the Docker file we created through the docker-compose script. We will be starting both Mongo and Node but clearly at the moment we are only using the Node instance: 

## Starting the services

We now have a 'production ready' environment automatically setup via docker-compose. Lets check its working!
To start the service run: 
```docker-compose up -d```
Stop the containers: 
```docker-compose down```
List running containers: 
```Docker ps```

### Node

Visit the local site at localhost:3000 and you should see exactly the same site rendered as when running on your own machine. 

### MongoDB

Testing your Mongo connection is a bit more difficult as we haven't made a connection yet. Therefore use the following for a (1) return on success:
```
echo 'db.stats().ok' | mongo localhost:27017 --quiet
```
## Going further
