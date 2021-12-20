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
        fs.readdir('../frontend/public', (err, files) => {
          files.forEach(file => {
            
            var last3 = file.substr(file.length - 3); // permet d'obtenir les 3 derniers caractères du nom de fichier
            if ((last3 == "peg") && (file[0] ==="f")) { // ne prend que les fichiers en jpg
              console.log()              
              list.push(file); // ajoute les fichiers à la liste
              
            }
          });
          return res.send(list);
        });
        
    })
  


     /**
 * Permet d'envoyer une photo en local sur le vps
 * @author Aurélien Brille <a.brille@students.ephec.be>
 * @method POST
 **/
  
  app.post('/api/upload-photos', async (req, res) => {
    console.log("ok")
    try {
        if(!req.files) {
            console.log("ok2")
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else if(req.files.photos.length >= 2) {
          console.log("ok3")
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
          console.log("ok4")
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
          console.log("ok5")
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
