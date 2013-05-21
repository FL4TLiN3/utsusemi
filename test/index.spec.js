
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

    describe('#init', function() {

        it('init', function(done){
            done();
        });

    });

    after(function(done) {
        utsusemi.shutdown();
        done();
    });
});
