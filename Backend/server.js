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
 * Recovers information about the different grades, such as their name, their associated color, 
 * as well as the number of authorized and refused cameras
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
 * Retrieves the number of members for a grade
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
 * Retrieves the actions of each camera for a grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {integer} idGrade identifier of the grade for which we want to retrieve information
 */ 
 app.get('/api/grades/:idGrade/cameras', (request, response) => {

    const idGrade = request.params.idGrade;

    let query = "select idAccess, idCamera, CA.name, allowed, notification \
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
 * Creates a new grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {integer} name name of the new grade
 * @param {integer} color color of the new grade
 */ 
 app.put('/api/grades', (request, response, next) => {

    const name = request.body.name;
    const idColor = request.body.idcolor;

    let query = "insert into profile (name, idColor) \
    VALUES (($1), ($2))" ;
    //Requête1 Create grade
    client.query(query, [name, idColor], (error, results1) => {
        if (error) {
            throw error;
        }
        
        //Requête2 - Get his id
        let query2 = "select max(profile.id) as idGrade from profile";
        client.query(query2, (error, results2) => {
            if (error) {
                throw error;
            }

            //Requête3 - Get max number of camera
            let query3 = "select count(*) as numberCamera from camera" ;
            client.query(query3, (error, results3) => {
                if (error) {
                    throw error;
                }   

                //Requête4 - Create action for each camera for the grade
                let query4 = "insert into access (idProfile, idCamera, allowed, notification) \
                VALUES (($1), ($2), 'false', 'false')" ;
                let idgrade=results2.rows[0].idgrade ;
                let nbrcamera = results3.rows[0].numbercamera;
                for (let idCamera=1; idCamera<parseInt(nbrcamera)+1 ; idCamera++) {
                    try {
                        client.query(query4, [idgrade, idCamera], (error, results4) => {
                            console.log("error ififif'' ", error) ;
                            console.log("cv");
                        })
                        throw 'salit';
                      } 
                      catch (err) {
                        console.log("error 4 ", err) ;
                        response.send({message:'ko'});
                        return ;
                      }
                    // client.query(query4, [idgrade, idCamera], (error, results4) => {
                    //     if (error) {
                    //         throw error;
                    //     }
                    // })
                    
                }
                //response.status(200).json(results1.rows);
                response.send({message:'ok'});
            })
        })
    })
}) ;

/**
 * Get the different existing colors for grade creation/modification
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


/**
 * Modifies the actions of the cameras for a grade
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method POST
 * @param {integer} idGrade identifier of the grade for which we want to get the information
 * @param {dictionnary} actions  contains a dictionary with the camera ID as key and the new camera action as value (= opposite of the old value)
 * @param {dictionnary} notifications contains a dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
 */ 
 app.post('/api/grades/:idGrade/acces', (request, response) => {

    const idGrade = request.params.idGrade;
    const actions = request.body.actions ;
    const notifications = request.body.notifications ;
    let query = "update access \
    set allowed = ($1) \
    where idprofile = ($2) and idcamera = ($3) " ;
    for (let camera in actions) {
        client.query(query, [actions[camera], idGrade, camera], (error, results) => {
            if (error) {
                throw error;
            }
        })
    }
    let query2 = "update access \
    set notification = ($1) \
    where idprofile = ($2) and idcamera = ($3) " ;
    for (let camera in notifications) {
        client.query(query2, [notifications[camera], idGrade, camera], (error, results) => {
            if (error) {
                throw error;
            }  
        })
    }
    response.send({message:'ok'});
}) ;