const { time } = require("console");
const { response } = require("express");
//import * as Encrypt from '../helpers/folder-encryption' ;
//const fe = require('../helpers/folder-encryption.js')
//import * as folderEncrypt from 'folder-encrypt';
const Encryption = require("../helpers/folder-encryption.js");
const validateToken = require('../middleware/validateToken.js')

module.exports = function (app, client) {

  /**
  * Récupère à l'aide d'un GET toutes les caméra et leur état 
  * @author Cécile Bonnet <c.bonnet@gmail.com>
  * @method GET
  **/
   app.get('/api/cameras', validateToken ,(req, response) => {
    let query = "select id_camera, name_camera, name_status,ST.id_status \
  from camera as CA \
  join status as ST on CA.id_status = ST.id_status" ;
    client.query(query, (err, result) => {
      if (err) {
        response.status(400)
        response.send({ 'message': 'An error occurred.' })
      } 
      else {
        response.status(200)
        response.send(result.rows);
      }
    })
  })
  
  app.get('/api/pictureScreenshoot', (req, response) => {
    const fs = require('fs');
    let list = []
    /*fs.readdir('../frontend/public/imgTemp/',  async(err, files) => {
      console.log('eeeee')
      const file = files[0]
          fs.rename('../frontend/public/imgTemp/' + file, '../frontend/public/imgClient/' + file, function (err) {
          if (err) throw err
          console.log('done')
        })
        console.log('finiiiii')
    });*/
    
    fs.readdir('./build/imgClient/',  (err, files) => {
      files.forEach(file => {
        list.push(file)

      });
      res.send({ "picture": list[list.length - 1] })

    });
  })

  /**
  * Encrypt a folder/file
  * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
  * @method GET
  **/
  app.get('/api/photos/encrypt', validateToken,async(req, res) => {
    await Encryption.encryptFolder("./build/imgClient");
    res.send('encrypt')
  })

  /**
  * Decrypt a folder/file
  * @author Ikram Jaujate Ouldkhala <i.jaujateouldkhala@students.ephec.be>
  * @method GET
  **/
  app.get('/api/photos/decrypt', validateToken,async(req, res) => {
    await Encryption.decryptFolder("./build/imgClient.encrypted");
    res.send('decrypt')
  })
      
  
  app.get('/api/permission/:picture/:camera', (req, res) =>{
    const picture = req.params.picture
    const camera = req.params.camera
    console.log(picture, camera)
    const query = "SELECT pm.allowed, pm.notification, pm.id_camera \
    from photos as ph \
    inner join member as mb on ph.id_member = mb.id_member \
    inner join permission as pm on mb.id_grade = pm.id_grade \
    where pictures = ($1) and id_camera = ($2)";
    client.query(query,[picture, camera],(error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });   
  })
  
}
