# MongoDB and Storage
## Week 8: 20/04/2021

Now we have built our API, and our frontend, it's time to think about how we might manage the
storage of data. NoSQL databases like MongoDB can be useful if your data requirements include
scalability and flexibility because with Mongo it's really easy to initialise and use database
structures. MongoDB also works asynchronously with JSON objects so the design of our API so far will
fit well. There is no reason why you couldn't deploy SQL (or SQLite) at this stage if you would
prefer; and this would also be a good way to practice your MariaDB knowledge. *However*, MongoDB
will take less time to implement, and will offer similar (if not better) performance for the kinds
of tasks and operations we are doing.

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](https://web.microsoftstream.com/video/0eac086d-9757-4630-9922-00ff4b057373)
> - [ ] Essential: Add Mongoose package and test integration
> - [ ] Recommended: [SQL vs NoSQL](https://www.youtube.com/watch?v=XLveJr2Pst8)
> - [ ] Recommended: [Mongo models & schemas](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
> - [ ] Recommended: [Full tutorial on Mongo with Docker](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
***

# NoSQL vs SQL

MongoDB (NoSQL) is great for scaling, fast queries and it makes life a lot simpler for developers.
Relational databases accessed with SQL (Structured Query Language) were developed with a focus on
reducing data duplication. SQL databases are designed in advance (usually) with tabular schemas and
typically require expensive vertical scaling. In SQL a lot of the design decisions are made when the
database is created. NoSQL is a lot more flexible than this - we are therefore going to be using
MongoDB as it is very suitable for a web application where scalability & ease of development are
key.

# Update dependencies

package.json file, which includes the project’s dependencies. You need to add ejs and mongoose to
the core dependencies:

```js
"ejs": "^2.6.1",
"mongoose": "^5.4.10"
```

And add nodemon to the devdependencies:

```js
"nodemon": "^1.18.10"
```

You then need to install these dependencies (from your updated package.json file)
with ```npm install```. Test by running your updated server.js file.

# Database credentials

Your express service will need read and write access to your database. This access is essentially
root, so we need to be very careful with the username and passwords we create. You will remember that
when setting up docker we created a .env file which contains our login information; this should
already be in your project folder. Let's create a file which can import this login information and
use it! First, you need to create a db.js file in your root directory ```nano db.js``` then edit as
below:

```js
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

mongoose.connect(url, options).then(function () {
  console.log('MongoDB is connected');
})
  .catch(function (err) {
    console.log(err);
  });
```

To call our new database connection script `db.js` add the following code to the top of `server.js`
file you already have.
```js
const db = require('./db')
```

To test the new database connection from within the container run the following command and you 
should see *MongoDB is connected* from nodejs return.
```shell
docker-compose up
```


Congratulations the database connection is working!

# Models and schemas

Once you have your MongoDB database working and connected it's time to create your model! Creating
models using Mongoose is a lot easier than CREATE/DROP scripts in SQL. Models are defined using the
Schema interface (see tutorial). The Schema allows you to define the fields stored in each document
along with their validation requirements and default values. Once you have a model defined as a team
follow [this guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
to understand how to encode your model as a schema. An example below illustrates how you might do
this:

```js
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

```

## Saving and searching

Once you have established your data model; you can start saving and searching in your Mongo
database! For example, to create a record you define an instance of the model and then
call `save()`.

[More information about using Mongo with Node and Docker](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
