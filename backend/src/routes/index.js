const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const app = express();
const port = 3001;
const {Client}= require('pg') ;
require("dotenv").config();

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
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
  let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))' ;
  client.query(query, [grade, firstName, lastName], (err, result) => {
  })
})

app.get('/api/grades', (request, response) => {
  let query = "select id_grade, name_grade from grade";
  client.query(query, (error, results) => {
      if (error) {
          throw error;
      }
      response.status(200).json(results.rows);
  })
}) ;



let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;