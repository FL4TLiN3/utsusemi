
var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    Controller = require('./controller'),
    server;

var DEFAULT_PORT = 3000;

exports = module.exports = Utsusemi;

function Utsusemi(_options) {
    var options = _options || {};
    this.targets = [];
    this.app = require('express')();
    this.port = options.port || DEFAULT_PORT;
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
    var self = this;
    this.targets.forEach(function(target) {
        console.log('[INFO] %s', target.uri);
        target.controller = new Controller(self.app);
        target.controller.assign(target.uri, target.path);
    });
    server = http.createServer(this.app).listen(this.port);
    console.log('[INFO] server start listening on port %d.', this.port);
};

Utsusemi.prototype.shutdown = function() {
    server.close();
};
