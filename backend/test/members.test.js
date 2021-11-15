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
        .get('/api/client')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            //console.log(res)
            // res.body.should.have.property('rowCount').eql(1)
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
            done();
        })
    });
    //     .expect('Content-Type', /json/)
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
        // .expect('Content-Type', /json/)
        // .expect(200)
        // .then(response => {
        //     assert(response[0].count, 2);
        // }), done();
    });
})

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