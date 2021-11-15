module.exports = function (app, client) {
    var moment = require("moment");
    const jwt = require('jsonwebtoken');
  
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
                    where username = ($1)" ;
        client.query(query, [username], (error, results) => {
          //console.log(results.rows[0].password)
          bcrypt.compare(password, results.rows[0].password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            const token = jwt.sign({
              data: username
            }, 'secret', { expiresIn: '100000h' });
            
            response.send({value: token})
          })
      })
    })

};
