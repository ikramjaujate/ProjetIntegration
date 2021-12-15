const { response } = require("express");
const _ = require('lodash');


module.exports = function(app,client) {

     /**
 * Récupère à l'aide d'un GET toutes les photos 
 * @author Dallenogare Corentin <corentda@hotmail.fr>
 * @method GET
 **/

  app.get('/api/photos', (req, res) =>{

        const fs = require('fs');
        let list = [];
        fs.readdir('./build', (err, files) => {
          files.forEach(file => {
            
            var last3 = file.substr(file.length - 3); // permet d'obtenir les 3 derniers caractères du nom de fichier
            if ((last3 == "peg") && (file[0] ==="f")) { // ne prend que les fichiers en jpg
              console.log()              
              list.push(file); // ajoute les fichiers à la liste
              
            }
          });
          res.send(list);
        });
        
        })
  


     /**
 * Permet d'envoyer une photo en local sur le vps
 * @author Aurélien Brille <a.brille@students.ephec.be>
 * @method POST
 **/
  
  app.post('/upload-photos', async (req, res) => {
    try {
        if(!req.files) {
            console.log("hellonotOK")
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else if(req.files.photos.length == 2) {
            console.log("hello--")
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
                message: 'Files are uploaded',
                data: data
            });
        }
        else if (typeof(req.files.photos) == "object") {
          console.log(typeof(req.files.photos))
          let photo = req.files.photos;
          photo.mv('./Reconnaissance/images/' + photo.name);
          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size
              }
            })
        }
    } catch (err) {
      console.log(err)
        res.status(500).send(err);
    }
  });
}
