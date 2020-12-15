# Build a Single Page Application
Your central task as a team is to build a fully functioning single page application. These workshops follow an example MEAN stack project that can form the basis of your project, inspiration or a guide for the stages you need to achieve. MEAN stands for MongoDB, Express, Angular and Node.js. It's just a way to descibe a set of tools for building scalable web applications.![SPA](https://www.whitesourcesoftware.com/wp-content/uploads/2017/07/Single-Page-Application.jpg "Single Page Applications")  The MEAN stack allows developers to quickly produce secure, fast and dynamic sites ready to ship - which is exactly what this unit is all about! These workshops are not about teaching the complete MEAN stack (would take too long!); rather they are about giving a clear structure by which as a team you can explore and test out frameworks and technologies. Software engineering is about selecting, learning and integrating different tools and technologies to give your product or service the features it needs.  

## What is a Single Page Application (SPA)?
A SPA serves a single index.html which includes script imports which dynamically re-renders what the user sees - without re-requesting a page. Angular is used to dynamically update (fetch/post) the DOM and makes this process very simple. The result is a highly interactive application following the M-V-C design paradim. By making API calls for information to a backend (node) we separate the front and back of the application. This has many benefits including scalability, statelessness and extendability of the code.

> [Read more about the MEAN stack](https://www.ibm.com/uk-en/cloud/learn/mean-stack-explained)

## How does it work?
The client side is the web page which runs in the browser. On the client we will be using Angular to render the content in JS and complete client side operations. We use Express, MongoDB and Node for the serving of pages, the business logic & storage. We are using a Node backend, however, the Angular client could be served by any storage serving service. Indeed we could also use any frontend framework or pure JS to render our backend data; the 'MEAN stack' is a collection of useful tools and frameworks to achieve what we want rather than a list of requirements.

Dynamic endpoints (our API) is managed on the server - it's obviously important that things like authentication can't be edited directly by the client!  We make AJAX requests and pass data in JSON format between the client and server. We make these requests over a RESTful API... as demonstrated in the example you will build. Node is... "an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.". Basically it's server side JS that makes all these things work together.

# Your project

Teams are free to choose the most appropriate tools and frameworks to meet the requirements of the marking criteria. What is used is less important that how and why you've chosen a particular framework or tool. The workshops follow the MEAN stack, which is a common professional standard, and below is a summary marked outputs:

| Tool        | Marked output           | Example frameworks, tools & languages  |
| ------------- |-------------| -----|
| Front end framework| Single Page Application | Angular, Vue, React |
| Back end framework| RESTful API |   Express, Koa, Fastify |
| Back-end runtime environment | Server Side Application | Node, Goloang |
| Database| Storage | MongoDB, SQL, SQLite |

## Workbook overview
These weekly worksheets set out the steps to build a fully functioning SPA from scratch using the MEAN stack. The outcomes could become the basis for your own team project. We have highlighted *Essential* milestones which everyone should reach and *Recommended* milestones for those focusing on the particular part of the stack. By following these sessions in order you will have a fully functioning SPA:

>- [Continious Integration](Worksheets/1_DevOps_Docker_CI.md)
>- [Angular intro](Worksheets/2_Angular_building_client_side.md)
>- [Build a Dashboard](Worksheets/3_Angular_dashboard.md)
>- [Express & services](Worksheets/4_Express_through_services.md)
>- [Deploying via Docker](Worksheets/5_Deploying_with_Docker.md)
>- [Write your API](Worksheets/6_Launch_your_API.md)
>- [MongoDB](Worksheets/7_MongoDB_persistent_storage.md)
>- [Tests](Worksheets/8_Testing_and_errors.md)
>- [User Authentication](Worksheets/9_User_Authentication.md)



