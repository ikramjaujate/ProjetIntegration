module.exports = function (app, client) {
    var jwt = require('jsonwebtoken');
  
    var bcrypt = require("bcrypt");

    app.post('/api/login', (request, response) => {
       
        const username = request.body.username;
        // console.log(username)
        const password = request.body.password;
        // console.log(password)
      
        let query = "select *  \
                    from personal \
                    where username = ($1)" ;
        client.query(query, [username], (error, results) => {
          console.log(results)
          bcrypt.compare(password, results.rows[0].password)
          .then(valid => {
            if (!valid) {
              response.status(401).json({ error: 'Mot de passe incorrect !' }); 
            }
            const token = jwt.sign({
              data: username
            }, 'secret', { expiresIn: '100000h' });
            
            response.send({value: token})
          })
      })
    })

};
