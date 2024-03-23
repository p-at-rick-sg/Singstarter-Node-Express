require('dotenv').config();
const {MongoClient} = require('mongodb');

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
let dbConnection;

const connectToDb = cb => {
  client
    .connect()
    .then(client => {
      dbConnection = client.db('development');
      return cb();
    })
    .catch(err => {
      console.log(err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = {connectToDb, getDb};
