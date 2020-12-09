# Continious integration

Continuous integration (CI) is the practice of merging all developers' working copies to a shared branch regularly. Ideally building, testing and deployment is automated. We will be doing a lot of testing as we build our SPA right from simple complications and serving right through to automated unit testing. Your CI pipeline (or process) will need to be agreed and shared with your team so this workshop is focused more on describing the principles that we will be looking for and how to develop a pipeline.

> Watch CI Explained (20 minutes): https://www.youtube.com/watch?v=XusC2o-Y_fU

To note: you're not expected to build *everything* in the introduction video, or in a way that is fully automated, however, it's important that your team has some coverage at all of the stages:
```
src(Dev) -> build -> release(Staging) -> production(Live)
```
In your teams as a minimum you will need to:

- Implement version control using a public Github repo and setup Dev(master), Staging and Live branches. You can use the template repository <here>
- Setup Staging and Live environments aligned to Staging and Live branches as in the template above.
- Write tests for the critical components in your code base (and treat your tests as production code). These tests should cover UAT (User Acceptance) and functional/unit tests. 
- Get a suitable continuous integration and delivery service that will enable you to run those tests on every push to the repository and also deploy your builds where you need them. This might be as simple as adding a script into your Dockerfile.

There are tools such as Jenkins and Gitlab which can be used to automate the CI pipeline, however, this is not necessary and isn't covered in detail in this set of workshops. You might want to explore these tools as a team. The benefits of doing it this way are fast feedback, no surprises, detect issues early & improve testability. We will be covering 1,2 and some elements of 3, however, it's important that as a team you agree how best testing should work on your system. 

# Version control

## Branches and stages

Your git repo will allow you to create branches. As a minimum your team will need a master branch which is setup by default. It's probably easiest if this master is used as your development branch and it should be the most current version of the code shared by all developers. You will also need to have Live and Staging branches to allow a CI process. Live and Staging should also have corresponding 'environments' which we are configuring using Docker. Environments (eg served files/running systems) allow the code produced to be tested. So 'branches' should match up with 'environments' as follows:

### Live (live branch)

Your Live branch should be a version of your code which is production ready. The contents of your Express API, Angular dist and Mongo scripts should be fully tested and ready to serve 'customers' in this state. Your docker compose and dockerfiles should create instances which will serve exactly the features required to your customers. 

### Staging (staging branch)

Your Staging or sometimes called 'release' version should be where you complete a significant set of user tests and unit tests. Staging is your first opportunity to make sure that there are no issues with the feature you're deploying from your dev branch - but before pushing code to Live! Once fully tested staging features are merged with Live by the RO or PO.

### Dev (master branch)

Your dev branch is where the work happens! Usually the 'environment' for this stage is on developer's local machines serving locally (or via a Docker container). As developers we spend most of our time in development. When in development, you create a feature branch (off of development), complete the feature, and then merge back into development. This can then be added to the final version by merging into Staging. Therefore in reality a developer might also have lots of 'local' sub branches of the main dev branch -> but they should only merge and commit code they are happy with and is finalised. 

Beacause this 'dev' branch should be updated by all your developers and will be a working, moving copy of the latest shared version of your code. Perhaps using the 'Master' branch as your 'dev' is a good idea as when commits are accepted onto your dev (master) branch they should then be merged onto your staging environment for proper testing. 

## Setting upstream repository

During development of a Typescript based site (such as those built with Angular) you typically use the ng serve command to build, watch, and serve the application from local memory (covered in these worksheets), using webpack-dev-server. When you are ready to deploy, however, you must use the ng build command to build the app and deploy the build artifacts elsewhere. By deafult this will locally create the static build files in your /dist folder...

Both *ng build* and *ng serve* clear the output folder before they build the project, but only the *ng build* command writes the generated build artifacts to the output folder (/dist).

When it comes to hosting these files remotely, everything required to render your application, is now contained within this /dist folder (after build). When you create a project using AngularCLI your folder will already be initialised as a git repo. However, this will only exist on your local machine. So the first step is to make sure our project is added to a remote git repository. Use git status to check whether there is an upstream repository already:
```
git status
```
 Make sure you are in the root of your project and add the remote: 

```
git remote add origin https://github.com/<username>/<repositoryname>.git
```
Check git status again to make sure this is setup. 

# Docker

We are using containers to ensure consistency in environments and to ease deployment. Because all project teams are required to use Docker images it makes sense for everyone to understand what they are, how they are used, and be able to deploy a containerised image on their own machine (minimum!!). 

Containers are relevant for CI given we are looking to test our system in a reproducable way and want to be able to migrate across systems, hosting providers and machines with easy whilst knowing that conditions remain constant. Docker is language agnostic; think of it like a tool for buiding environments using a script which allows anyone anywhere to reproduce not just your source code but all your dependancies and system conditions. Steps for your project: 

* Make sure to add docker builds (Dockerfile/Docker-compose.yml) into your CI pipeline, so that everyone can use Docker at the stage of CI. All team members should be able to easily deploy your product using only the docker-compose yml.
* Dockerfiles/compose scripts should be visible in your repositories.
* If you're feeling fancy you could explore how to use a Github commit trigger and build the repos according to the Dockerfile in that repo.

 You don't need to know everything about Docker to use the templates we've setup for you in this workshop (and your own projects). Everyone should probably read the overview below, however, if you're interested and want to go further in your use of containerisation watch the full introduction below. 

Quick overview (10 minutes): https://docs.docker.com/get-started/overview/
Full introduction (120 minutes): https://www.youtube.com/watch?v=fqMOX6JJhGo 

## Dockerfile

"A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession." 

### Requirements

To use Docker in your build process you need to make sure you have the following: 

1.Docker
2.Docker compose
3.Sudo rights

### Required base Docker Containers

If you follow our suggestion to use MEAN: We provide two standard Docker containers maintianed by the Docker team directly (secure). To find out more about the containers and how they are setup visit the following links:

1. https://hub.docker.com/_/node
2. https://hub.docker.com/_/mongo

We then use *Docker Compose* to coordinate the deployment and connection of the two containers on the system (front and back). Think of Docker-compose as a chef - Dockerfiles are the receipes.  We use *Docker Files* as the method by which we configure our exact instance. Follow the steps set out in this worksheet and you should have a working environment you can replicate and reuse. 

## Understanding containers

Docker practical tutorial (60 minutes): https://github.com/docker/labs/tree/master/beginner
If you have a particular interest in Devops continue further in the Docker tutorials. 
