const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);
request = request("http://localhost:3001");

describe('GET /api/membres/:idMembre', function() {
    it("Obtenir toutes les informations concernant un membre avec generation d'erreur VOLONTAIRE ", function(done) {
        chai.request(server)
        .get('/api/membres/x')
        .end((err, res) => {
            res.status.should.be.eql(400); 
            console.log(res.status)
            done();
        })
    });
})

describe('PUT /api/client', function() {

    it('Ne devrait pas ajouter un client sans nom de famille', function(done) {
        let client ={
            FirstName : "TestFN" ,
            Grade : 1
        };
        chai.request(server)
        .put('/api/client')
        .send(client)
        .end((err, res) => {
            res.status.should.be.eql(400); 
            done();
        })
    })
});

describe('POST /api/grades/:idGrade/action', function() {
    it('Tester la nouvelle action sur le grade désiré et la caméra désirée', function(done) {
        let action = {
            "camera" : 1
        }
        chai.request(server)
        .post('/api/grades/1/action')
        .send(action)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    });
})

describe('DELETE /api/membres/:idMember/eliminate/photo', function() {
    it('Générer erreur VOLONTAIRE :  supprimer une photo qui correspond à un utilisateur', function(done) {
        let photo ={
            photo : 'ikram1.jpg'
        };
        chai.request(server)
        .delete('/api/membres/x/eliminate/photo')
        .send(photo)
        .end((err, res) => {
            res.should.have.status(400);
            done();
        })
    });
})
