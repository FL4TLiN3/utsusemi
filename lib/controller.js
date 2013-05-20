
var Parser = require('./parser');

module.exports = exports = Controller;

function Controller(app) {
    this.app = app;
}

Controller.prototype.assign = function(uri, filename) {
    var parser = new Parser(filename);
    this.app.get(uri, function(req, res) {
        var body = parser.parse(req);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    });
};

