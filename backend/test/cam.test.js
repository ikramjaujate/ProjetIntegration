var request = require("supertest");
const app = require("../server.js");




var request = request("http://localhost:3001");

describe('GET /api/etatCam', function() {
    it('Verifier que la requete passe', function(done) {
      request.get('/api/etatCam')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  })