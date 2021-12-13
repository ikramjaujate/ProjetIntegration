const { response } = require("express");


module.exports = function(app,client) {

     /**
 * Récupère à l'aide d'un GET toutes les photos 
 * @author Dallenogare Corentin <corentda@hotmail.fr>
 * @method GET
 **/

  app.get('/api/photos', (req, response) =>{

        const fs = require('fs');
        let list = [];
        fs.readdir('./build', (err, files) => {
          /*if(err){
            response.status(500)
            response.send({ 'message': 'An error occurred.'})
          }*/
          files.forEach(file => {
            
            var last3 = file.substr(file.length - 3); // permet d'obtenir les 3 derniers caractères du nom de fichier
            if ((last3 == "peg") && (file[0] ==="f")) { // ne prend que les fichiers en jpg
              console.log()              
              list.push(file); // ajoute les fichiers à la liste
              
            }
          });
          response.status(200)
          response.send(list);
        });
        
        })
  
}
