# MongoDB and Storage

Now we have built our API, and our frontend, it's time to think about how we might manage the storage of data. NoSQL databases like MongoDB can be useful if your data requirements include scalability and flexibility because with Mongo it's really easy to initialise and use database structures. MongoDB also works asynchronously with JSON objects so the design of our API so far will fit well. There is no reason why you couldn't deploy SQL (or SQLlite) at this stage if you would prefer; and this would also be a good way to practice your MariaDB knowledge. *However*, MongoDB will take less time to impliment, and will offer similar (if not better) performance for the kinds of tasks and operations we are doing.  

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](videos/7.ogg)
> - [ ] Essential: Add Mongoose package and test integration
> - [ ] Recommended: [SQL vs NoSQL](https://www.youtube.com/watch?v=XLveJr2Pst8)
> - [ ] Recommended: [Full tutorial on Mongo with Docker](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
***
# NoSQL vs SQL
MongoDB (NoSQL) is great for scaling, fast queries and it makes life a lot simpler for developers. Relational databases accessed with SQL (Structured Query Language) were developed with a focus on reducing data duplication. SQL databases are designed in advance (usually) with tabular schemas and typically require expensive vertical scaling. In SQL a lot of the design decisions are made when the database is created. NoSQL is a lot more flexible than this - we are therefore going to be using MongoDB as it is very suitable for a web application where scalability & ease of development are key. 

# Update dependancies
package.json file, which includes the project’s dependencies. You need to add ejs and mongoose to the core dependancies: 
```
    "ejs": "^2.6.1",
    "mongoose": "^5.4.10"
```
And add nodemon to the devdependancies: 
```
    "nodemon": "^1.18.10"
```
You then need to install these dependancies with ```npm install```
# Database credentials
Your express service will need read and write access to your database. This is essentially root access so we need to be very careful with the username and passwords we create. You will remember that when setting up docker we created a .env file which contains our login information; this should already be in your project folder. Lets create a file which can import this information and use it! First, you need to create a db.js file in your root directory ```nano db.js``` then edit as below:
```
const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});
```
To call our new database connection script add ```const db = require('./db')``` to the top of ```server.js```. To test the new database connection from within the container run the command ```docker-compose up``` and you should see ```MongoDB is connected``` from nodejs return. Congratulations the database is working!


[More information about using Mongo with Node and Docker](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
