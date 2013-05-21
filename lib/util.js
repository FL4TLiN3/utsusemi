
exports.silent = false;
exports.info = function(format) {
    if (exports.silent) return;

    var args = [].slice.apply(arguments),
        format;
    if (!args || args.length == 0) return;
    if (args.length > 0) format = args[0];
    if (args.length > 1) args = args.splice(1);
    args.unshift('[INFO] ' + format);
    console.log.apply(this, args);
}
