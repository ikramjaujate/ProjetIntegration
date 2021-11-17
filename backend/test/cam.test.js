//const app = require("../server.js");

const assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require("supertest");

chai.use(chaiHttp);


var request = request("http://localhost:3001");

describe('GET /api/camera', function() {
    it('Verifier l état des caméras', (done) => {
      chai.request(server)
      .get('/api/camera')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[1].id_camera.should.be.eql(2);
          res.body[1].name_camera.should.be.eql("LOUNGE");
          res.body[1].id_status.should.be.eql(1);
          done();
      })
    });

})