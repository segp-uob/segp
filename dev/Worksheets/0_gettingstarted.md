# SPA: Dashboard

This set of worksheets (and accompanying videos) is based around building an example Dashboard
application on the MEAN stack. We build the Dashboard from the 'ground up' and demonstrate how to
integrate charts in the front end and call data (via a RESTful API) from a database. To improve
portability and ease deployment we use Docker to manage the Node/Mongo environment and ensure that
others can easily recreate our production system. Your final project must be submitted in a way
which can be replicated easily; Docker is the suggested tool deploying as it makes setting up
instances of Node and Mongo very easy (and we give you the templates). We will cover each part of
the stack and tooling over the Unit.

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](videos/0.ogg)
> - [ ] Recommended: [Watch Angular pros & cons (12 minutes)](https://www.youtube.com/watch?v=y14f_VFsZIA)
> - [ ] Essential: Install all required packages
> - [ ] Essential: Create an Angular site & run
> - [ ] Recommended: Install MongoDB
> - [ ] Recommended: Explore Angular tutorials linked in your new site
***

# Getting started

We must start by getting your system is setup exactly how you need. Time spent checking the basics now
will make sure you aren't stressing later on. Each member of the group should ensure they have the
development tools setup following all essential steps outlined above. Of course, each team should
have only one git repository, so you'll need to decide who will make the first push (then everyone
else clones). Your repository should probably contain both the source and distribution files as well
as any docker compose scripts and docker files (but not any environmental variables such as
passwords!).

In this series we will be developing Angular applications using Angular CLI. Angular CLI is a tool for
quickly prototyping with bolierplate code then for managing and growing your project in a consistent
way. You don't have to use it, however, it will add hours of development time if you don't.
Angular CLI saves a great deal of manual work. The Angular CLI example project will be the basis for
these worksheets and it should be the basis for your own team project.

Angular uses Typescript; which is basically JS with classes. TypeScript is designed for development
of large applications and transcompiles to JavaScript.

# How these workshops work

By following the workshops you will gradually learn each stage of building the 'full stack' in a
simple and 'not-very-featured' way. We aim to give you a taste of the tools to build your own 
'far-more-featured' product.

## Tasting Paddle

Follow each of the steps in these worksheets and you will sample the basics of Angular, Express,
Node, Mongo and Docker - enough to get your own project out of the ground - but not enough to build
your final product (that's the challenge!). You can focus as a team on the tools and frameworks most
useful to your product: [Metaphor](https://www.etsy.com/uk/market/beer_tasting_paddle).

## Pace your learning

If you already have experience of a particular tool or language you might want to skip or just get
started with your own project; but everyone on your team should either skip on the basis of prior
experience or complete the workshops. You can refer to the 'final' working version of the
application we will build gradually through these workshops. This is a useful debugging resource if
you are struggling to get things working at a particular stage.

# Install requirements

Get your system ready to start working with the MEAN stack... All instructions are based on Ubuntu
OS, however, many will work exactly the same on MacOS and there are additional tips and links below. You might need to do some searching and error finding to establish
different commands under other operating systems. However, the principles and packages are always
the same.

## npm and Docker

npm (originally short for Node Package Manager) helps us manage JS packages and dependencies. We
need it to install Angular CLI. We will install npm via the master NodeJS package. The key steps in
this session are to:

- Ensure you have a current install of npm
- Ensure you have a current install of NodeJS
- Ensure you have a current install of Angular CLI
- Setup the new site as an upstream Git repo

In the next workshops we are going to be using Docker and Docker-compose for running production
containers. So now is also a good time to make sure you have these installed:

- Docker
- Docker-compose

Because of the way Docker works it is just not possible to install Docker without Sudo rights. This
is no issue on your own machines, but if you're using a lab machine, this will need to be completed
inside a Vagrant VM so you can sudo. For non-linux builds you might also need some specific native
packages depending on your operating system (like build-essential on Ubuntu). Try installing these
packages first but bear in mind you might need to fault find until it works!

## Using VM?

I wouldn't recommend using Docker within a VM (such as Virtual Box) if you can avoid it. Docker runs
on the hypervisor layer of your machine and using a VM can get in the way of this. The very point of
docker is to containerise the environment in a way that abstracts system specific features. Ie if
you're on a Mac or a windows machine - an image/environment is always exactly the same. On this
basis you should probably just install docker on your machine at root level and enjoy the benefits
of being able to quickly deploy to a consistent environment.

## Node & npm

You can install node and npm directly on your system or follow the alternative below:

> ### Alternative to using pure node/npm installation:
> An alternative to using just node / npm, is a little wrapper software that allows for easy 
> installation and switching between different node versions.
> This is particularly useful, as it takes care of updating the node to the latest version without 
> the worry of corrupting the previous or existing installation.
> Additionally, it also works cross-platform, including **MacOS**.
>
> The software that can be used for this is known as [NVM, or Node Version Manager](https://github.com/nvm-sh/nvm).
>
> To install NVM, run the following command:
> ```shell
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
> wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
> ```
>
> Once installed, NVM can be used to install any version of Node which comes bundled with npm:
>
> To list existing versions, simply run:
> ```shell
> nvm ls-remote
> ```
>
> To install the chosen version, run:
>
> ```shell
> nvm install <version>
> # nvm install 14
> # nvm install 14.15 
> ```
>
> For a full list of instructions, refer to the CLI documentation by running:
> ```shell
> nvm
> ```
---
There are additional resources available to guide you through the installation process.

> - [Mac specific instructions](https://treehouse.github.io/installation-guides/mac/node-mac.html)
> - [Windows specific instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
> - [General npm issues](https://docs.npmjs.com/)

So when you've installed via whatever method works best on your system, make sure you have both *node and npm* installed with the following
commands:

```shell
node --version
npm --version
```

These commands should both return a version number. Please make sure npm version is >=5. If you
don't have them installed - you need to add node to your config and install through apt (on linux) -
or use a package manager like Homebrew on Mac(not covered here):

```shell
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
```

## Angular CLI

Once you have node and npm installed correctly via whatever process works on your system you can
install Angular CLI with the following npm command:

```shell
npm install -g @angular/cli
```

If this completes without errors you've got Angular, Node and npm working! You can now use npm and
Angular CLI to manage just about everything app related.

## Boilerplate site

To create a new site using the Angular CLI (which is the basis for our project), then compile and
serve this locally, we use the following command:

```shell
ng new "name_of_site"
cd
ng serve
```

When prompted:

```
Would you like to add Angular routing?              Yes
Which stylesheet format would you like to use?      CSS
```

***

## Launch your first Angular project

If you've run the command `ng serve` (above): visit http://localhost:4200/ and see the site
rendering. This also provides some links to much more comprehensive Angular CLI tutorials. The 'ng
serve' command is not suitable for production! We will be building an express based production
server in the following workshops. However, the built-in server is suitable for quick testing. In
the next workshops we will be developing our own server & this should become your default for
testing and production as your site becomes more complex.

## MongoDB

When in production we will host MongoDB remotely (or in a container on the same server) because the
remote user won't be able to access the DB on your machine! Depending on your project it can be
useful to have a local version for development and testing (in addition to in a container, which we
will cover later). In this step we will locally install Mongo and make sure it's working. This is
not essential for everyone so only proceed if you need to!

The first step is to add the MongoDB repo as a trusted source:

```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
```

Now that we trust the files served by the MongoDB maintainers we need to add a reference in our apt
configuration:

```shell
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
```

Now if you run 'sudo apt-get update' the MongoDB repo is added to your apt configuration. This will
allow us to pull the latest system versions. We now install the necessary packages:

```shell
sudo apt-get install mongodb git build-essential openssl libssl-dev pkg-config
```

We can now make sure we have MongoDB correctly installed with 'mongod --version'. If everything
worked - this should return a version number.

### Going further

Finished? Launch the Angular CLI default site above and follow the links to more detailed and
comprehensive tutorials on Angular.
