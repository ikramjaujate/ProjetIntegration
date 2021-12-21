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
    app.get('/api/gradesInfos', (request ,response) => {
        let query = "  select GR.id_grade, GR.name_grade, CO.name_color as colors\
		from public.grade as GR\
		join color as CO on GR.id_color = CO.id_color\
		where GR.id_color = CO.id_color\
		order by GR.id_grade ;"

        client.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
        })
    });

    /**
     * Retrieves the actions of each camera for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     * @param {integer} idGrade identifier of the grade for which we want to retrieve information
     */
    app.get("/api/grades/:idGrade/cameras",(request, response) => {
        const idGrade = request.params.idGrade ;
        const query = "select PE.id_permission, PE.id_camera, CA.name_camera, allowed, notification \
        from permission as PE \
        join camera as CA on PE.id_camera = CA.id_camera \
        where id_grade = ($1)";
        client.query(query,[idGrade],(error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    });

    /**
     * Recovers information about the different grades, such as their name, their associated color,
     * as well as the number of authorized and refused cameras
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades",(request, response) => {
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
                throw error;
            }
            response.status(200).json(results.rows);
        });
    });

    /**
     * Retrieves the number of members for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/members",(request, response) => {
        const query = "select GR.id_grade, count(ME.id_member) as members \
        from grade as GR \
        left join member as ME on GR.id_grade = ME.id_grade \
        group by GR.id_grade ;";
        client.query(query,(error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    });

    /**
     * Get the different existing colors for grade creation/modification
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/colors",(request, response) => {
        const query = "select * \
        from color \
        where id_color not in (select CO.id_color \
                from color as CO \
                join grade as GR on CO.id_color = GR.id_color \
                group by CO.id_color, CO.name_color);";
        client.query(query,(error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    });

    /**
     * Modifies the actions of the cameras for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to get the information
     * @param {dictionnary} actions  contains a dictionary with the camera ID as key and the new camera action as value (= opposite of the old value)
     * @param {dictionnary} notifications contains a dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
     */
    app.post("/api/grades/:idGrade/acces",(request, response) => {
        let reponse = 0, requete1=false, requete2=false;
        const idGrade = request.params.idGrade;
        const actions = request.body.actions;
        const notifications = request.body.notifications;
        const query = "update permission \
        set allowed = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        for (const camera in actions) {
            client.query(query,[actions[camera],idGrade,camera],(error, results) => {
                if (error) {
                    throw error;
                }
                reponse++ ;
            });
            requete1 = true ;
        }
        const query2 = "update permission \
        set notification = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        for (const camera in notifications) {
            client.query(query2,[notifications[camera],idGrade,camera],(error, results) => {
                if (error) {
                    throw error;
                }
                reponse ++ ;
                response.send({"message": "ok"});
            });
            requete2=true ;
            
        }
        while (requete1==false || requete2==false) {
        }
        response.send({"message": "ok"});
    });

    /**
     * Modifies the action of a cameras for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to get the information
     * @param {dictionnary} actions  contains a dictionary with the camera ID as key and the new camera action as value (= opposite of the old value)
     * @param {dictionnary} notifications contains a dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
     */
     app.post("/api/grades/:idGrade/action",(request, response) => {
        const idGrade = request.params.idGrade;
        const action = request.body.action;
        const camera = request.body.camera;
        const query = "update permission \
        set allowed = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        client.query(query,[action, idGrade, camera],(error, results) => {
            if (error) {
                throw error;
            }
            response.send({"count": results.rowCount});
        });
    });


    /**
     * Modifies the notification of a cameras for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to get the information
     * @param {dictionnary} actions  contains a dictionary with the camera ID as key and the new camera action as value (= opposite of the old value)
     * @param {dictionnary} notifications contains a dictionary with the camera ID as key, and the presence of a notification or not as a value (= opposite of the old value)
     */
     app.post("/api/grades/:idGrade/notification",(request, response) => {
        console.log("access3");
        const idGrade = request.params.idGrade;
        const notification = request.body.notification;
        const camera = request.body.camera;
        const query2 = "update permission \
        set notification = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        client.query(query2,[notification, idGrade, camera],(error, results) => {
            if (error) {
                throw error;
            }
            response.send({"count": results.rowCount});
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
     app.post("/api/grades/:idGrade/order",(request, response) => {
        const newPlace = request.body.newPlace ;
        const idGrade = request.params.idGrade ;
        const query = "update grade \
        set order_place = ($1) \
        where id_grade = ($2);" ;
        client.query(query,[newPlace, idGrade],(error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json({"count" : results.rowCount});
        });
    });

    /**
     * Delete a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method POST
     * @param {integer} idGrade identifier of the grade for which we want to change the order place
     */
     app.delete("/api/grades/:idGrade",(request, response) => {
        const idGrade = request.params.idGrade ;
        const query = "call grade_suppression($1);" ;
        client.query(query,[idGrade],(error, results) => {
            if (error) {
                throw error;
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
    app.put("/api/grade",(request, response) => {
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


    app.post("/api/grades/:idGrade/test",async (request, response) => {
        const idGrade = request.params.idGrade;
        const actions = request.body.actions;
        const notifications = request.body.notifications;
        console.log("actions : ", actions, " notificatiosn ", notifications)

        let allowed =await allo(idGrade, actions) ;
        let notification  = await coucou(idGrade, notifications) ;
        console.log("allowed : ", allowed, " notif : ", notification);
        //console.log("allowed : ", allowed);
        response.send({"actions": allowed, "notifications" : notification});
    });

    // async function allo(idGrade, actions) {
    //     console.log("allo actions : ", actions);
    //     let coucou = 0 ;
    //     const query = "update permission \
    //     set allowed = ($1) \
    //     where id_grade = ($2) and id_camera = ($3) ";
    //     for (const camera in actions) {
    //         await client.query(query,[actions[camera],idGrade,camera],(error, results) => {
    //             if (error) {
    //                 throw error;
    //             }
    //             else {
    //                 // response.send({"message": "ok"});
    //                 coucou +=1;
    //                 console.log("coucou actions +=1")
    //             }
    //         });
    //     }
    //     console.log("coucou fin actions");
    //     return coucou ;
    // };
    async function allo(idGrade, actions) {
        console.log("allo actions : ", actions);
        let coucou = 0 ;
        for (const camera in actions) {
            try {
                await client.query('BEGIN')
                const queryText = 'update permission \
                set allowed = ($1) \
                where id_grade = ($2) and id_camera = ($3)'
                const res = await client.query(queryText, [actions[camera],idGrade,camera])
                await client.query('COMMIT')
                coucou +=1 ;
                console.log("coucou modifie : ", coucou)
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            }
        }
        console.log("coucou à la fin : ", coucou)
        return coucou ;
    };

    async function coucou(idGrade, notifications) {

        console.log("allo notifications : ", notifications);
        let coucou = 0 ;
        for (const camera in notifications) {
            try {
                await client.query('BEGIN')
                const queryText = "update permission \
                set notification = ($1) \
                where id_grade = ($2) and id_camera = ($3);"
                const res = await client.query(queryText, [notifications[camera],idGrade,camera])
                await client.query('COMMIT')
                coucou +=1 ;
                console.log("coucou modifie : ", coucou)
            } catch (e) {
                await client.query('ROLLBACK')
                throw e
            }
        }
        console.log("coucou à la fin : ", coucou)
        return coucou ;

        // console.log("allo notifications : ", notifications);
        // let coucou = 0 ;
        // const query2 = "update permission \
        // set notification = ($1) \
        // where id_grade = ($2) and id_camera = ($3);";
        // let baba = "" ;
        // let index = 2 ;
        // let liste = [idGrade] ;
        // for (const camera in notifications) {
        //     //baba += "update permission set notification = ($" + (Number(index)+1) +") where id_grade = ($1) and id_camera = ($" + index +");" ;
        //     baba+= "call grade_modification(($1), ($" + index +"), ($" + (Number(index)+1) +"));"
        //     liste.push(camera) ;
        //     liste.push(notifications[camera]) ;
        //     index += 2 ;
        //     // client.query(query2,[notifications[camera],idGrade,camera],(error, results) => {
        //     //     if (error) {
        //     //         throw error;
        //     //     }
        //     //     else {
        //     //         // response.send({"message": "ok"});
        //     //         coucou += 1 ;
        //     //         console.log("coucou notifications +=1")
        //     //     }
        //     // });

        //     // client.query('BEGIN', (err) => {
        //     //     if (shouldAbort(err)) return
        //     //     const query2 = "update permission \
        //     //     set notification = ($1) \
        //     //     where id_grade = ($2) and id_camera = ($3);";
        //     //     client.query(query2, [notifications[camera],idGrade,camera], (err, res) => {
        //     //       if (shouldAbort(err)) return
        //     //         client.query('COMMIT', err => {
        //     //           if (err) {
        //     //             console.error('Error committing transaction', err.stack)
        //     //           }
        //     //           else {
        //     //             coucou += 1 ;
        //     //             console.log("coucou notifications +=1")
        //     //           }
        //     //           done()
        //     //         })
        //     //     })
        //     // })
        // }

        // console.log("------------------------")
        // console.log("baba : ", baba);
        // console.log("------------------------")
        // console.log("liste : ", liste);
        // console.log("coucou fin notifications");

        // // baba="call grade_modification(1, 2, 'false'); \
        // // call grade_modification(1, 3, 'true'); \
        // // call grade_modification(1, 4, 'false')"
        // client.query(baba, liste,(error, results) => {
        //     if (error) {
        //         throw error;
        //     }
        //     else {
        //         // response.send({"message": "ok"});
        //         coucou += 1 ;
        //         console.log("coucou notifications +=1")
        //         console.log("results : ", results)
        //     }
        // });

        // return coucou ;


        

    };

};



