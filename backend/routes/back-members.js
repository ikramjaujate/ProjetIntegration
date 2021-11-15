module.exports = function (app, client) {
  
    /**
     *
     * @author : Aurélien
     * @method : PUT
     *
     */
    app.put('/api/client', (req, res) => {
      const firstName = req.body.FirstName
      const lastName = req.body.LastName
      const grade = req.body.Grade
      console.log(grade)
      let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))';
      client.query(query, [grade, firstName, lastName], (error, result) => {
        if(error){
          throw error
        }
        res.status(200).json(result);
      })
    })

      /**
       * 
       * @author : Aurélien
       * 
       */

      /*let routes = (app) => {
        router.post("/upload", controller.upload);
        router.get("/files", controller.getListFiles);
        router.get("/files/:name", controller.download);
      
        app.use(router);
      };
      
      module.exports = routes;
    global.__basedir = __dirname;
    
    const initRoutes = require("./src/routes");
    
    app.use(express.urlencoded({ extended: true }));
    initRoutes(app);
    
    let port2 = 8080;  //listen on port 8080 for incoming requests.
    app.listen(port, () => {
      console.log(`Running at localhost:${port2}`);
    });*/

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
      client.query(query, [idMember], (error, results) => {
        if (error) {
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
      })
      response.send({ message: 'ok' });
    })

  /**
   * Eliminate picture of a member
   * 
   * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
   * @method PUT
   * @param {integer} idMember identifier of the member for which we want to eliminate photo
   */
   app.delete('/api/membres/:idMember/eliminate/photo', (request, response) => {
      const idMember = request.params.idMember;
      const photo = request.body.photo
      //console.log(photo)
      let query = "delete from photos \
      where id_member = ($1) and pictures = ($2)" ;

      client.query(query, [idMember, photo], (error, results) => {
        if (error) {
        }
        response.status(200)
        response.send({"count" : results.rowCount})
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
      response.status(200)
    })
    response.send({ message: 'ok' });
  })

}
