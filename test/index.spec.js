
var path = require('path'),
    request = require('supertest'),
    chai = require('chai');

var Utsusemi = require('..'),
    utsusemi = new Utsusemi({
        port: 3002
    });

describe('Utsusemi', function() {
    before(function(done) {
        utsusemi.add(path.join(__dirname, '../support/'));
        utsusemi.run();
        done();
    });

    describe('#/status', function() {

        it('/john.json', function(done){
            request(utsusemi.app)
            .get('/statuses/john.json')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

    });

    after(function(done) {
        utsusemi.shutdown();
        done();
    });
});
