
# Example container based MEAN application

Here we have a Docker based implimentation of the MEAN stack using Docker-compose to orchastrate deployment. 

## Requirements

1.Docker
2.Docker compose
3.Sudo rights

## Containers

We use two standard Docker containers maintianed by the Docker team directly (secure). To find out more about the containers and how they are setup visit the following links:

1. https://hub.docker.com/_/node
2. https://hub.docker.com/_/mongo

We use Docker Compose to coordinate the deployment and connection of the two containers on the system. 

## Getting started

### Environmental variables

It's important that sensitive information such as usernames and passwords are not stored in git repos. We therefore create a .env file locally and save our credentials there:

### Starting the services

To start the service run: 
```docker-compose up -d```
Visit the local site at: https://0.0.0.0/
Stop the containers: 
```docker-compose down```
List running containers: 
```Docker ps```

## Docker Exec

To interact with containers that are actively running headless once started with Docker-compose:

```docker exec -it CONTAINER COMMAND```
