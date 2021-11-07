const http = require('http');
require("dotenv").config();
const express = require('express') ;
const app = express() ;
const {Client}= require('pg') ;
const cors = require('cors') ;
const mysql = require('mysql');
const router = express.Router();
const controller = require("./src/controller/file.controller");
const { request, response } = require('express');
const port = 3001;

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DATABASE_PORT,
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

app.use(express.json()) ;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
  });


client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } 
  else {
    console.log('connected');
  }
}) ;



/**
 * Récupère les informations des différents grades, comme leur nom, leur couleur associée, ainsi
 * que le nombre de caméras autorisées et refusées
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 */ 
app.get('/api/grades', (request, response) => {

    let query = "select GRM.id_grade, GRM.name_grade, CO.name_color as color, \
                    (select count(*) \
                    from camera as CA \
                    join permission as PE on CA.id_camera = PE.id_camera \
                    join grade as GR on PE.id_grade = GR.id_grade \
                    where GR.id_grade = GRM.id_grade and PE.allowed = true ) as allowedCamera, \
                    \
                    (select count(*) \
                    from camera as CA \
                    join permission as PE on CA.id_camera = PE.id_camera \
                    join grade as GR on PE.id_grade = GR.id_grade \
                    where GR.id_grade = GRM.id_grade and PE.allowed = false ) as refusedCamera \
                from grade as GRM \
                join color as CO on GRM.id_color = CO.id_color \
                order by GRM.id_grade ;"

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;


/**
 * Récupère le nombre de membres appartenant à un certain grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 */ 
app.get('/api/grades/members', (request, response) => {

    let query = "select GR.id_grade, count(ME.id_member) as members \
    from grade as GR \
    left join member as ME on GR.id_grade = ME.id_grade \
    group by GR.id_grade ;" ;

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;


/**
 * Récupère les actions de chacune des caméras pour un grade donné
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {integer} idGrade identifiant du grade pour lequel on souhaite récupérer des informations
 */ 
 app.get('/api/grades/:idGrade/cameras', (request, response) => {

    const idGrade = request.params.idGrade;

    let query = "select PE.id_permission, PE.id_camera, CA.name_camera, allowed, notification \
    from permission as PE \
    join camera as CA on PE.id_camera = CA.id_camera \
    where id_grade = ($1)" ;
    client.query(query, [idGrade], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;


/**
 * Crée un nouveau grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {integer} name nom du nouveau grade
 * @param {integer} color couleur attachée à ce nouveau grade
 */ 
 app.put('/api/grades', (request, response, next) => {

    const name = request.body.name;
    const idColor = request.body.idcolor;

    let query = "insert into grade (name_grade, id_color) \
    VALUES (($1), ($2))" ;
    //Requête1 Creer le grade
    client.query(query, [name, idColor], (error, results1) => {
        if (error) {
            throw error;
        }
        
        //Requête2 - Récupérer son id
        let query2 = "select max(grade.id_grade) as id_grade from grade;";
        client.query(query2, (error, results2) => {
            if (error) {
                throw error;
            }

            //Requête3 - Récupérer le nombre de caméra maximum
            let query3 = "select count(*) as number_camera from camera;" ;
            client.query(query3, (error, results3) => {
                if (error) {
                    throw error;
                }   

                //Requête4 - Créer les actions pour chacune des caméras pour le grade 
                let query4 = "insert into permission (id_grade, id_camera, allowed, notification) \
                VALUES (($1), ($2), 'false', 'false')" ;
                let idgrade=results2.rows[0].id_grade ;
                let nbrcamera = results3.rows[0].number_camera;
                for (let idCamera=1; idCamera<parseInt(nbrcamera)+1 ; idCamera++) {
                    // try {
                    //     client.query(query4, [idgrade, idCamera], (error, results4) => {
                    //         console.log("error ififif'' ", error) ;
                    //         console.log("cv");
                    //     })
                    //     throw 'salit';
                    //   } 
                    //   catch (err) {
                    //     console.log("error 4 ", err) ;
                    //     response.send({message:'ko'});
                    //   }
                    client.query(query4, [idgrade, idCamera], (error, results4) => {
                        if (error) {
                            throw error;
                        }
                    })
                    
                }
                //response.status(200).json(results1.rows);
                response.send(results1);
            })
        })
    })
}) ;

/**
 * Récupère les différentes couleurs existantes pour la création/modification de grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 */ 
 app.get('/api/grades/colors', (request, response) => {

    let query = "select * \
    from color \
    where id_color not in (select CO.id_color \
            from color as CO \
            join grade as GR on CO.id_color = GR.id_color \
            group by CO.id_color, CO.name_color);" ;

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;

/**
 * 
 * @author : Aurélien
 * @method : PUT
 * 
 */

app.put('/api/client', (req, res) => {  
    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const grade = req.body.Grade
    console.log(grade)
    let query = 'insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))' ;
    client.query(query, [grade, firstName, lastName], (error, result) => {
        
    })
  })
  
 /**
 * 
 * @author : Aurélien
 * @method : GET
 * 
 */
 
  app.get('/api/gradesInfos', (request, response) => {
    let query = "select id_grade, name_grade from grade";
    
    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
  }) ;
  
  
/**
 * 
 * @author : Aurélien
 * 
 */

 /*let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.download);
  
    app.use(router);
  };
  
  module.exports = routes;
global.__basedir = __dirname;

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port2 = 8080;  //listen on port 8080 for incoming requests.
app.listen(port, () => {
  console.log(`Running at localhost:${port2}`);
});*/
