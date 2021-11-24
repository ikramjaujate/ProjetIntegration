module.exports = function (app, client) {
    const jwt = require('jsonwebtoken');
  
    const bcrypt = require("bcrypt");

    app.post('/api/login', (request, response) => {

        const username = request.body.username;
        const password = request.body.password;
      
        let query = "select *  \
                    from personal \
                    where username = ($1)" ;
        client.query(query, [username], (error, results) => {
          //console.log(results.rows[0].password)
          if(results.rowCount == 1)  
            bcrypt.compare(password, results.rows[0].password)
            .then(valid => {
              if (!valid) {
                response.status(201).json({ message: 'Mot de passe incorrect !' });
              }
              else {
                const token = jwt.sign({
                data: username
              }, 'secret', { expiresIn: '100000h' });
              response.send({value: token})
              }                          
            })
          else{          
            (response.send({message : "Cet utilisateur n'existe pas"}))
          }
      })
    })


    /**
     * Modifies the password of the user connecter, by crypting it
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} user identifier of user that is trying to modify his password
     * @param {string} oldPassword  old password of the user
     * @param {string} newPassword new password choose by the user
     */
    app.post('/api/:user/password', (request, response) => {
      const oldPassword = request.body.oldPassword;
      const newPassword = request.body.newPassword;
      const user = request.params.user;

      let query = "select password  \
      from personal \
      where id_personal = ($1)" ;
      client.query(query, [user], (error, results) => {
        bcrypt.compare(oldPassword, results.rows[0].password)
        .then(valid => {
          if (!valid) {
            response.status(200).json({ "count": 'ancien mot de passe incorrect' });
          }
          else {
            bcrypt.hash(newPassword, 10, function (err, hash) {
              let query1 = "update personal \
              set password=($1) \
              where id_personal=($2)"
              client.query(query1, [hash, user], (error, results1) => {
                if (error) {
                  throw error
                }
                response.status(200).json({"count" : results1.rowCount});
              })
            })
          }
        })
      })
    })

    /**
     * Modifies the username of the user connecter, by verify the password first
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} user identifier of user that is trying to modify his username
     * @param {string} username  old password of the user
     * @param {string} password new password choose by the user
     */
     app.post('/api/:user/username', (request, response) => {
      const username = request.body.username;
      const password = request.body.password;
      const user = request.params.user;

      //Verify if the username already exists
      let queryVerifyUsername = "select username  \
      from personal \
      where username = ($1)" ;
      client.query(queryVerifyUsername, [username], (error, resultsVerifyUsername) => {
        if (error) {
          throw error
        }
        if (resultsVerifyUsername.rows.length > 0) {
          response.status(200).json({"count" : "nom d'utilisateur déjà utilisé"});
        }
        else {
          //Verify if the password is correct
          let queryVerifyPassword = "select password  \
          from personal \
          where id_personal = ($1)" ;
          client.query(queryVerifyPassword, [user], (error, resultsVerifyPassword) => {
            bcrypt.compare(password, resultsVerifyPassword.rows[0].password)
            .then(valid => {
              if (!valid) {
                response.status(200).json({ "count": 'mot de passe incorrect' });
              }
              else {
                //Update the username
                let queryUpdateUsername = "update personal \
                set username=($1) \
                where id_personal=($2)"
                client.query(queryUpdateUsername, [username, user], (error, resultsUpdateUsername) => {
                  if (error) {
                    throw error
                  }
                  response.status(200).json({"count" : resultsUpdateUsername.rowCount});
                })
              }
            })
          })
        }
      })      
    })

};
