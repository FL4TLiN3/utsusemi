
var colors = require('colors');

exports.silent = false;
exports.info = function(format) {
    if (exports.silent) return;

    var now = exports.now(),
        args = [].slice.apply(arguments);
    if (!args || args.length == 0) return;
    args[0] = (now.green + ' [INFO] '.green + args[0]);
    console.log.apply(this, args);
};

exports.now = function() {
    var now = new Date();
    return '' +
           ('0000' + now.getFullYear()).slice(-4)  + '/' +
           ('00' + now.getMonth()).slice(-2) + '/' +
           ('00' + now.getDay()).slice(-2) + ' ' +
           ('00' + now.getHours()).slice(-2) + ':' +
           ('00' + now.getMinutes()).slice(-2) + ':' +
           ('00' + now.getSeconds()).slice(-2) + '.' +
           ('000' + now.getMilliseconds()).slice(-3);
};
