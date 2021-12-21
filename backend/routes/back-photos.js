const _ = require('lodash');

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
 * Récupère à l'aide d'un GET toutes les photos 
 * @author Dallenogare Corentin <corentda@hotmail.fr>
 * @method GET
 **/

  app.get('/api/photos', async(req, res) =>{

    await decryptFolder("../frontend/public/imgClient.encrypted");
        const fs = require('fs');
        let list = [];
        fs.readdir('../frontend/public/imgClient', (err, files) => {
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
app.get('/api/encrypt', async(req, res) =>{

    await encryptFolder("../frontend/public/imgClient");
          
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
