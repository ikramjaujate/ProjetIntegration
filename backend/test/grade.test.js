const assert = require("assert");
var request = require("supertest"),

    request = request("http://localhost:3001");

describe(
    "GET /api/grades/:idGrade/cameras",
    () => {

        it(
            "Voir si requete passe ",
            (done) => {

                request.get("/api/grades/1/cameras").
                    expect(
                        "Content-Type",
                        /json/
                    ).
                    expect(200), done();

            }
        );

    }
);

describe(
    "GET /api/grades/:idGrade/cameras",
    () => {

        it(
            "Voir toutes les informations concernant les cameras pour un grade",
            (done) => {

                request.get("/api/grades/999/cameras").
                    expect(
                        "Content-Type",
                        /json/
                    ).
                    expect(200).
                    then((response) => {

                        assert(
                            response.status,
                            200
                        );

                    }), done();

            }
        );

    }
);

describe(
    "GET /api/grades",
    () => {

        it(
            "Obtenir toutes les informations de tous les grades",
            (done) => {

                request.get("/api/grades").
                    expect(
                        "Content-Type",
                        /json/
                    ).
                    expect(200).
                    then((response) => {

                        assert(
                            response[0].name_grade,
                            "Directeur"
                        );

                    }), done();

            }
        );

    }
);
