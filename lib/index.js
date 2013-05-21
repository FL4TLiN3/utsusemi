
var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    colors = require('colors'),
    util = require('./util'),
    Controller = require('./controller'),
    server;

var DEFAULT_PORT = 3000;
var DEFAULT_HOSTNAME = 'localhost';

exports = module.exports = Utsusemi;

function Utsusemi(_options) {
    var options = _options || {};
    this.targets = [];
    this.app = require('express')();
    this.port = options.port || DEFAULT_PORT;
    this.hostname = options.hostname || DEFAULT_HOSTNAME;
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
                    var _path = path.join(_target, item);
                    self.targets.push({
                        path: _path,
                        uri: _path.substring(target.length - 1, _path.length - '.json'.length)
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

Utsusemi.prototype.run = function(callback) {
    var self = this;
    this.targets.forEach(function(target) {
        util.info('%s', target.uri);
        target.controller = new Controller(self.app);
        target.controller.assign(target.uri, target.path);
    });
    server = http.createServer(this.app).listen(this.port, this.hostname, function() {
        util.info('Utsusemi start listening on '.blue + 'http://%s:%d'.red, self.hostname, self.port);
        if (callback) callback();
    });
};

Utsusemi.prototype.shutdown = function() {
    server.close();
};
