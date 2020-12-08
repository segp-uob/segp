# MEAN Stack Single Page Application
Here we have an example MEAN stack project. MEAN stands for MongoDB, Express, Angular and Node.js. It's just a way to descibe a set of tools for building scalable web applications. The MEAN stack allows developers to quickly produce secure, fast and dynamic sites ready to ship - which is exactly what this unit is all about! The MEAN stack is the perfect tool for startups and product developers and understanding the entire stack - from front to back - gives you a great understanding to build software on. The focus for these worksheets and workshops is helping you quickly build products which demonstrate your concept in a fully functional way. We will not be teaching the MEAN stack; rather we are giving you points and a structure by which as a team you can explore and test out frameworks and technologies. 

# What is a Single Page Application?
A SPA serves a single index.html which includes script imports which dynamically re-renders what the user sees - without re-requesting a page. Angular is used to dynamically update (fetch/post) the DOM and makes this process very simple. The result is a highly interactive application following the M-V-C design paradim. 

By making API calls for information to a backend (node) we separate the front and back of the application. This has many benefits including scalability, statelessness and 

# Architecture overview
The client side is the web page which runs in the browser. On the client we will be using Angular to render the content in JS and complete client side operations. The client side runs on the server and we use Express, MongoDB and Node for the business logic & storage. We are using a Node backend, however, the Angular client could be served by any storage serving. Indeed we could use any frontend framework or pure JS. The logic (dynamic endpoints) are all managed on the server - it's obviously important that things like authentication can't be edited directly by the client! 

We make AJAX requests and pass data in JSON format between the client and server. We make these requests over a RESTful API... as demonstrated in the example you will build.

Node is... "an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.". Basically it's server side JS.

# Worksheet overview
These worksheets set out the steps to build a fully functioning single page application (SPA) from scratch using the MEAN stack. The key to building a great app (from a developer persepctive) is to create reusable services to manage all the data calls to your API. The worksheets make use of the following essential tools:

- npm
- Angular 10
- NodeJS
- Express
- MogoDB

We will be making use of containers (Docker container) to run services we require. Docker is the most common containerisation software used today. It enables developers to easily package apps along with their environments, which allows for quicker iteration cycles and better resource efficiency, while providing the same desired environment on each run.

All the examples were developed and tested on Ubuntu 18.04. There are, of course, many different ways to achieve the same results as described here; it is simply a guide for those looking for a rough roadmap of how to proceed. 

## 0.Getting started
It's a MEAN stack so... we are building frontend with Angular and for backend we will be using MongoDB, NodeJS and ExpressJS.

## 1.DevOps & Continuous Integration (CI)
CI is the practice of merging all developers' working code to a staged 'Master' branch, testing, then deploying to production. Ideally CI is achieved with integrated and automated testing to ensure that bugs are never introduced on a staging or live environment. Good practices around CI begin at the start of a project before anyone has typed a line of code! Weekly goal is to have every group with working CI & live site!

## 2.Angular & building the client side
Our tool of choice is Angular - which we will use here to build reusable components to create a reactive user experience. We will be covering the very basics of Angular and pointing towards more comprehensive tutorials. We will demonstrate how to take the boilerplate Angular example application and build on it as a basis. 

## 3.NodeJS & building the API
We move onto using Node (efficiently) to provide appropriate endpoints for our Angular client to consume; all served up by the lightweight Express framework (via the Loopback package). An endpoint is the means by which the API can route/access the resources requested to perform a task.

## 4.MongoDB & persistent storage
We've selected MongoDB as the document storage tool for our project. These workshops will focus on using a connected Mongo instace running on a completely remote and separate service. 

## 5.User Authentication
Once the site is working we explore more complex topics in the Angular framework - the most useful being User Authentication. This is pretty much essential for any interactive SPA serving users in a personalised way. 

## 6. Testing and errors
We finish by strenthening up the reliability and scaling of our codebase by improving error handling and developing our test suite. 




