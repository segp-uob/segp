# Deploying with Docker
## Week 6: 16/03/2021
Docker is a great way to create a consistent runtime environment for your application. It ensures
that when you bundle up your project for others to compile and run you know the conditions present
at runtime. You'll remember that in workshop 1 we set up Docker on your machines. Now we will
integrate our site so far into a container so that it can be deployed and reproduced with ease.

In Docker, we talk about Images and Containers. Now, images can exist without containers, whereas a
container needs to run an image to run (an empty container is like a hard drive with no OS). In this
workshop we build an image (from a Dockerfile, which is a set of instructions) to run the
application. The image gives us an unchangeable run-time environment to run an application. Sound
confusing? It's much simpler to demonstrate - that's what we are going to do in this workshop.

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](https://web.microsoftstream.com/video/0b9aa4be-9072-4490-81c3-efceb2f62140)
> - [ ] Recommended: [Images and containers](https://stackify.com/docker-image-vs-container-everything-you-need-to-know/) (15 minutes)
***

## Create and test a Docker File

First we create a Dockerfile and first test the building of an individual image. Create the
Dockerfile: ```nano Dockerfile``` and add the template below:

```dockerfile
# We use the official image as a parent image.
FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory.
WORKDIR /home/node/app

# Copy the file(s) from your host to your current location.
COPY package*.json ./

# Change the user to node. This will apply to both the runtime user and the following commands.
USER node

# Run the command inside your image filesystem.
RUN npm install

COPY --chown=node:node . .

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "node", "server.js" ]
```

To build from the Dockerfile, we must then issue the command `docker build .`. This will use the
Dockerfile in the directory to create and save an image (which can't be changed). The first time
this is run it will take longer as the official base image will be downloaded (in our case alpine).
If this is successful you will see `Successfully built <imagename>`. Keep a note of the name of
this image.

The name of the image will be unique, and it must be rebuilt if you wish to change the image. This is
one of the advantages of Docker as this image can now be shared or used by someone looking to run
your app in a container (but we require dockerfiles & dockercompose files in your repo).

Once we have the container must expose port 3000 to the host for routing. This flag provides host->
container access and must map our server.js config:

```shell
docker run --publish 3000:3000 <nameofimage>
```

Notice --publish asks Docker to forward traffic incoming on the host’s port 8000 to the container’s
port 8080. Containers have their own private set of ports, so if you want to reach one from the
network, you have to forward traffic to it in this way.

Visit [http://locahost:3000](http://locahost:3000) and you should see your same Dashboard site, but this time served from the
image. Now we have successfully implemented a node application within a Docker container!

To stop the container from running issue:
```shell
docker ps -a
```
Then issue the command:

```shell
docker stop <nameofcontainer>
```

> Additionally, in order to carelessly run docker images without having to worry about having to clean
> them up later, you can run append the following flag: `--rm` to your `docker run` command, which 
> will automatically remove the image after it has run. For example:
> 
> ```shell
> # Runs the docker image called ubuntu.
> # -i      Keep STDIN open even if not attached
> # -t      Allocate Pseudo-TTY
> # --rm    Automatically remove the container when it exits
> #
> # <bash>  The name of the command to execute on the image, bash is the shell
> #         that will allow for more general interaction with different 
> #         programs, i.e. node if it's installed.
> 
> docker run -it --rm ubuntu bash
> ```
> 
> **Be careful! This will not just stop the image, it will also delete all of its data.**

# Multiple containers: Node & Mongo

The previous example would work perfectly well for a simple site, however, we are obviously using
MongoDB and ideally this would be hosted via a separate container on the same physical server. In
Docker terms this will be two separate containers which will communicate over a similar port
protocol. Because this requires some additional complexity we use Docker-compose to make the process
of starting all the required components automatic. You are required to use a Docker Compose YML so
that your system can be rebuilt easily. In the following steps we will create environmental
variables for our database, add a wait script to ensure the DB is running before Node tries to
connect and finally set up our existing Dockerfile and MongoDB containers to run automatically
together using Docker-compose. If you complete this section you will understand how the process
works and have a robust pipeline for shipping you application to practically any hosting provider.

## Environmental variables

When using a database we will, of course, be using sensitive information such as passwords to
authenticate our client. It's important that sensitive information such as usernames and passwords
are not stored in public git repos - this is a major security flaw. We therefore create a .env file
locally and save our credentials there:

Create a new file in the repo

```shell
nano .env
```

Add the following to the .env file and save:

```dotenv
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_password
MONGO_PORT=27017
MONGO_DB=meantest
```

Finally, you need to make sure the .env file is added to your gitignore:

```shell
nano .gitignore
```

Make sure to add .env to the .gitignore file otherwise you will be pushing your sensitive mongo
login details to a public repo!

## Wait script

To ensure that the MongoDB instance is running before we connect Node we need to add a wait
script. `./wait-for` is a script designed to synchronize services like docker containers. (It
is [sh](https://en.wikipedia.org/wiki/Bourne_shell) and [alpine](https://alpinelinux.org/)
compatible. It was inspired by [vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it),
but the core has been rewritten at [Eficode](http://eficode.com/)
by [dsuni](https://github.com/dsuni) and [mrako](https://github.com/mrako).)

So we need to create 'wait-for.sh' and make the script executable. Follow these steps:

```shell
wget -O wait-for.sh https://raw.githubusercontent.com/eficode/wait-for/master/wait-for
chmod +x wait-for.sh
```

## Create Docker Compose config to run

We must then create a docker compose file: `nano docker-compose.yml`, and a template is provided
below. Here we cite the .env file we just created, and the wait script as well as specifying the
Mongodb instance we need. You'll notice that here we set the published ports/mapping and command to
run our express server once the script has completed. We don't need a separate Mongodb Dockerfile
because we are just using the vanilla `mongo:4.1.8-xenial` instance.

```yaml
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

Now we need to see how we can start and use the Docker file we created through the docker-compose
script. We will be starting both Mongo and Node but clearly at the moment we are only using the Node
instance:

## Starting the services

We now have a 'production ready' environment automatically setup via docker-compose. Let's check its
working!
To start the service run:
```shell
docker-compose up -d
```
Stop the containers:
```shell
docker-compose down
```
List running containers:
```shell
docker ps
```

### Node

Visit the local site at [http://localhost:3000](http://localhost:3000) and you should see exactly 
the same site rendered as when running on your own machine.

### MongoDB

Testing your Mongo connection is a bit more difficult as we haven't made a connection yet. We can however test the connection, by asking the database to print out the stats with the following command:

```shell
echo 'db.stats()' | mongo localhost:27017
```

In this case, the mongo program will attempt to connect to mongo shell on the localhost (i.e. our machine) on port 27017, calling `db.stats()` once successful. This means that:  
  
a) We need to have the mongo shell installed on the local machine,  
b) The mongo database needs to be accessible on the localhost on port 27017.  

Because that is not exactly what we need to do, the query has to be modified to connect to our container running as part of the `docker-compose up` command. Furthermore, we need to make sure that the our **db** service is exposing the 27017 port. If our localhost already has this port taken, it would be advisable to expose it to a different port to easily differentiate between the mongodb running on our local machine and the one running in a container. The changes that will be needed in the docker-compose.yml will therefore be as follows:

```yml
...

  db:
    image: mongo:4.1.8-xenial
    container_name: db
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
      - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
    ports:             # <==
      - "27018:27017"  # <==  THIS IS THE ONLY CHANGE
    volumes:
      - dbdata:/data/db
    networks:
      - app-network

...
```

Once those changes take effect, we can simply query the database running in our container for the stats in a similar fashion, **making sure we use appropriate credentials!** If we were to try connecting to the database without these credentials, we would likely see invalid stats and an error message:

![image](https://user-images.githubusercontent.com/17514757/113408215-dad24680-93a6-11eb-91de-85e695102820.png)

If the credentials you use for the database service use $MONGO_USERNAME as the username and $MONGO_PASSWORD as the password, and these are pulled from the `.env` file, you will need to pass them to the connection string manually by looking up the values and substituting appropriate parts of the following command (without the triangular brackets):

```shell
echo "db.stats()" | mongo <mongo_username>:<mongo_password>@localhost:27018 

# For username=myUser and password=myPass, this would look like so:
# echo "db.stats()" | mongo myUser:myPass@localhost:27018 
```

Finally, the `ok` part of the output will let us know how many clients are successfully connected to our database:

![image](https://user-images.githubusercontent.com/17514757/113408068-8e870680-93a6-11eb-9a5b-24f29857a078.png)


## Going further
[Full Docker overview](https://www.youtube.com/watch?v=fqMOX6JJhGo)
