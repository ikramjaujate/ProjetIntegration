const { response } = require("express");


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
            if (last3 == "peg") { // ne prend que les fichiers en jpg
                            
              list.push(file); // ajoute les fichiers à la liste
              
            }
          });
          res.send(list);
        });
        
        })


         /**
 * Delete picture from local storage  
 * @author Derwa Alexandre <he201886@students.ephec.be>
 * @method DELETE
 * @param {string} idPhoto file name of the picture to delete
 **/    

    
  app.delete('/api/photos/:idPhoto', (req, res) =>{
    console.log("oto")
    const fs = require('fs');
    idPhoto= req.params.idPhoto
    console.log(idPhoto);
    const pathToFile = '../frontend/public/' + idPhoto 
    fs.unlink(pathToFile, (err) => {
       if (err) {
          throw err;
       } else {
          console.log("Successfully deleted the file.")
          response.status(200);
          response.send()
       }
    }) 
    /*client.query(query, [idPhoto], (error, res) => {
      if (error) {
        response.statut(400);
        response.send(error);
      }
      else{
        response.status(200);
        response.send({"message" : "ok"});
      }

    })*/

    /*const fs = require('fs');
    const pathToFile = '../../public/frame_2021-11-23-20_43_44.jpeg'
    fs.unlink(pathToFile, (err) => {
       if (err) {
          throw err;
       } else {
          console.log("Successfully deleted the file.")
       }
    }) */


  }) 
  
}
