# Continious Integration

Continuous integration (CI) is the practice of merging all developers' working copies to a shared branch regularly. Think of this workshop as focusing on *how* we work together effectivly to build complex software. Your CI pipeline (or process) will need to be agreed and shared with your team up front (but it can change) so this workshop is focused more on describing the principles that we will be looking for and how to develop *your* process. There isn't one right way of doing this stuff so better to have an agreed set of processes than a load of tools not everyone understands. A bit of time spent on your process early on will help as you progress.

> ### Milestone checklist
> - [ ] Essential: Workshop walkthrough
> - [ ] Recommended: [Watch CI Explained (20 minutes)](https://www.youtube.com/watch?v=XusC2o-Y_fU)
> - [ ] Essential: Clone the template repository
> - [ ] Essential: Setup Docker
> - [ ] Essential: Make sure your whole team has cloned & can commit!
> - [ ] Recommended: Schedule 15 minute team standups. [Guide to standups](https://www.range.co/blog/complete-guide-daily-standup-meeting-agenda)
***

# Expectations

You're not expected to build *everything* in the CI introduction video, or in a way that is fully automated, however, it's important that your team has some coverage and understanding of all of the stages. All professional software development teams will have their own CI process. It is basically impossible to develop complex software without integrating and testing code in a robust and systematic way. 

> #### ! Watch out !
> "Everyone in your team will have some parts of the codebase that they are responsible for. Everyone will be working at the same time. CI is about making all the parts work together in a way that is testable, robust and clear. Assembling different modules just before submission is *not acceptable* and your team will be expected to show an iterative and clear commit log starting early in the project. If you're reading this for the first time two weeks before submission - good luck."

## The workflow
We define the central workflow (for this Unit) below. We expect to see code being merged progressively through this pipeline (ie from branch to branch):
```
Development -> build -> release -> production
```
The important point here is that development is controlled and managed in a systematic way. Commits should be small, testable, tested and clear. And perhaps most importantly - your production/live version is fully working! So, in your teams as a minimum to achieve this you will need to:

- Implement version control using a public Github repo and setup Dev(master), Staging and Live branches. Perhaps assign one person who is responsible for moving code between these top level branches.
- Write tests for the critical components in your code base (and treat your tests as production code). These tests should cover UAT (User Acceptance) and functional/unit tests. We will cover tests in more detail later.
- Get a suitable continuous integration and delivery service that will enable you to run those tests on every push to the repository and also deploy your builds where you need them. This might be as simple as adding a script into your Dockerfile or you might use something more complicated.

There are tools such as Jenkins, Github workflow and Gitlab which can be used to automate the CI pipeline, however, this is not necessary and isn't covered in detail in this set of workshops. It's much better to have something simple (like having someone responsible for running a build script) that everyone understands rather than something fancy. You might want to explore these tools as a team but only if you have time. What's important is being able to prove you *know* code is production ready!

## Keep the pipeline moving: Hold Standups!

(Holding standups (and keeping records!) is part of the marking scheme!)

The most productive and easy way to achieve iterative and continious integration is to hold regular 15 minute(max) standup meetings with your whole team. This would ideally be daily when you are focusing on delivering key features; but flex to suit. Standups keeps your team together and focused on progress. These meetings are not where work gets done they are for managing the process overall. Even if members aren't working on tasks that day - *everyone* must attend.
>### Example agenda
> - Start: time—Set a start time based best fit for everyone. Keep it the same. Early is best.
> - Begin: Get in your huddle and select the first person. This can be the person who entered the (virtual) meeting room last.
> - Answer: the 3 questions with a strict time limit of 60 seconds:
>>1. What did you do yesterday/last week?
>>2. What will you do today/this week?
>>3. What blockers stand in your way?
> - End: Close out the meeting with a team clap, cheer, or reminder of progress you've made so far.
> - Do not exceed 15 minutes!

* * *
# Version control
The best way to learn how to use Github is to start building an awesome project with your team! It's very straightforward once you get used to it. Good version control is critical for well managed software development which is why using Github properly is essential for passing this unit.

> - Introduction to Git (60 minutes) [Start](https://lab.github.com/githubtraining/introduction-to-github)

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

When it comes to hosting these files remotely, everything required to render your application, is now contained within this /dist folder (after build). You could throw away your src files now (don't). When you create a project using AngularCLI your folder will already be initialised as a git repo. However, this will only exist on your local machine. So the first step is to make sure our project is added to a remote git repository. Use git status to check whether there is an upstream repository already:
```
git status
```
 Make sure you are in the root of your project and add the remote: 
```
git remote add origin https://github.com/<username>/<repositoryname>.git
```
Check git status again to make sure this is setup. 

# Docker background

We are using containers to ensure consistency in environments and to ease deployment. Because all project teams are required to use Docker images it makes sense for everyone to understand what they are, how they are used, and be able to deploy a containerised image on their own machine (minimum!!). 

Containers are relevant for CI given we are looking to test our system in a reproducable way and want to be able to migrate across systems, hosting providers and machines with easy whilst knowing that conditions remain constant. Docker is language agnostic; think of it like a tool for buiding environments using a script which allows anyone anywhere to reproduce not just your source code but all your dependancies and system conditions. Steps for your project: 

* Make sure to add docker builds (Dockerfile/Docker-compose.yml) into your CI pipeline, so that everyone can use Docker at the stage of CI. All team members should be able to easily deploy your product using only the docker-compose yml.
* Dockerfiles/compose scripts should be visible in your repositories.
* If you're feeling fancy you could explore how to use a Github commit trigger and build the repos according to the Dockerfile in that repo.

 You don't need to know everything about Docker to use the templates we've setup for you in this workshop (and your own projects). Everyone should probably read the overview below, however, if you're interested and want to go further in your use of containerisation watch the full introduction below. 

> - [Quick overview](https://docs.docker.com/get-started/overview/)(10 minutes)
> - [Full introduction](https://www.youtube.com/watch?v=fqMOX6JJhGo )(120 minutes)

## Dockerfile

"A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession." 

### Requirements

To use Docker in your build process you need to make sure you have the following: 

1.Docker
2.Docker compose
3.Sudo rights

### Required base Docker Containers

If you follow our suggestion to use the MEAN stack, we provide two standard Docker containers maintianed by the Docker team directly (secure). To find out more about the containers and how they are setup visit the following links:

1. [Node](https://hub.docker.com/_/node)
2. [MongoDB](https://hub.docker.com/_/mongo)

We then use *Docker Compose* to coordinate the deployment and connection of the two containers on the system (front and back). Think of Docker-compose as a chef - Dockerfiles are the receipes.  We use *Docker Files* as the method by which we configure our exact image for deployment in a container. An image, once built, cannot be changed without rebuilding from a Dockerfile. Follow the steps set out in this worksheet and you should have a working environment you can replicate and reuse. 

## Understanding containers

> - [Docker practical tutorial (60 minutes)](https://github.com/docker/labs/tree/master/beginner)
> - If you have a particular interest in Devops continue further in the Docker tutorials. 
