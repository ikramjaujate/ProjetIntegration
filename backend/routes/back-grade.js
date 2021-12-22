const validateToken = require('../middleware/validateToken.js')

module.exports = function (app, client, done) {

    const shouldAbort = err => {
        if (err) {
          console.error('Error in transaction', err.stack)
          client.query('ROLLBACK', err => {
            if (err) {
              console.error('Error rolling back client', err.stack)
            }
            // release the client back to the pool
            done()
          })
        }
        return !!err
      }

    /**
     * 
     * @author : Aurélien
     * @method : GET
     * 
     */
    app.get('/api/gradesInfos', validateToken,(request ,response) => {
        let query = "  select GR.id_grade, GR.name_grade, CO.name_color as colors\
		from public.grade as GR\
		join color as CO on GR.id_color = CO.id_color\
		where GR.id_color = CO.id_color\
		order by GR.id_grade ;"

        client.query(query, (error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } else {
                response.status(200).json(results.rows);
            }
        })
    });

    /**
     * Retrieves the actions of each camera for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     * @param {integer} idGrade identifier of the grade for which we want to retrieve information
     */
    app.get("/api/grades/:idGrade/cameras", validateToken,(request, response) => {
        const idGrade = request.params.idGrade;
        const query = "select PE.id_permission, PE.id_camera, CA.name_camera, allowed, notification \
        from permission as PE \
        join camera as CA on PE.id_camera = CA.id_camera \
        where id_grade = ($1) \
        order by id_permission";
        client.query(query,[idGrade],(error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json(results.rows);
            }
        });
    });

    /**
     * Recovers information about the different grades, such as their name, their associated color,
     * as well as the number of authorized and refused cameras
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades",validateToken,(request, response) => {
        const query = "select GRM.id_grade, GRM.name_grade, GRM.order_place, CO.name_color as color, \
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
                order by GRM.order_place ;";
        client.query(query,(error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json(results.rows);
            }
        });
    });

    /**
     * Retrieves the number of members for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/members", validateToken,(request, response) => {
        const query = "select GR.id_grade, count(ME.id_member) as members \
        from grade as GR \
        left join member as ME on GR.id_grade = ME.id_grade \
        group by GR.id_grade ;";
        client.query(query, (error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } else {
                response.status(200).json(results.rows);
            }
        });
    });


    /**
     * Get the different existing colors for grade creation/modification
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/colors", validateToken,(request, response) => {
        const query = "select * \
        from color \
        where id_color not in (select CO.id_color \
                from color as CO \
                join grade as GR on CO.id_color = GR.id_color \
                group by CO.id_color, CO.name_color);";
        client.query(query, (error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json(results.rows);
            }
        });
    });

    
    /**
     * Change the order place of a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to change the order place
     * @param {integer} newPlace  new number of the place for the grade
     */
     app.post("/api/grades/:idGrade/order",validateToken,(request, response) => {
        const newPlace = request.body.newPlace ;
        const idGrade = request.params.idGrade ;
        const query = "update grade \
        set order_place = ($1) \
        where id_grade = ($2);" ;
        client.query(query,[newPlace, idGrade],(error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json({"count" : results.rowCount});
            }
        });
    });

    /**
     * Delete a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to change the order place
     */
     app.delete("/api/grades/:idGrade",validateToken,(request, response) => {
        const idGrade = request.params.idGrade ;
        const query = "call grade_suppression($1);" ;
        client.query(query,[idGrade],(error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json({"count" : 1});
            }
        });
    });

    /**
     * Creates a new grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method PUT
     * @param {integer} name name of the new grade
     * @param {integer} color color of the new grade
     */
    app.put("/api/grade", validateToken,(request, response) => {
        const name = request.body.name;
        const idColor = request.body.idcolor ;
        const query = "call grade_creation(($1), ($2));";

        client.query(query,[name, idColor],(error, results) => {
            if (error) {
                response.status(400)
                response.send({ 'message': 'An error occurred.' })
            } 
            else {
                response.status(200).json({"count" : 1});
            }
        });
    });


    /**
     * Modifies the permissions of cameras for a grade by calling the right functions
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to modify the information
     * @param {object} actions dictionary with the camera ID as key and the new camera's action as value (= opposite of the old value)
     * @param {object} notifications dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
     */
    app.post("/api/grades/:idGrade/permissions", validateToken,async (request, response) => {
        const idGrade = request.params.idGrade ;
        const actions = request.body.actions ;
        const notifications = request.body.notifications ;
        let actionsSucceed = 0, notificationsSucceed = 0 ;

        if (Object.keys(actions).length !== 0) {
            actionsSucceed = await setActions(idGrade, actions) ;
        }
        if (Object.keys(notifications).length !== 0) {
            notificationsSucceed  = await setNotifications(idGrade, notifications) ;
        }

        response.send({"actions": actionsSucceed, "notifications" : notificationsSucceed});
    });


    /**
     * Modifies the actions of cameras for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idGrade identifier of the grade for which we want to modify the information
     * @param {object} actions dictionary with the camera ID as key, and the new camera's action as value (= opposite of the old value)
     */
    async function setActions(idGrade, actions) {
        let actionsModify = 0 ;
        for (const camera in actions) {
            try {
                await client.query('BEGIN') ;
                const queryText = 'update permission \
                set allowed = ($1) \
                where id_grade = ($2) and id_camera = ($3)' ;
                const res = await client.query(queryText, [actions[camera],idGrade,camera]) ;
                await client.query('COMMIT') ;
                actionsModify += 1 ;
            } 
            catch (e) {
                await client.query('ROLLBACK') ;
                throw e ;
            }
        }
        return actionsModify ;
    };


     /**
     * Modifies the notifications of cameras for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @param {integer} idGrade identifier of the grade for which we want to modify the information
     * @param {object} notifications dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
     */
    async function setNotifications(idGrade, notifications) {
        let notificationsModify = 0 ;
        for (const camera in notifications) {
            try {
                await client.query('BEGIN') ;
                const queryText = "update permission \
                set notification = ($1) \
                where id_grade = ($2) and id_camera = ($3);" ;
                const res = await client.query(queryText, [notifications[camera],idGrade,camera]) ;
                await client.query('COMMIT') ;
                notificationsModify += 1 ;
            } 
            catch (e) {
                await client.query('ROLLBACK') ;
                throw e ;
            }
        }
        return notificationsModify ;
    };

};



