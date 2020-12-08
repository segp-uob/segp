# Full stack Dashboard

This set of worksheets (and accompanying videos) is based around building an example Dashboard application based around the MEAN stack. We build the dashboard from the 'ground up' and demonstrate how to integrate charts in the front end and call data (via a RESTful API) from a database. To improve portability and ease deployment we use Docker to manage the environment and ensure that others can easily recreate our system. Your final project must be submitted in a way which can be replicated easily; and Docker is the suggested tool deploying as it makes setting up instances of Node and Mongo very easy. 


# Getting started

This first worksheet is focused on making sure your development environment is setup exactly how you need. Time spent checking the basics will make sure you aren't stressing later on. Each member of the group should ensure they have the development tools setup; but of course each team should have only one git repository so you'll need to decide who will make the first push (then everyone else clones). Your repository should probably contain both the source and distribution files as well as any docker compose scripts and docker files (but not any environmental variables such as passwords!). 

We will be developing Angular applications using the AngularCLI. AngularCLI is basically a really useful tool for quickly prototyping with bolierplate code; it saves a great deal of manual work (but you could use Angular directly if you want!!). The AngularCLI example will be the basis for these worksheets and your own projects. 

Angular is built in Typescript; which is basically JS with classes. TypeScript is designed for development of large applications and transcompiles to JavaScript.

Follow each of the steps in these worksheets and you will learn the basics of Angular, Express, Node, Mongo and Docker - enough to get your own project out of the ground. 

# How these workshops work

By following the workshops you will gradually learn each stage of building the 'full stack' in a simple and not-very-featured way. We aim to give you the tools to build your own far-more-featured product. If you already have experience of a particular tool or language you might want to skip or just get started with your own project. You can refer to the 'final' working version of the application we will build gradually through these workshops and this is a useful debugging resource if you are struggling to get things working. 

# Install the basics

Get your system ready to start working with the MEAN stack...
All instructions are based on Ubuntu OS, however, many will work exactly the same on MacOS. You might need to do some searching to find different commands under other operating systems, however, the principles and packages are always the same. 

## npm and Docker

npm (originally short for Node Package Manager) helps us manage JS packages and dependancies. We need it to install AngularCLI. We will install npm via the master NodeJS package. The key steps in this session are to: 

- Ensure you have a current install of npm
- Ensure you have a current install of NodeJS
- Ensure you have a current install of Angular CLI
- Setup the new site as an upstream Git repo

In the next workshops we are going to be using Docker and Docker-compose for running production containers. So now is also a good time to make sure you have these installed:

- Docker
- Docker-compose

Because of the way Docker works it is just not possible to install Docker without Sudo rights. This is no issue on your own machines, but if you're using a lab machine, this will need to be completed inside a Vagrant VM so you can sudo. For non-linux builds you might also need some specific native packages depending on your operating system (like build-essential on Ubuntu). Try installing these packages first but bear in mind you might need to fault find until it works!

## Using VM?

I wouldn't recommend using Docker within a VM (such as Virtual Box) if you can avoid it. Docker runs on the hypervisor layer of your machine and using a VM can get in the way of this. The very point of docker is to containerise the environment in a way that abstracts system specific features. Ie if you're on a Mac or a windows machine - an image/environment is always exactly the same. On this basis you should probably just install docker on your machine at root level and enjoy the benefits of being able to quickly deploy to a consistent environment. 

## Node & npm

So when you're ready to go, make sure you have both node and npm installed with the following commands: 
```
node --version
npm --version
```
These commands should both return a version number. Please make sure npm version is >=5. 
If you don't have them installed - you need to add node to your config and install through apt (on linux) - or use a package manager like Homebrew on Mac(not covered here): 
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
```
## Angular CLI

Once you have node and npm installed correctly via whatever process works on your system you can install AngularCLI with the following npm command: 
```
npm install -g @angular/cli
```
If this completes without errors you've got Angular, Node and npm working! You can now use npm and angularcli to manage just about everything app related. 

## Boilerplate site

To create a new site using the AngularCLI (which is the basis for our project), then compile and serve this locally, we use the following command: 
```
ng new "name_of_site"
cd
ng serve
```


## Launch a site locally

If you've run the command ng serve (above): visit http://localhost:4200/ and see the site rendering. This also provides some links to much more comprehensive AngularCLI tutorials. The 'ng serve' command is not suitable for production! We will be building an express based production server in the following workshops. However, the built in server is suitable for quick testing. In the next workshops we will be developing our own server & this should become your default for testing and production as your site becomes more complex. 

## MongoDB locally

When in production we will host MongoDB remotely (or in a container on the same server) because the remote user won't be able to access the DB on your machine! It's really useful to have a local version for development and testing. In this step we will locally install Mongo and make sure it's working.

The first step is to add the MogoDB repo as a trusted source:
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
```
Now that we trust the files served by the MongoDB maintainers we need to add a reference in our apt configuration:
```
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
```
Now if you run 'sudo apt-get update' the MongoDB repo is added to your apt configuration. This will allow us to pull the latest system versions. We now install the necessary packages:
```
sudo apt-get install mongodb git build-essential openssl libssl-dev pkg-config
```
We can now make sure we have MongoDB correctly installed with 'mongod --version'. If everything worked - this should return a version number. 

### Going further

Launch the AngularCLI default site above and follow the links to more detailed and comprehensive tutorials on Angular.
