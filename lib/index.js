/**
 * Module dependencies.
 */

var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    app = require('express')(),
    server;

exports = module.exports = Utsusemi;

function Utsusemi() {
    this.targets = [];
}

Utsusemi.prototype.add = function(target) {
    var self = this;
    var lookup = function(_target) {
        fs.readdirSync(_target).forEach(function(item) {
            var stat = fs.statSync(path.join(_target, item));
            if (stat.isDirectory()) {
                lookup(path.join(_target, item));
            } else if (stat.isFile()) {
                if (~item.indexOf('.json')) {
                    self.targets.push({
                        path: path.join(_target, item),
                        uri: path.join(_target, item).substring(target.length - 1)
                    });
                }
            }
        });
    };
    lookup(target);
};

Utsusemi.prototype.size = function() {
    return this.targets.length;
};

Utsusemi.prototype.run = function() {
    var processor = function(item) {
        return function(req, res) {
            var body = fs.readFileSync(item.path, { encoding: 'utf8' });
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Content-Length', body.length);
            res.end(body);
        };
    };

    this.targets.forEach(function(item) {
        console.log(item.uri);
        app.get(item.uri, processor(item));
    });
    server = http.createServer(app).listen(3000);
};

Utsusemi.prototype.shutdown = function() {
    server.close();
};
