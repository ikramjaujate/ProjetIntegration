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
        fs.readdir('../frontend/public/', (err, files) => {
          files.forEach(file => {
            
            var last3 = file.substr(file.length - 3); // permet d'obtenir les 3 derniers caractères du nom de fichier
            if (last3 == "jpg") { // ne prend que les fichiers en jpg
              list.push(file); // ajoute les fichiers à la liste
            }
          });
          res.send(list);
        });
        
        })
  
}
