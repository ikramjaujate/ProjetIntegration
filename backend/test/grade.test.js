var assert = require('assert');
var request = require('supertest')

var request = request("http://localhost:3001")

describe('GET /api/grades/:idGrade/cameras', function() {
    it('Voir si requete passe ', function(done) {
      request.get('/api/grades/1/cameras')
        .expect('Content-Type', /json/)
        .expect(200), done();
    });
  })

/*describe('GET /api/grades/:idGrade/cameras', function() {
it('Voir toutes les informations concernant les cameras pour un grade', function(done) {
    request.get('/api/grades/1/cameras')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
        assert(response.status, 200);
        
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
})*/