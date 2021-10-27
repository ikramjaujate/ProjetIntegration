module.exports = function (app, client) {

 module.exports = function(app,client) {
     /**
 * Récupère à l'aide d'un GET toutes les caméra et leur état 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/

 app.get('/api/etatCam', (req, res) =>{
  
    client.query('select * from camera', (err, result) => {
      //console.log(result.rows)
  
      if(err) throw err ;
      res.send(result.rows);
     
    })
  })
 }
