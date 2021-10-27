const assert = require("assert");
var request = require("supertest"),

request = request("http://localhost:3001");



describe('GET /api/grades/:idGrade/cameras', function() {
    it('Voir toutes les informations concernant les cameras pour un grade', function(done) {
        request.get('/api/grades/1/cameras')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].name_camera, 'CAFET');
        }), done();
    });
})

describe('GET /api/grades', function() {
    it('Obtenir toutes les informations de tous les grades', function(done) {
        request.get('/api/grades')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].name_grade, 'Directeur');
        }), done();
    });
})

describe('GET /api/grades', function() {
    it('Obtenir chaque camera pour chaque grade', function(done) {
        request.get('/api/grades')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            /*Cameras autorisées par grade*/ 
            assert(response[0].allowedcamera, 10);
            assert(response[1].allowedcamera, 6);
            assert(response[0].allowedcamera, 3);

            /*Cameras non autorisées par grade*/ 
            assert(response[0].refusedcamera, 0);
            assert(response[1].refusedcamera, 4);
            assert(response[0].refusedcamera, 7);

        }), done();
    });
})

describe('GET /api/grades/members', function() {
    it('Obtenir nombre de personnes par grade', function(done) {
        request.get('/api/grades/members')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].id_grade, 3);
            assert(response[0].members, 9);
        }), done();
    });
})

describe('GET /api/grades/colors', function() {
    it('Obtenir toutes les couleurs existantes', function(done) {
        request.get('/api/grades/members')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].id_color, 4);
            assert(response[0].name_color, "#FFF9C4");
        }), done();
    });
})


