 
# RESTful API
A RESTful API is an Application Programming Interface (API) that uses HTTP verbs like GET, PUT, POST, and DELETE to operate data. We will use the principles of a REST API to start building a backend for our site. RESTful is ideal for scaling because the state to handle the request is contained within the request itself, in other words, the client must include all information for the server to fulfill the request. We will be starting simple but the principles contained here are very powerful and can be scaled right up for whatever product you're building!

# Express

We are building with the MEAN stack - so we will be using the Express framework for our API. There are of course many other ways to build an API and you are free to use another toolchain should you wish. First we need to install express and axios as a deps to our project:
'''
npm install --save express body-parser
npm install --save axios
'''
Read about axois here: https://github.com/axios/axios 
 

## server.js

Then create a file server.js and a folder server in the root of our angular project. The server.js file will have the server code, that will point to the server folder, where the rest of the server implementation is.
'''
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
'''
## api.js

The /api route points to a file ./server/routes/api.js. Let's create this file.
'''
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
'''
## see how it works... 
Now is a good point to test that your API works. 
Run '''node server.js''' to start express and take a look:
'''
http://localhost:3000/ -> should load your site as before but this time served by Express
http://localhost:3000/api -> should load the api and give you an 'API works' message
'''
If you've got this far you have a working API. The next steps are to render the content from the API and to call your MongoDB instance!
### Notes

Based on the following example: https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli
