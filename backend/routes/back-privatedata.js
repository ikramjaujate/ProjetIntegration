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
          // console.log(results.rows[0])
          bcrypt.compare(password, results.rows[0].password)
          .then(valid => {
            if (!valid) {
              response.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            const token = jwt.sign({
              data: username
            }, 'secret', { expiresIn: '100000h' });
            
            response.send({value: token, id : results.rows[0].id_personal})
          })
      })
    })

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
          response.status(200).json({"count" : "erreur"});
        })
      })
    })


};
