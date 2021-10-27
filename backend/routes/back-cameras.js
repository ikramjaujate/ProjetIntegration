module.exports = function (app, client) {
    app.get("/api/etatCam", (req, res) => {

        /**
         * Récupère à l'aide d'un GET toutes les caméra et leur état
         * @author Cécile Bonnet <c.bonnet@gmail.com>
         * @method GET
         */
        client.query("select * from camera", (err, result) => {
            // Console.log(result.rows)
            if (err) {
                throw err;
            }
            res.send(result.rows);
        });
    });
};
