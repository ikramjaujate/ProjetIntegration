//const app = require("../server.js");

const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);


var request = request("http://localhost:3001");

describe('GET /api/etatCam', function() {
    // it('Verifier que la requete passe', function(done) {
    //   request.get('/api/etatCam')
    //     .expect('Content-Type', /json/)
    //     .expect(200, done);
    // });

    it('Verifier que la requete passe xx', (done) => {
      chai.request(server)
      .get('/api/etatCam')
      .end((err, res) => {
          res.should.have.status(200);
          done();
      })
    });

})