const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const {connectToDb, getDb} = require('./src/models/db');

//Add additional sub-router files here
const projectRouter = require('./src/routers/projectRouter');

//Swet rate limiter up
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, //period in ms - 15 mins
  max: 100, //each ip limited to 100 req per window above
  standardHeaders: true, //sends back this header
  legacyHeaders: false, //disables x-regulate
});
//Initialise main app
const app = express();
app.use(cors()); //this opens to all domains
app.use(helmet());
app.use(limiter);

//Setup app to be able to consume paramters from URLs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//use the db connection to check connection before starting the listener

connectToDb(err => {
  if (!err) {
    app.listen(7001, () => {
      console.log('Listening on Port TCP: 7001');
    });
  } else {
    console.log('DB Connection Failed');
  }
});

// app.listen(7001, () => {
//   console.log('listineing on some port');
// });

//Add the main routers and links to subn-routers here
app.use('/api/project', projectRouter);

//Setup the app to listen on a port (add logic here for db connection later)
