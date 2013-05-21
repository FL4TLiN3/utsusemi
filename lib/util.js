
var colors = require('colors');

exports.silent = false;
exports.info = function(format) {
    if (exports.silent) return;

    var now = exports.now(),
        args = [].slice.apply(arguments),
        format;
    if (!args || args.length == 0) return;
    if (args.length > 0) format = args[0];
    if (args.length > 1) args = args.splice(1);
    args.unshift(now.green + ' [INFO] '.green + format);
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
