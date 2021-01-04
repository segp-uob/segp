// We need the mongoose module which will help us communicate
const mongoose = require('mongoose');

// Get your credentials from the .env file
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// Connect!
mongoose.connect(url, {useNewUrlParser: true});
