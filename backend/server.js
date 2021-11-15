"use strict";

const express = require("express");
const {Client} = require("pg");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
var path = require('path');
const helmet = require("helmet");
// Const http = require('http')
/*
 * Const cors = require('cors')
 * const mysql = require('mysql')
 * const router = express.Router()
 * const controller = require('./src/controller/file.controller')
 * const { request, response } = require('express')
 */
const port = 3001;

/* Different sets of existing APIs */
const grade = require('./routes/back-grade.js')
const members = require('./routes/back-members.js')
const privatedata = require('./routes/back-privatedata.js')
const cameras = require('./routes/back-cameras.js')

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})




//app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
//  );

// CSP Header middleware
app.use(function(req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors 'self'; upgrade-insecure-requests;  default-src 'self'; script-src 'sha256-taE1esL2Z5EmqZ+029XVYXt4sxKUw336oUN3SAp4XZs=' 'self' 'report-sample' https://projet.4x4vert.be; style-src 'self' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-mkh8535AFt6ogczZfol78HZgvhGGEDTCXpPucFH37Jo=' 'report-sample' projet.4x4vert.be; object-src 'none'; frame-src 'self'; child-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self' projet.4x4vert.be; base-uri 'self'; form-action 'self'; media-src 'self'; prefetch-src 'self'; worker-src 'self';"
  ),
  next();
});

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//     'default-src': ['\'self\'' , 'blob:'],
//     'object-src' : ['\'self\'', 'data:'],
//     'img-src' : ['\'self\'', 'data:'],
//     'script-src' : ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
//     'script-src-attr': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
//   }
// }));

//X-Content-Type-Options
app.use(helmet.noSniff());

//X-Frame-Options
 app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
 );

//X-XSS-Protection
app.use(helmet.xssFilter());

//Strict-Transport-Security
app.use(
  helmet.hsts({
    maxAge: 63072000, //2ans
    includeSubDomains: true,
    preload: false
  })
);


// app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
// app.use(
//   helmet.hsts({
//     maxAge: 123456,
//   })
// );

app.use(express.json())
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   next()
// })

//const __dirname = path.resolve();
app.use(express.static(__dirname + '/build/'));
console.log(__dirname)
// ROUTE FOR API
grade(app, client);
cameras(app, client);
members(app, client);
privatedata(app, client);

app.get('*', (req, res) => {
  return res.sendFile(path
    .join(__dirname + '/build/', 'index.html'))
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
