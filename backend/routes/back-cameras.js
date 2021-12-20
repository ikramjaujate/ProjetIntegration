const { response } = require("express");
//import * as Encrypt from '../helpers/folder-encryption' ;
//const fe = require('../helpers/folder-encryption.js')
//import * as folderEncrypt from 'folder-encrypt';
const folderEncrypt = require('folder-encrypt')
const fs = require('fs') ;

//TODO : faire try catch
async function encryptFolder(folderPath) {
  try {
    await folderEncrypt.encrypt({
        password: '123', //TODO : A METTRE DANS LE ENV
        input: folderPath
    })
    fs.rmdirSync(folderPath, { recursive: true, force : true });
  }
  catch {}
}
async function decryptFolder(folderPath) {
  try {
    await folderEncrypt.decrypt({
      password: '123', //TODO : A METTRE DANS LE ENV
      input: folderPath
    })
    fs.rmdirSync(folderPath, { recursive: true, force : true });
  }
  catch {}
}
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

app.get('/api/cameras', async (req, res) =>{
  await decryptFolder("./Reconnaissance/images.encrypted");

  let query = "select id_camera, name_camera, name_status,ST.id_status \
  from camera as CA \
  join status as ST on CA.id_status = ST.id_status" ;
  client.query(query, (err, result) => {
      if(err) throw err ;
      res.send(result.rows);
    })
    await encryptFolder("./Reconnaissance/images");

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
