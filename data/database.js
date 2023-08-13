const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://rutwiknikumbe:rutwik982@ndadancing.ngl0pdc.mongodb.net/ndadancing?retryWrites=true&w=majority');
  database = client.db('ndadancing');
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};