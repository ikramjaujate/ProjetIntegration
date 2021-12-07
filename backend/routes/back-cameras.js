const { response } = require("express");


module.exports = function(app,client) {

     /**
 * Récupère à l'aide d'un GET toutes les caméra et leur état 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/

 
  // app.get('/api/camera', (req, response) =>{
  //   client.query('select * from camera  left join status on status.id_status = camera.id_status', (err, result) => {
      
  //     if(err) throw err ;
  //     response.send(result.rows);
     
  //   })
  // })

app.get('/api/cameras', (req, res) =>{

  let query = "select id_camera, name_camera, name_status,ST.id_status \
  from camera as CA \
  join status as ST on CA.id_status = ST.id_status" ;
  client.query(query, (err, result) => {
      if(err) throw err ;
      res.send(result.rows);
    })
  })
  app.get('/api/pictureScreenshoot', (req, res) =>{
    const fs = require('fs');
    let list = []
    fs.readdir('../frontend/public/image-client/', (err, files) => {
      files.forEach(file => {
        list.push(file)
      });
      res.send({"picture" : list[list.length -1]})
    });
    
    })
}
