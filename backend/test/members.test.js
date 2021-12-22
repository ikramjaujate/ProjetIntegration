const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);
request = request("http://localhost:3001");

describe('PUT /api/client', function() {
    it('Créé un nouveau client avec son nom prénom et grade', function(done) {
        let client ={
            FirstName : "TestFN" ,
            LastName : "TestLN" ,
            Grade : 1
        };
        chai.request(server)
        .put('/api/client')
        .send(client)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok').eql("ok")
            done();
        })
    })

});

describe('GET /api/membres/:idMembre', function() {
    it('Obtenir toutes les informations concernant un membre', function(done) {
        chai.request(server)
        .get('/api/membres/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_member.should.be.eql(1);
            res.body[0].first_name.should.be.eql('Jean');
            res.body[0].last_name.should.be.eql('Ab');
            res.body[0].id_grade.should.be.eql(1);
            done();
        })
    });
})


describe('GET /api/membres/:idMembre/photos', () => {
    it('Obtenir les photos concernant un membre', (done) => {
        chai.request(server)
        .get('/api/membres/1/photos')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].pictures.should.be.eql('ikram1.jpg');
            done();
        })
    });
})

describe('GET /api/membres/:idMembre/photos/count', function() {
    it('Obtenir le nombre de photo concernant un membre', function(done) {
        chai.request(server)
        .get('/api/membres/1/photos/count')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].count.should.be.eql('2');
            done();
        })
    });
})

describe('DELETE /api/membres/:idMember/eliminate/photo', function() {
    it('Supprime une photo qui correspond à un utilisateur', function(done) {
        let photo ={
            photo : "ikram2.jpg"
        };
        chai.request(server)
        .delete('/api/membres/1/eliminate/photo')
        .send(photo)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('count').eql(1);
            done();
        })
    });
})

describe('GET /api/membres/:idMember/name', () => {
    it("Obtient le nom d'un membre selon son id", (done) => {
        chai.request(server)
        .get('/api/membres/1/name')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].first_name.should.be.eql('Jean');
            res.body[0].last_name.should.be.eql('Ab');
            done();
        })
    });
})


describe('PUT /api/membres/:idMember/update', function() {
    it("Modification du nom et du prénom d'un membre selon son id", function(done) {
        let member = {
            "name" : "NouveauPrenom",
            "surname" : "NouveauNomFamille"
        }
        chai.request(server)
        .put('/api/membres/1/update')
        .send(member)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("count").eql(1);
            done();
        })
    });
})

describe('GET /api/membres/:idMembre/grade', function() {
    it('Obtenir toutes les informations concernant un membre', function(done) {
        chai.request(server)
        .get('/api/membres/1/grade')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_member.should.be.eql(1);
            res.body[0].id_grade.should.be.eql(1);
            res.body[0].name_grade.should.be.eql("Directeur");
            res.body[0].color.should.be.eql("#e37352");
            done();
        })
    })
})

describe("PUT /api/membres/:idGrade", function() {
    it("Change le grade d'un membre", function(done) {
        let client ={
            userNow :  5,
        };
        chai.request(server)
        .put('/api/membres/2')
        .send(client)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("count").eql(1);
            done();
        })
    })
});