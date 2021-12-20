const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);

request = request("http://localhost:3001");


describe('GET /api/grades/:idGrade/cameras', function() {
    it('Voir toutes les informations concernant les cameras pour un grade', function(done) {
        chai.request(server)
        .get('/api/grades/1/cameras')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[4].name_camera.should.be.eql('SREU3');
            res.body[4].id_camera.should.be.eql(5);
            res.body[4].id_permission.should.be.eql(5);
            res.body[4].allowed.should.be.eql(true);
            res.body[4].allowed.should.be.a("boolean");
            res.body[4].notification.should.be.eql(false);
            res.body[4].notification.should.be.a("boolean");
            done();
        })
    });
})


describe('GET /api/grades', function() {
    it('Obtenir toutes les informations de tous les grades', function(done) {
        chai.request(server)
        .get('/api/grades')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].name_grade.should.be.eql('Directeur');
            res.body[0].color.should.be.eql("#e37352");
            done();
        })
    });
})

describe('GET /api/grades', function() {
    it('Obtenir chaque camera pour chaque grade', function(done) {
        chai.request(server)
        .get('/api/grades')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            /*Cameras autorisées par grade*/ 
            res.body[0].allowedcamera.should.be.eql('10');
            res.body[1].allowedcamera.should.be.eql('6');
            res.body[2].allowedcamera.should.be.eql('3');

            /*Cameras non autorisées par grade*/ 
            res.body[0].refusedcamera.should.be.eql('0');
            res.body[1].refusedcamera.should.be.eql('4');
            res.body[2].refusedcamera.should.be.eql('7');
            done();
        })
    });

    it('Obtenir nombre de personnes par grade', function(done) {
        chai.request(server)
        .get('/api/grades/members')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_grade.should.be.eql(3);
            res.body[0].members.should.be.eql('9');
            done();
        })
    });
})

describe('GET /api/grades/colors', function() {
    it('Obtenir toutes les couleurs existantes', function(done) {
        chai.request(server)
        .get('/api/grades/colors')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_color.should.be.eql(1);
            res.body[0].name_color.should.be.eql('#B2DFDB');
            done();
        })
    });
})

describe('PUT /api/grade', function() {
    it('Ajouter un nouveau grade', function(done) {
        let grade = {
            "name" : "test",
            "idcolor" : 3,
        }
        chai.request(server)
        .put('/api/grade')
        .send(grade)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("count").eql(1)
            done();
        })
    })
});
describe('GET /api/grades', function() {
    it('Tester le nouveau grade ajouté', function(done) {
        chai.request(server)
        .get('/api/grades')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[res.body.length -1].name_grade.should.be.eql("test");
            done();
        })
    });
})

describe('GET /api/gradesInfos', function() {
    it('Sélectionne tous les grades avec leur id associé x2', function(done) {
        chai.request(server)
        .get('/api/gradesInfos')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_grade.should.be.eql(1);
            res.body[0].name_grade.should.be.eql("Directeur");
            res.body[2].id_grade.should.be.eql(3);
            res.body[2].name_grade.should.be.eql("Bénéficiaire");
            done();
        })
    });
})

describe('POST /api/grades/:idGrade/action', function() {
    it('Tester la nouvelle action sur le grade désiré et la caméra désirée', function(done) {
        let action = {
            "camera" : 1,
            "action" : false
        }
        chai.request(server)
        .post('/api/grades/1/action')
        .send(action)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.count.should.be.eql(1);
            done();
        })
    });
})

describe('POST /api/grades/:idGrade/notification', function() {
    it('Tester la nouvelle action sur le grade désiré et la caméra désirée', function(done) {
        let action = {
            "camera" : 1,
            "action" : true
        }
        chai.request(server)
        .post('/api/grades/1/action')
        .send(action)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.count.should.be.eql(1);
            done();
        })
    });
})







