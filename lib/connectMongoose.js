// Database connection
'use strict';
const mongoose = require('mongoose');

// handle possible database connection errors:
mongoose.connection.on('error', () => {
  console.log('DB connection error', err);
});

// manage the connection:
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB on', mongoose.connection.name);
});

// connect to the URL of the DB:
mongoose.connect('mongodb://127.0.0.1/nodepop');

module.exports = mongoose.connection;
