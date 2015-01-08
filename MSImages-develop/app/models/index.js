module.exports = function (server) {
    "use strict";
    var fs = server.globals.fs,
        path = server.globals.path,
        log = server.globals.log;

    server.globals.models = server.globals.models || [];

    fs.readdirSync(__dirname).forEach(function (fileName) {
        if (fileName !== "index.js" && path.extname(fileName) === '.js') {
            var model = require(path.join(__dirname, fileName))(server);
            if (model && model.name) {
                log.info('Loading model: ' + model.name);
                server.globals.models[model.name] = model;
            }
        }
    });
};


