const _ = require('lodash');
const { response } = require("express");

module.exports = function (app, client) {
  
    /**
     *Add a new member withits fname, lname and grade
     * 
     * @author : Aurélien
     * @method : PUT
     *
     */
    app.put('/api/client', (req, res) => {
      const firstName = req.body.FirstName
      const lastName = req.body.LastName
      const grade = req.body.Grade
      const photos = req.body.Photos
      let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))';
      client.query(query, [grade, firstName, lastName], (error, result) => {
        if (!error){
          let query2 = 'select * from member where first_name=($1) and last_name=($2) and id_grade=($3)';
          client.query(query2, [firstName, lastName, grade], (error, res2) => {
            
              let idCreated = Object.values(res2.rows[res2.rows.length - 1])
              for(e in photos){
                let query3 = 'INSERT into photos(id_member, pictures) VALUES (($1), ($2));';
                client.query(query3, [idCreated[0], photos[e]], (error, res3) => {
                  if(error){
                    res.json(error)
                  }
                })
              }
            return res.status(200).json({ok : "ok"})
            
          })
        }
        else{
          console.log(error)
          return res.status(400)
          .json(error)
          
        }
      })
    })

    /**
     * Retrive all current members with their grade and color assiocated
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @method GET
     */

  app.get('/api/members', (request, response) => {

    let query = "select ME.id_member, GRM.id_grade, ME.first_name, ME.last_name, GRM.name_grade, CO.name_color as color \
                from grade as GRM \
                join member as ME on ME.id_grade = GRM.id_grade \
                join color as CO on GRM.id_color = CO.id_color \
                order by GRM.id_grade ;"
    client.query(query, (error, res) => {
      if (error) {
        throw error
      }
      response.status(200).json(res.rows);
    })
  })

    /**
     * Delete a member based on its ID
     * 
     * @author Aurélien Brille <a.brille@students.ephec.be>
     * @method DELETE
     * @param {integer} idMember Id of the member we want to delete
     */

  app.delete('/api/members/:idMember', (req, response) => {
    idMember= req.params.idMember

    let query = "delete from member where id_member = ($1)"

    client.query(query, [idMember], (error, res) => {
      if (error) {
        response.status(400)
        response.send(error);
      }
      else{
      response.status(200)
      response.send({"message" : "ok"})
      }
    })

  })

    /**
     * Retrieves all the information from a member
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve information
     */
    app.get('/api/membres/:idMember', (request, response) => {
      const idMember = request.params.idMember;
      let query = "select *  \
      from member \
      where id_member = ($1)" ;
      client.query(query, [idMember], (error, results) => {
        if (error) {}
        response.status(200).json(results.rows)
      })
    })

    /**
     * Retrieves name and surname from a member
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve information
     */
    app.get('/api/membres/:idMember/name', (request, response) => {

      const idMember = request.params.idMember;
      let query = "select first_name, last_name  \
    from member \
    where id_member = ($1)" ;
      client.query(query, [parseInt(idMember)], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    })

    /**
     * Retrieves only the pictures from a member
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve the picture
     */
    app.get('/api/membres/:idMember/photos', (request, response) => {

      const idMember = request.params.idMember;
      let query = "select PO.pictures  \
    from photos as PO\
    join member as ME on PO.id_member = ME.id_member  \
    where ME.id_member = ($1)" ;
      client.query(query, [idMember], (error, results) => {
        if (error) {
        }
        response.status(200).json(results.rows)
      })
    })

    /**
     * Counts the number of photos owned by the member.
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve information
     */
    app.get('/api/membres/:idMember/photos/count', (request, response) => {

      const idMember = request.params.idMember;
      let query = "select count(distinct(PO.pictures )) \
    from photos as PO\
    join member as ME on PO.id_member = ME.id_member  \
    where ME.id_member = ($1)" ;
      client.query(query, [idMember], (error, results) => {
        if (error) {
        }
        response.status(200).json(results.rows)
      })
    })

  /**
   * Modify the first and last name of the designated member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method PUT
   * @param {integer} idMember identifier of the member for which we want to retrieve information
   */
    app.put('/api/membres/:idMember/update', (request, response) => {
      const idMember = request.params.idMember;
      const name = request.body.name
      const surname = request.body.surname
      let query = "update member set first_name = ($2) , last_name = ($3)  \ \
      where id_member = ($1)" ;
      client.query(query, [idMember, name, surname], (error, results) => {
        if (error) {
        }
        response.status(200)
        response.send({"count" : results.rowCount});
      })
    })

  /**
   * Eliminate picture of a member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method DELETE
   * @param {integer} idMember identifier of the member for which we want to eliminate photo
   */
   app.delete('/api/membres/:idMember/eliminate/photo', (request, response) => {
      const idMember = request.params.idMember;
      const photo = request.body.photo
      let query = "delete from photos \
      where id_member = ($1) and pictures = ($2)" ;

      client.query(query, [idMember, photo], (error, results) => {
        if (error) {
        }
        response.status(200)
        response.send({ "count" : results.rowCount})
      })
      
    })

  /**
     * Retrieves the grade from a member
     * 
     * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
     * @method GET
     * @param {integer} idMember identifier of the member for which we want to retrieve the grade
     */
    app.get('/api/membres/:idMember/grade', (request, response) => {

      const idMember = request.params.idMember;
      let query = "select ME.id_member, GRM.id_grade, GRM.name_grade, CO.name_color as color \
                  from grade as GRM \
                  join member as ME on ME.id_grade = GRM.id_grade \
                  join color as CO on GRM.id_color = CO.id_color \
                  where ME.id_member =($1)\
                  order by GRM.id_grade ;"
      client.query(query, [idMember], (error, results) => {
        if (error) {
        }
        response.status(200).json(results.rows)
      })
    })

  /**
   *  Update grade from a member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method PUT
   * @param {integer} idMember identifier of the member for which we want to change the grade
   */
   app.put('/api/membres/:idGrade', (request, response) => {
    const idGrade = request.params.idGrade;
    const userNow = request.body.userNow
    let query = "update member set id_grade = ($1)   \ \
    where id_member = ($2)" ;
    client.query(query, [idGrade, userNow ], (error, results) => {
      if (error) {
      }
      response.status(200);
      response.send({ "count": results.rowCount });
    })    
  })

}
