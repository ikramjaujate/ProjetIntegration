module.exports = function (app, client) {
    const bcrypt = require("bcrypt");

    app.post('/api/login', (request, response) => {

        const username = request.body.username;
        const password = request.body.password;

        // bcrypt.hash(password, 10, function (err, hash) {
        //     console.log(hash)
            
        // })

        
          /*bcrypt.compare(test, 123, (error, response1) => {
            console.log("type : ", response1)
            if (response1) {
              request.session.user = results;
              response.send(results);
            } else {
              response.send({message:'ko', msg:"Mauvais nom d'utilisateur et/ou de mot de passe"});
            }
          });*/
  


        
        let query = "select *  \
                    from personal \
                    where username = ($1) and password= $2" ;
        client.query(query, [username, password], (error, results) => {
          // bcrypt.compare(password, results.rows[0].password, (error, res) => {
            
            if (results) {
                response.send({value: results})
            } else {
                response.send({value :"Mauvais nom d'utilisateur et/ou de mot de passe"});
            }
          // });
          //response.send({ rowCount: results.rowCount });
          //response.status(200).json(results.rowCount)
        })
      })

};
