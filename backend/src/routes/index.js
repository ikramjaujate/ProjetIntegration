const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
/*const app = express();
const port = 3001;
const knex = require('knex');
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

const db = knex({
  client: 'pg',
  connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
  },
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/Tables', (req, res) => {
  db.select('*')
      .from('Client')
      .then((data) => {
          console.log(data);
          res.json(data);
      })
      .catch((err) => {
          console.log(err);
      });
});
*/
let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;