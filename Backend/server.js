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

    let query = "select PRM.id, PRM.name, CO.colorCode as color, \
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
    from profile as PRM \
    join color as CO on PRM.idColor = CO.idColor \
    order by PRM.id ;" ;

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
 app.put('/api/grades', (request, response, next) => {

    const name = request.body.name;
    const idColor = request.body.idcolor;

    let query = "insert into profile (name, idColor) \
    VALUES (($1), ($2))" ;
    //Requête1 Creer le grade
    client.query(query, [name, idColor], (error, results1) => {
        if (error) {
            throw error;
        }
        
        //Requête2 - Récupérer son id
        let query2 = "select max(profile.id) as idGrade from profile";
        client.query(query2, (error, results2) => {
            if (error) {
                throw error;
            }

            //Requête3 - Récupérer le nombre de caméra maximum
            let query3 = "select count(*) as numberCamera from camera" ;
            client.query(query3, (error, results3) => {
                if (error) {
                    throw error;
                }   

                //Requête4 - Créer les actions pour chacune des caméras pour le grade 
                let query4 = "insert into access (idProfile, idCamera, allowed, notification) \
                VALUES (($1), ($2), 'false', 'false')" ;
                let idgrade=results2.rows[0].idgrade ;
                let nbrcamera = results3.rows[0].numbercamera;
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
    where idColor not in (select CO.idColor \
                        from color as CO \
                        join profile as PR on CO.idColor = PR.idColor \
                        group by CO.idColor, CO.colorCode);" ;

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}) ;

