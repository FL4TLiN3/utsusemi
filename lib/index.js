
var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    app = require('express')(),
    Controller = require('./controller'),
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
    this.targets.forEach(function(target) {
        console.log(target.uri);
        target.controller = new Controller(app);
        target.controller.assign(target.uri, target.path);
    });
    server = http.createServer(app).listen(3000);
};

Utsusemi.prototype.shutdown = function() {
    server.close();
};
