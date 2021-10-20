const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;  //listen on port 8080 for incoming requests.
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});