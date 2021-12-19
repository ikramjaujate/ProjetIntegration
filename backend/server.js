"use strict";

const express = require("express");
const {Client} = require("pg");
const app = express();
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
//var path = require('path');
const helmet = require("helmet");
// Ajout des fichier du waf
const Waf = require('mini-waf/wafbase');  // Base du waf
const wafrules = require('mini-waf/wafrules'); //Règles de sécurisation associer au waf


//const express_waf_middleware = require("express-waf-middleware");

const permissionsPolicy = require("permissions-policy");
const expectCt = require("expect-ct");


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
const cameras = require('./routes/back-cameras.js');
const photos = require('./routes/back-photos.js');


const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})


// CSP Header middleware
// app.use(function(req, res, next) {
//   res.setHeader(
//     "Content-Security-Policy",
//     "frame-ancestors 'self'; default-src 'self'; script-src 'sha256-leYCTtAGk9OA86rkpsFvzjewfVkLMqDTkMVb/B4Pt2Q=' 'self'; img-src 'self' data: http://www.w3.org http://*.w3.org https://projet.4x4vert.be https://*.4x4vert.be/cameras https://*.ftcdn.net; upgrade-insecure-requests; style-src 'self'  'sha256-UyZXAxwnOfm7gFnYxk/X20KR8vRiHVrQCVThoRHBcDY=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-mkh8535AFt6ogczZfol78HZgvhGGEDTCXpPucFH37Jo=' 'report-sample' projet.4x4vert.be; object-src 'none'; frame-src 'self'; child-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self' projet.4x4vert.be; base-uri 'self'; form-action 'self'; media-src 'self'; prefetch-src 'self'; worker-src 'self';"
//   ),
//   next();
// });


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

//Referrer-Policy
app.use(
  helmet.referrerPolicy({
    policy: ["strict-origin-when-cross-origin"]
  })
 );

//X-Powered-By
app.use(helmet.hidePoweredBy());

//Strict-Transport-Security
app.use(
  helmet.hsts({
    maxAge: 63072000, //2ans
    includeSubDomains: true,
    preload: false
  })
);

//Expect-CT
app.use(expectCt({ maxAge: 86400 }));


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
photos(app,client);

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

const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

/*
var emudb = new ExpressWaf.EmulatedDB();
var waf = new ExpressWaf.ExpressWaf({
    blocker:{
        db: emudb,
        blockTime: 1000
    },
    log: true
});
// Module CSRF


waf.addModule('csrf-module', {
  allowedMethods:['GET', 'POST', 'PUT','DELETE'],
  refererIndependentUrls: ['/'],
  allowedOrigins: ['http://localhost:3000']
}, function (error) {
  console.log(error);
});*/

//app.use(waf.check);
// app.use(Waf.WafMiddleware(wafrules.DefaultSettings));


module.exports = server;

