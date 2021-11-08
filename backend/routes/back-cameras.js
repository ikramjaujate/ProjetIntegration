const { response } = require("express");

module.exports = function(app,client) {

     /**
 * Récupère à l'aide d'un GET toutes les caméra et leur état 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/

 
  app.get('/api/camera', (req, response) =>{
    client.query('select * from camera  left join status on status.id_status = camera.id_status', (err, result) => {
      
      if(err) throw err ;
      response.send(result.rows);
     
    })
  })
 }
