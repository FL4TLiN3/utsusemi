
var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    colors = require('colors'),
    util = require('./util'),
    Controller = require('./controller'),
    server;

var DEFAULT_PORT = 3000;

exports = module.exports = Utsusemi;

function Utsusemi(_options) {
    var options = _options || {};
    this.targets = [];
    this.app = require('express')();
    this.port = options.port || DEFAULT_PORT;
    util.silent = options.silent || false;
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
        util.info('%s', target.uri);
        target.controller = new Controller(self.app);
        target.controller.assign(target.uri, target.path);
    });
    server = http.createServer(this.app).listen(this.port);
    util.info('server start listening on port %d.'.blue, this.port);
};

Utsusemi.prototype.shutdown = function() {
    server.close();
};
