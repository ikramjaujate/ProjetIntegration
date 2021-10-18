const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const app = express();
const port = 3001;
const {Client}= require('pg') ;
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});



const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port : 5432,
});

client.connect(err => {
  if (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.put('/api/client', (req, res) => {  
  const firstName = req.body.FirstName
  const lastName = req.body.LastName
  const grade = req.body.Grade
  let pgQuery = 'insert into client (idclient, nom, prenom, grade) values (3, ($1), ($2), ($3))' ;
  client.query(pgQuery, [firstName, lastName, grade], (err, result) => {
    console.log(err, result)
    client.end()
  })
})



let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;