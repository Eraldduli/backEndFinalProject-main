const MongoClient = require('mongodb').MongoClient;

// Connection URI
const url = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
module.exports = {
    client: client
};