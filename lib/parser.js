
var fs = require('fs'),
    _ = require('underscore');

module.exports = exports = Parser;

function Parser(filename) {
    this.src = fs.readFileSync(filename, { encoding: 'utf8' });
}

Parser.prototype.parse = function(req) {
    var res = traversal(JSON.parse(this.src));
    return JSON.stringify(res);
};

function traversal(json) {
    for (var key in json) {
        if (key == '@type') {
            return convert(json);
        } else {
            if (_.isObject(json[key])) {
                json[key] = traversal(json[key]);
            }
        }
    }
    return json;
}

function convert(json) {
    switch (json['@type']) {
    case 'integer':
        var min = json.range.min,
            max = json.range.max;
        return (Math.random() * (max - min) + min) >> 0;
    }
}
