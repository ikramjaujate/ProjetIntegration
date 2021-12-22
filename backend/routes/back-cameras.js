const { time } = require("console");
const { response } = require("express");
//import * as Encrypt from '../helpers/folder-encryption' ;
//const fe = require('../helpers/folder-encryption.js')
//import * as folderEncrypt from 'folder-encrypt';
const Encryption = require("../helpers/folder-encryption.js");

module.exports = function (app, client) {

  /**
  * Récupère à l'aide d'un GET toutes les caméra et leur état 
  * @author Cécile Bonnet <c.bonnet@gmail.com>
  * @method GET
  **/
  app.get('/api/cameras', (req, res) => {
    //await Encryption.decryptFolder("./Reconnaissance/images.encrypted");

    let query = "select id_camera, name_camera, name_status,ST.id_status \
    from camera as CA \
    join status as ST on CA.id_status = ST.id_status" ;
    client.query(query, (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    })
    //await Encryption.encryptFolder("./Reconnaissance/images");
  })


  app.get('/api/pictureScreenshoot',  (req, res) => {
    /*await Encryption.decryptFolder('../frontend/public/imgClient.encrypted');
    const fs = require('fs');
    const util = require('util');
    const readdir = util.promisify(fs.readdir);
    const rename = util.promisify(fs.rename);*/
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
    
    fs.readdir('../frontend/public/imgClient/',  (err, files) => {
      files.forEach(file => {
        list.push(file)
      });
      res.send({ "picture": list[list.length - 1] })
  
      //await Encryption.encryptFolder('../frontend/public/imgClient');
    });
  })

  app.get('/api/photos/encrypt', async(req, res) => {
    await Encryption.encryptFolder("../frontend/public/imgClient");
    res.send('tototototo')
  })

  app.get('/api/photos/decrypt', async(req, res) => {
    await Encryption.decryptFolder("../frontend/public/imgClient.encrypted");
    res.send('eeeeeeeeee')
  })
}
