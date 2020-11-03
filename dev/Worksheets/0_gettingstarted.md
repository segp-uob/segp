# Getting started

This worksheet is focused on making sure your development environment is setup exactly how you need. Time spent checking the basis will make sure you aren't stressing later on. Each member of the group should ensure they have the development tools setup; but of course each team should have only one git repository so you'll need to decide who will make the first push (then everyone else clones).

We will be developing Angular applications using the AngularCLI. AngularCLI is basically a really useful tool for quickly prototyping with bolierplate code; it saves a great deal of manual work (but you could use Angular directly if you want!!). We are also going to use a package called LoopBack to scaffold our API and speed up development here. We won't be using Loopback at first - but we need to make sure it's installed.

Once this is in place we will setup our Heroku hosting and make sure we can continiously integrate from our Master Git branch and our live environment. This process will ensure we have a fully working application at all times! 

## Basics
npm (originally short for Node Package Manager) helps us manage JS packages and dependancies. We need it to install AngularCLI. We will install npm via the master NodeJS package. The key steps in this session are to: 

- Ensure you have a current install of npm
- Ensure you have a current install of NodeJS
- Ensure you have a current install of Angular CLI
- Setup the new site as an upstream Git repo

To make sure you have both node and npm installed: 
'''
node --version
npm --version
'''
These commands should both return a version number. If you don't have either/both installed. You need to add node to your congig and install through apt: 
''
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
'''
Once you have node and npm installed correctly, you can install AngularCLI with the following npm command: 
'''
npm install -g @angular/cli
'''
If this completes without errors you've got Angular, Node and npm working! 

## Boilerplate site
To create a new site using the AngularCLI, then compile and serve this locally, we use the following command: 
'''
ng new "mean_test"
cd
ng serve
'''
## Launch a site locally
If you've run the command ng serve (above): visit http://localhost:4200/ and see the site rendering. This also provides some links to much more comprehensive AngularCLI tutorials.

## MongoDB locally
When in production we will host MongoDB remotely (because the remote user won't be able to access the DB on your machine!), however, it's really useful to have a local version for development and testing. In this step we will locally install Mongo and make sure it's working.

The first step is to add the MogoDB repo as a trusted source:
'''
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
'''
Now that we trust the files served by the MongoDB maintainers we need to add a reference in our apt configuration:
'''
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
'''
Now if you run 'sudo apt-get update' the MongoDB repo is added to your apt configuration. This will allow us to pull the latest system versions. We now install the necessary packages:
'''
sudo apt-get install mongodb git build-essential openssl libssl-dev pkg-config
'''
We can now make sure we have MongoDB correctly installed with 'mongod --version'. If everything worked - this should return a version number. 
## Hosting

## Continious Integration (CI)

## Loopback API scaffolding
Finally we want to ensure that Express & Loopback are working to allow us to serve our API in production. Loopback is a great framework for automatically setting up routes based around your chosen data model. 

## Launch your site publically 
Now lets try and get your site hosted on Heroku.

### Going further
Launch the AngularCLI default site above and follow the links to more detailed and comprehensive tutorials
Now might be a good time to integrate some automated tests into your CI cycle. 
