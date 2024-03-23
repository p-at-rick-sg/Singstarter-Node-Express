const express = require('express');
const {connectToDb, getDb} = require('./src/models/db');

//Add additional sub-router files here
const projectRouter = require('./src/routers/projectRouter');

//Initialise main app
const app = express();

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
