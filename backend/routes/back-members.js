const { response } = require("express")
const express = require('express') ;

/**
 * 
 * @author : Aurélien
 * @method : PUT
 * 
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
 }
