# Build a Single Page Application
Your central task as a team is to build a fully functioning single page application (SPA). These workshops guide you through a series of steps towards making a simple SPA. They are intended to give you a rough structure and set your group off in the right technical direction. As you gain confidence and understanding you'll want to explore topics and functionality not covered in these sessions.

MEAN stands for MongoDB, Express, Angular and Node.js. It's just a way to descibe a set of tools which work well together to build scalable web applications.

![SPA](https://www.whitesourcesoftware.com/wp-content/uploads/2017/07/Single-Page-Application.jpg "Single Page Applications")

The MEAN stack allows developers to quickly produce secure, fast and dynamic sites ready to ship - which is exactly what this unit is all about! These workshops are not about teaching the complete MEAN stack (would take too long!); they are a basis for exploring and testing out frameworks and technologies. Software engineering is about selecting, learning and integrating different tools and technologies to give your product or service the features it needs. One of the most important things is that you work together as a team to problem solve and learn together.

## What is a Single Page Application (SPA)?
A SPA serves a single index.html which includes script imports which dynamically re-renders what the user sees - without re-requesting a page. Angular is used to dynamically update (fetch/post) the domain application model (DOM) and makes this process very simple. The result is a highly interactive application which loads in an efficient way. By making API calls for information to a backend (node), we separate the front and back of the application. This has many benefits including scalability, statelessness and extendability of the code.

> [Read more about the MEAN stack](https://www.ibm.com/uk-en/cloud/learn/mean-stack-explained)

### Why Angular and Angular CLI?
In these workshops we are using some basic features from the Angular 11 framework. We have chosen to use Angular but you don't have to! We selected Angular because it is stable, supported and developed by google, and simplifies many processes whilst being very powerful. We make using angular easier by making use of the bundled Angular CLI tool. We will be showing you some basic features of Angular in the workshops.
```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
```
## How does a SPA work?
The client side is the web page which runs in the browser. On the client we will be using Angular to render the content in JS and complete client side operations. We use Express, MongoDB and Node for the serving of pages, the business logic & storage. We are using a Node backend, however, the Angular client could be served by any storage serving service. Indeed we could also use any frontend framework or pure JS to render our backend data; the 'MEAN stack' is a collection of useful tools and frameworks to achieve what we want rather than a list of requirements.

Dynamic endpoints (our API) is managed on the server - it's obviously important that things like authentication can't be edited directly by the client! We make AJAX (Asynchronous JavaScript And XML) requests and pass data in JSON (JavaScript Object Notation) format between the client and server. We make these requests over a RESTful API... as demonstrated in the example you will build. Node is... "an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.". Basically it's server side JS that makes all these things work together.

We are going to walk through building and integrating each of these stages as we progress through the workshops.

# Your project

**Teams are free to choose the most appropriate tools and frameworks to meet the requirements of the marking criteria.** What is used is less important than how and why you've chosen a particular framework or tool. The workshops follow the MEAN stack, which is a common professional standard, and we would suggest it could be used as a basis for most projects. Because it is well used the integration between various tools is well documented online.

## Implimentation: Marked outputs
We are looking for all teams to have *some* coverage of the following areas. Your team need to make a decision around how best to approach each of these areas:

| Area/topic        | Marked output           | Example frameworks, tools & languages  |
| ------------- |-------------| -----|
| Front end frameworks| Single Page Application | Angular, Vue, React |
| Back end frameworks| RESTful API |   Express, Koa, Fastify |
| Back-end runtime environment | Server Side Application | Node, Goloang |
| Database| Storage | MongoDB, SQL, SQLite |
| Automated testing| Tests | TSlint, Protractor |

## Is the source code marked?
No! We do, however, expect all projects to build (we will test this) and teams with non-building projects should expect low marks. We mark the outputs and level of technical achievement by inspecting your built outputs and commit logs (rather than your source code) and we expect high scoring teams to **prove** that code is well written by the use of tests. 

We don't need to mark the source code because, in the case of Angular, the [Angular compiler](https://www.npmjs.com/package/@angular/compiler) will ensure your code is technically correct.

> **Teams will only be able to build functioning products with well written code. We are focused on marking tests and outputs.**

# Workshops, workbooks and walkthroughs

Each workshop has its own *workbook* page and most workshops include 1 week of content including a terminal guided walkthrough. We have highlighted *Essential* milestones which everyone should reach and *Recommended* milestones for those focusing on the particular part of the stack. The later workshops (10 - 12) are more advanced and include a greater number of *Recommended* milestones to reflect the additional complexity. We also don't cover everything in these later sessions so there are many more technical gaps to fill. 

As per the marked outputs above; we don't expect every team to implement full user authentication (Weeks 11 & 12) and these are provided for additional stretch for teams looking to take their product to a fully functioning state. 

By following these sessions in order you will have a fully functioning SPA which would meet the basic requirements of the unit:

## Workbook overview
These weekly worksheets set out the steps to build a fully functioning SPA from scratch using the MEAN stack. The outcomes could become the basis for your own team project. Ideally you would try to complete the workbook during the teaching week to benefit from ongoing support. As the term progresses you will likely transition from the worked example to your own product.

>- [Week 1: Getting started!](Worksheets/0_gettingstarted.md)
>- [Week 2: Docker & Continious Integration](Worksheets/1_DevOps_Docker_CI.md)
>- [Week 3: Angular intro](Worksheets/2_Angular_building_client_side.md)
>- [Weeks 4 & 5: Build a Dashboard](Worksheets/3_Angular_dashboard.md)
>- [Weeks 5 & 6: Build your API](Worksheets/4_Launch_your_API.md)
>- [Week 7: Deploying via Docker](Worksheets/5_Deploying_with_Docker.md)
>- [Week 8: Using Services](Worksheets/6_Express_through_services.md)
>- [Week 9: Setting up MongoDB](Worksheets/7_MongoDB_persistent_storage.md)
>- [Week 10: Writing tests: TSlint & Protractor](Worksheets/8_Testing_and_errors.md)
>- [Weeks 11 & 12: User Authentication (Advanced)](Worksheets/9_User_Authentication.md)



