const { response } = require("express")
const express = require('express') ;
const router = express.Router();
const controller = require("../src/controller/file.controller");


/**
 * Add a new user with a grade, first name and last name
 * 
 * @author Aurélien
 * @method PUT
 * @param {integer} grade number of the grade
 * @param {string} first_name first name of the client
 * @param {string} last_name last name of the client
 */
 module.exports = function(app,client) {
  app.put('/api/client', (req, res) => {  
      const firstName = req.body.FirstName
      const lastName = req.body.LastName
      const grade = req.body.Grade
      let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))' ;
      client.query(query, [grade, firstName, lastName], (error, result) => {
        if (error) {
          throw error;
        }
      response.status(200)
      })
    })
  
/**
 * Get all grades and id corresponding
 * 
 * @author : Aurélien
 * @method : GET
 * 
 */
  
    app.get('/api/gradesInfos', (request, response) => {
      let query = "select id_grade, name_grade from grade";
      
      client.query(query, (error, results) => {
          if (error) {
              throw error;
          }
        response.status(200).json(results.rows);
      })
    }) ;

    // routes = (app) => {
    //   router.post("/upload", controller.upload);
    //   router.get("/files", controller.getListFiles);
    //   router.get("/files/:name", controller.download);
    
    //   app.use(router);
    //   }  
 }

