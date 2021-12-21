const { response } = require("express");
//import * as Encrypt from '../helpers/folder-encryption' ;
//const fe = require('../helpers/folder-encryption.js')
//import * as folderEncrypt from 'folder-encrypt';
const folderEncrypt = require('folder-encrypt')
const fs = require('fs') ;
const dotenv = require("dotenv");
dotenv.config();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


//TODO : faire try catch
async function encryptFolder(folderPath) {
  await sleep(1000);
  console.log("encrypt : ", folderPath)
  try {
    
    await folderEncrypt.encrypt({
        password: '123', //TODO : A METTRE DANS LE ENV
        input: folderPath
    })
    .then(() => {
      try {
        console.log("avant")
        fs.rmSync(folderPath, { recursive: true, force : true });
        console.log("apres")
      }
      catch(e) {console.log("fs encrypt : ", e)}
      console.log('encrypted!');})
    .catch((err) => {console.log("err encrypt : ", err);});
    
  }
  catch(e) {console.log("error encrypt : ", e)}
}


async function decryptFolder(folderPath) {
  console.log("decrypt : ", folderPath)
  try {
    await folderEncrypt.decrypt({
      password: '123', //TODO : A METTRE DANS LE ENV
      input: folderPath
    })
    .then(() => {
      try {
        
        fs.rmSync(folderPath, { recursive: true});
      }
      catch (e) {console.log("fs decrypt : ", e)}
      console.log('decrypted!');})
    .then(() => {
      console.log("promesse finie")
    })
    .catch((err) => {console.log("err decrypt : ", err);});
    
  }
  catch (e) {console.log("error decrypt : ", e)}
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
  //fs.rmdirSync("./Reconnaissance/images.encrypted", { recursive: true, force : true });
  await decryptFolder("./Reconnaissance/images.encrypted");

  let query = "select id_camera, name_camera, name_status,ST.id_status \
  from camera as CA \
  join status as ST on CA.id_status = ST.id_status" ;
  client.query(query, (err, result) => {
    if(err) throw err ;
    res.send(result.rows);
  })
  await encryptFolder("./Reconnaissance/images");
  console.log("fin--------------------------")
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
