module.exports = function (app, client) {

    /**
     * Retrieves the actions of each camera for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     * @param {integer} idGrade identifier of the grade for which we want to retrieve information
     */
    app.get("/api/grades/:idGrade/cameras", (request, response) => {
        const idGrade = request.params;
        const query = "select PE.id_permission, PE.id_camera, CA.name_camera, allowed, notification \
        from permission as PE \
        join camera as CA on PE.id_camera = CA.id_camera \
        where id_grade = ($1)";
        client.query(query, [idGrade], (error, results) => {
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
    app.get("/api/grades", (request, response) => {
        const query = "select GRM.id_grade, GRM.name_grade, CO.name_color as color, \
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
                order by GRM.id_grade ;";
        client.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            // Console.log(results.rows)
            response.status(200).json(results.rows);
        });
    });

    /**
     * Retrieves the number of members for a grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/members", (request, response) => {
        const query = "select GR.id_grade, count(ME.id_member) as members \
        from grade as GR \
        left join member as ME on GR.id_grade = ME.id_grade \
        group by GR.id_grade ;";
        client.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    });

    /**
     * Creates a new grade
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     * @param {integer} name name of the new grade
     * @param {integer} color color of the new grade
     */
    app.put("/api/grades", (request, response) => {
        const name = request.body;
        const idColor = request.body.idcolor;
        const query = "insert into grade (name_grade, id_color) \
        VALUES (($1), ($2))";
        // Request1 Create grade
        client.query(query, [name, idColor], (error1) => {
            if (error1) {
                throw error1;
            }
            // Request2 - Get his id
            const query2 = "select max(grade.id_grade) as id_grade from grade;";
            client.query(query2, (error2, results2) => {
                if (error2) {
                    throw error2;
                }
                // Request3 - Get max number of camera
                const query3 = "select count(*) as number_camera from camera;";
                client.query(query3, (error3, results3) => {
                    if (error3) {
                        throw error3;
                    }
                    // Request4 - Create action for each camera for the grade
                    const query4 = "insert into permission (id_grade, id_camera, allowed, notification) \
                    VALUES (($1), ($2), 'false', 'false')";
                    const idgrade = results2.rows[0].id_grade;
                    const nbrcamera = results3.rows[0].number_camera;
                    for (let idCamera = 1; idCamera < parseInt(nbrcamera, 10) + 1; idCamera += 1) {

                        /*
                         * Try {
                         *     client.query(query4, [idgrade, idCamera], (error, results4) => {
                         *         console.log("error ififif'' ", error) ;
                         *         console.log("cv");
                         *     })
                         *     throw error;
                         *   }
                         *   catch (err) {
                         *     console.log("error 4 ", err) ;
                         *     response.send({message:'ko'});
                         *     return ;
                         *   }
                         */
                        client.query(query4, [idgrade, idCamera], (error4) => {
                            if (error4) {
                                throw error4;
                            }
                        });

                    }
                    // Response.status(200).json(results1.rows);
                    response.send({"message": "ok"});
                });
            });
        });
    });

    /**
     * Get the different existing colors for grade creation/modification
     *
     * @author Clémentine Sacré <c.sacre@students.ephec.be>
     * @method GET
     */
    app.get("/api/grades/colors", (request, response) => {
        const query = "select * \
        from color \
        where id_color not in (select CO.id_color \
                from color as CO \
                join grade as GR on CO.id_color = GR.id_color \
                group by CO.id_color, CO.name_color);";
        client.query(query, (error, results) => {
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
    app.post("/api/grades/:idGrade/acces", (request, response) => {
        const idGrade = request.params;
        const actions = request.body;
        const notifications = request.body;
        const query = "update permission \
        set allowed = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        for (const camera in actions) {
            client.query(query, [actions[camera], idGrade, camera],
                (error) => {
                    if (error) {
                        throw error;
                    }
                });
        }
        const query2 = "update permission \
        set notification = ($1) \
        where id_grade = ($2) and id_camera = ($3) ";
        for (const camera in notifications) {
            client.query(query2, [notifications[camera], idGrade, camera], (error) => {
                if (error) {
                    throw error;
                }
            });

        }
        response.send({"message": "ok"});
    });

};
