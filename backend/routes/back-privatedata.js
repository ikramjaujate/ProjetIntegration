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

};
