
var fs = require('fs'),
    _ = require('underscore');

var PATTERN = {
    'alphanumeric': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    'alphabetic':   'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'numeric':      '1234567890'
}

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
        return convertInteger(json);
    case 'string':
        return convertString(json);
    }
}

function convertInteger(json) {
    var min = json.range.min >> 0,
        max = json.range.max >> 0;
    return (Math.random() * (max - min) + min) >> 0;
}

function convertString(json) {
    var pattern = PATTERN[json.pattern],
        min = json.range.min >> 0,
        max = json.range.max >> 0,
        size = (Math.random() * (max - min) + min) >> 0,
        buffer = '';
    for (var i = 0; i < size; i++) {
        buffer += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    return buffer;
}
