var httpMocks = require('node-mocks-http');
var assert = require('assert');

const members = require('../routes/back-members.js')

describe('Test unitaire members', function() {
    describe('validate body function', function() {
        let request  = httpMocks.createRequest({
            body: {
              id: 3,
              name: 'toto'
            }
        });
      it('should return true if body contains all required fields', function() {
        
        assert.equal(members.validate(request.body, ['id', 'name']), true)
      });
      it('should return flase if body is missing one or more required fields', function() {
       
        assert.equal(members.validate(request.body, ['id', 'name','date']), false)
      });
    });
  });