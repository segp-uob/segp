## Welcome to Angular!
## Week 3: 16/2/2021

We are going to be using Angular for our client side development. Angular is a fantastically
flexible and scalable framework for building web applications. If you're leading on frontend
development getting to grips with Angular is going to be a big focus for you.

Angular is a very powerful, but potentially complex, and does take some time to learn. Learning
Angular properly would take a lot longer than the time we have! Therefore, the focus for this
workshop is giving you a structure for your learning and pointers towards what might be useful. It
by no means will teach you all you need to know about Angular! How far your team chooses to go with
the Angular framework is your choice.

You will use Angular locally to develop your site. When you are ready to deploy to production/live
we build a set of static files which can then be served to your users. Usually you would build
locally and deploy to a remote environment following successful completion of tests. Your Angular
site will call data from an API which we will build later in the workshop sessions.

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](videos/2.ogg)
> - [ ] Recommended: [Check out Made with Angular](https://www.madewithangular.com/) (5 minutes)
> - [ ] Essential: Create a new component
> - [ ] Recommended: [Angular walkthrough](https://angular.io/start )
> - [ ] Recommended: [Angular architecture overview](https://angular.io/guide/architecture)
***

# Overview

This workshop is focused on giving you a general overview of the Angular framework and introducing
you to some of the key files and concepts. We will be navigating through the project you created in
last week's workshop.

## Angular structure and files

Now you've built your first Angular project (in the last workshop) you will see several files which
were created when you created. We are going to take a closer look at
the [file stucture](https://angular.io/guide/file-structure).

### package.json

A configuration file that contains the metadata for your application. When there is a package.json
file in the root directory of the project. In the example we will be building, we will be updating
this package file a few times, then running ng install to make sure all the dependencies are
updated.

### app.json

A manifest format for describing web apps. It declares environment variables, add-ons, and other
information required to run an app on Heroku. It is required to create a “Deploy to Heroku” button.

### server.js

This file contains all the server-side code used to implement the REST API. The API is written in
Node.js, using the Express framework and the MongoDB Node.js driver.

### /src directory

This folder contains all of the Angular client code for the project.

## Getting started with Angular

If you are responsible for frontend development in your team follow this tutorial to learn the
basics of Angular: https://angular.io/start.

## Modules, components, events

Components are the main building block for Angular applications. Each component consists of: An HTML
template that declares what renders on the page, A Typescript class that defines behavior, A CSS
selector that defines how the component is used in a template, and optionally, CSS styles applied to
the template. This of components as defining areas of responsibility in the user interface.


