
/**
 *
 * @author : Aurélien
 * @method : PUT
 *
 */
module.exports = function (app, client) {

    app.put(
        "/api/client",
        (req, res) => {

            const firstName = req.body.FirstName,
                lastName = req.body.LastName,
                grade = req.body.Grade;
            console.log(grade);
            const query = "insert into member (id_grade, first_name, last_name) values (($1), ($2), ($3))";
            client.query(
                query,
                [
                    grade,
                    firstName,
                    lastName
                ],
                (error, result) => {

                }
            );

        }
    );

    /**
     *
     * @author : Aurélien
     * @method : GET
     *
     */

    app.get(
        "/api/gradesInfos",
        (request, response) => {

            const query = "select id_grade, name_grade from grade";

            client.query(
                query,
                (error, results) => {

                    if (error) {

                        throw error;

                    }
                    response.status(200).json(results.rows);

                }
            );

        }
    );


    /**
     *
     * @author : Aurélien
     *
     */

    /*
     *Let routes = (app) => {
     * router.post("/upload", controller.upload);
     * router.get("/files", controller.getListFiles);
     * router.get("/files/:name", controller.download);
     *
     * app.use(router);
     *};
     *
     *module.exports = routes;
     *global.__basedir = __dirname;
     *
     *const initRoutes = require("./src/routes");
     *
     *app.use(express.urlencoded({ extended: true }));
     *initRoutes(app);
     *
     *let port2 = 8080;  //listen on port 8080 for incoming requests.
     *app.listen(port, () => {
     *console.log(`Running at localhost:${port2}`);
     *});
     */


};
