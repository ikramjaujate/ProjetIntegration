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

    let query = "select PRM.id, PRM.name, PRM.color, \
	   (select count(*) \
		from camera as CA \
		join access as AC on CA.id = AC.idCamera \
	    join profile as PR on AC.idProfile = PR.id \
	    where PR.id = PRM.id and AC.allowed = true ) as allowedCamera, \
		\
		(select count(*) \
		from camera as CA \
		join access as AC on CA.id = AC.idCamera \
	    join profile as PR on AC.idProfile = PR.id \
	    where PR.id = PRM.id and AC.allowed = false ) as refusedCamera \
    from profile as PRM ;" ;

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

    let query = "select PR.id, count(ME.idMember) as members \
    from profile as PR \
    left join member as ME on PR.id = ME.idProfile \
    group by PR.id ;" ;

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

    let query = "select idAccess, idProfile, CA.name, allowed, notification \
    from access as AC \
    join camera as CA on AC.idCamera = CA.id \
    where idProfile = ($1)" ;
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
 app.put('/api/grades', (request, response) => {

    const name = request.body.name;
    const color = request.body.color;

    let query = "insert into profile (name, color) \
    VALUES (($1), ($2))" ;
    client.query(query, [name, color], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
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
    from color;" ;

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;

