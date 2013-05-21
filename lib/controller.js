
var Parser = require('./parser'),
    colors = require('colors'),
    util = require('./util');

module.exports = exports = Controller;

function Controller(app) {
    this.app = app;
}

Controller.prototype.assign = function(uri, filename) {
    var parser = new Parser(filename),
        regexp = new RegExp('^' + uri);
    this.app.get(regexp, function(req, res) {
        util.info('GET %s'.blue, req.url);
        var body = parser.parse(req);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    });
};

