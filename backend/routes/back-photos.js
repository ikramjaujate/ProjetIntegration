const _ = require('lodash');
const Encryption = require("../helpers/folder-encryption.js");
const validateToken = require('../middleware/validateToken.js')


module.exports = function(app,client) {

  /**
  * Récupère à l'aide d'un GET toutes les photos 
  * @author Dallenogare Corentin <corentda@hotmail.fr>
  * @method GET
  **/
  app.get('/api/photos', validateToken,async(req, res) =>{
    //await Encryption.decryptFolder("./build/imgClient.encrypted");
    const fs = require('fs');
    let list = [];
    fs.readdir('./build/imgClient', async(err, files) => {
      files.forEach(file => {
        
        var last3 = file.substr(file.length - 3); // permet d'obtenir les 3 derniers caractères du nom de fichier
        if ((last3 == "peg") && (file[0] ==="f")) { // ne prend que les fichiers en jpg           
          list.push(file); // ajoute les fichiers à la liste
        }
      });
      
      res.send(list);
      //await Encryption.encryptFolder("./build/imgClient");   
    });   
  })

         /**
 * Delete picture from local storage  
 * @author Derwa Alexandre <he201886@students.ephec.be>
 * @method DELETE
 * @param {string} idPhoto file name of the picture to delete
 **/    

    
  app.delete('/api/photos/:idPhoto', validateToken,(req, res) =>{
    const fs = require('fs');
    idPhoto= req.params.idPhoto
    console.log(idPhoto);
    const pathToFile = './build/imgClient/' + idPhoto 
    fs.unlink(pathToFile, (err) => {
       if (err) {
          throw err;
       } else {
          res.status(200);
          res.send()
       }
    }) 
  }) 
  

  /**
  * Permet d'envoyer une photo en local sur le vps
  * @author Aurélien Brille <a.brille@students.ephec.be>
  * @method POST
  **/
  app.post('/api/upload-photos', validateToken,async (req, res) => {
    try {
        if(!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else if(req.files.photos.length >= 2) {
            let data = []; 
            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];
                //move photo to uploads directory
                photo.mv('./Reconnaissance/images/' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
                
            });
    
            //return response
            res.send({
                status: true,
                message: 'File(s) uploaded',
                data: data
            });
        }
        else if (typeof(req.files.photos) == "object") {
          let photo = req.files.photos;
          photo.mv('./Reconnaissance/images/' + photo.name);
          //send response
            res.send({
              status: true,
              message: 'File(s) uploaded',
              data: {
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size
              }
            })
        }
        else {
            res.send({
            status: false,
            message: 'No files uploaded'
        });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
  });
}
