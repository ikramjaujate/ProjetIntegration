const http = require('http');
const express = require('express') ;
const app = express() ;
const {Client}= require('pg') ;
const cors = require('cors') ;
const mysql = require('mysql');



const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'ProjetIntegration'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})
app.use(express.json()) ;
app.use(cors()) ;  //to avoid CORS policy


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

//AUTHOR : Aurélien
// for saving pictures in local repo on the Resp

/*global.__basedir = __dirname;

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;  //listen on port 8080 for incoming requests.
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});*/
