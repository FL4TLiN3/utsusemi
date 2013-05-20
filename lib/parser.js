
var fs = require('fs');

module.exports = exports = Parser;

function Parser(filename) {
    this.src = fs.readFileSync(filename, { encoding: 'utf8' });
}

Parser.prototype.parse = function() {
    return this.src;
};
