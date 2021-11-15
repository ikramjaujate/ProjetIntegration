const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);

request = request("http://localhost:3001");



// describe('GET /api/grades/:idGrade/cameras', function() {
//     it('Voir toutes les informations concernant les cameras pour un grade', function(done) {
//         request.get('/api/grades/1/cameras')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].name_camera, 'CAFET');
//         }), done();
//     });
// })

describe('GET /api/grades/:idGrade/cameras', function() {
    it('Voir toutes les informations concernant les cameras pour un grade', function(done) {
        chai.request(server)
        .get('/api/grades/1/cameras')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].name_camera.should.be.eql('CAFET');
            done();
        })
    });
})



// describe('GET /api/grades', function() {
//     it('Obtenir toutes les informations de tous les grades', function(done) {
//         request.get('/api/grades')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].name_grade, 'Directeur');
//         }), done();
//     });
// })

describe('GET /api/grades', function() {
    it('Obtenir toutes les informations de tous les grades', function(done) {
        chai.request(server)
        .get('/api/grades')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].name_grade.should.be.eql('Directeur');
            done();
        })
    });
})

// describe('GET /api/grades', function() {
//     it('Obtenir chaque camera pour chaque grade', function(done) {
//         request.get('/api/grades')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             /*Cameras autorisées par grade*/ 
//             assert(response[0].allowedcamera, 10);
//             assert(response[1].allowedcamera, 6);
//             assert(response[0].allowedcamera, 3);

//             /*Cameras non autorisées par grade*/ 
//             assert(response[0].refusedcamera, 0);
//             assert(response[1].refusedcamera, 4);
//             assert(response[0].refusedcamera, 2);

//         }), done();
//     });
// })

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
})

// describe('GET /api/grades/members', function() {
//     it('Obtenir nombre de personnes par grade', function(done) {
//         request.get('/api/grades/members')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].id_grade, 3);
//             assert(response[0].members, 9);
//         }), done();
//     });
// })

describe('GET /api/grades/members', function() {
    it('Obtenir nombre de personnes par grade', function(done) {
        chai.request(server)
        .get('/api/grades/members')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            //REGLER CE PB JSP COMMENT FAIRE
            res.body[0].id_grade.should.be.eql(3);
            res.body[0].members.should.be.eql('9');
            done();
        })
    });
})

// describe('GET /api/grades/colors', function() {
//     it('Obtenir toutes les couleurs existantes', function(done) {
//         request.get('/api/grades/members')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].id_color, 4);
//             assert(response[0].name_color, "#FFF9C4");
//         }), done();
//     });
// })
describe('GET /api/grades/colors', function() {
    it('Obtenir toutes les couleurs existantes', function(done) {
        chai.request(server)
        .get('/api/grades/colors')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].id_color.should.be.eql(5);
            res.body[0].name_color.should.be.eql('#FFCCBC');
            done();
        })
    });
})


// describe('PUT "/api/grades"', function() {
//     it('Ajouter un nouveau grade', function(done) {
//         let grade = {
//             "name" : "test",
//             "idcolor" : 4
//         }
//         request.put('/api/grades')
//         .send(grade)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].message, "ok");
//         }), done();
//     });
// })
describe('PUT /api/grades', function() {
    it('Ajouter un nouveau grade', function(done) {
        let grade = {
            "name" : "test",
            "idcolor" : 4
        }
        chai.request(server)
        .put('/api/grades')
        .send(grade)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
});

// describe('get "/api/grades"', function() {
//     it('Tester le nouveau grade ajouté', function(done) {
//         request.get('/api/grades')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[response.length -1].name_grade, "test");
//         }), done();
//     });
// })
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

// describe('GET /api/gradesInfos', function() {
//     it('Sélectionne tous les grades avec leur id associé', function(done) {
//         request.get('/api/gradeInfos')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].id_grade, 1);
//             assert(response[0].name_grade, "Directeur");
//             assert(response[2].id_grade, 3);
//             assert(response[2].name_grade, "Bénéficiaire");
//             console.log("ICI " + response)
//         }), done();
//     });
// })
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

// describe('post "/api/grades/:idGrade/acces"', function() {
//     it('Tester la nouvelle action sur le grade désiré', function(done) {
//         let action = {
//             "actions" : {
//                 1 : false
//             },
//             "notifications" : {
//                 1 : true
//             }
//         }
//         request.post('/api/grades/1/acces')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
//             assert(response[0].name_grade, "test");
//         }), done();
//     });
// })





