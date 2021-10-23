
/**
 * 
 * @author : Aurélien
 * @method : PUT
 * 
 */
module.exports = function (app, client) {
  app.put('/api/client', (req, res) => {
    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const grade = req.body.Grade
    console.log(grade)
    let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))';
    client.query(query, [grade, firstName, lastName], (error, result) => {

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
  });


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
  app.get('/api/membres/:idMember/photos/count', (request, response) => {

    const idMember = request.params.idMember;

    let query = "select count(distinct(PO.pictures )) \
  from photos as PO\
  join member as ME on PO.id_member = ME.id_member  \
  where ME.id_member = ($1)" ;
    client.query(query, [idMember], (error, results) => {
      console.log(results.rows)
      if (error) {
      }
      response.status(200).json(results.rows)
    })
  })



}
