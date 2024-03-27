require('dotenv').config();
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const connectToDb = async cb => {
  try {
    await mongoose.connect(URI);
    console.log('DB Connected');
    return cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

module.exports = {connectToDb};
