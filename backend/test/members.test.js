const assert = require("assert");
var request = require("supertest"),

request = request("http://localhost:3001");

describe('PUT /api/client', function() {
    it('Créé un nouveau client avec son nom prénom et grade', function(done) {
        let client ={
            FirstName : "TestFN" ,
            LastName : "TestLN" ,
            Grade : 1
        }
        request.get('/api/client')
        .send(client)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response, 1);
        }), done();
    });
})

describe('GET /api/membres/:idMembre', function() {
    it('Obtenir toutes les informations concernant un membre', function(done) {
        request.get('/api/membres/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].id_member, 1);
            assert(response[0].first_name, "Jean");
            assert(response[0].last_name, "Ab");
        }), done();
    });
})

describe('GET /api/membres/:idMembre/photos', function() {
    it('Obtenir les photos concernant un membre', function(done) {
        request.get('/api/membres/1/photos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].pictures, "ikram2.jpg");
        }), done();
    });
})

/*describe('GET /api/membres/:idMembre/photos/count', function() {
    it('Obtenir le nombre de photo concernant un membre', function(done) {
        request.get('/api/membres/:idMember/photos/count')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].count, 2);
        }), done();
    });
})*/

/*describe('GET /api/membres/:idMembre/grade', function() {
    it('Obtenir toutes les informations concernant un membre', function(done) {
        request.get('/api/membres/1/grade')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            assert(response[0].id_member, 1);
        }), done();
    });
})*/