require("dotenv").config();
var grade =  require('./routes/back-grade.js');
var members = require('./routes/back-members.js');
var privatedata = require('./routes/back-privatedata.js');
var cameras = require('./routes/back-cameras.js');
const express = require('express') ;
const app = express() ;
const {Client}= require('pg') ;
const mysql = require('mysql');
const router = express.Router();
const controller = require("./src/controller/file.controller");
const { request, response } = require('express');
const routes = require("./routes/back-pictures.js");
const port = 3001;

global.__basedir = __dirname;

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port : 5432,
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

app.use(express.json()) ;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
  });


client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } 
  else {
    console.log('connected');
  }
}) ;


// route for pictures


// let port2 = 8080;
// app.listen(port2, () => {
//   console.log(`Running at localhost:${port}`);
// });

// ROUTE FOR API 
grade(app, client);
cameras(app, client);
members(app, client);
privatedata(app,client);
routes(app, client)


