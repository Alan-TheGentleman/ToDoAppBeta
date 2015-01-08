module.exports = function (server) {
    "use strict";
    var fs = server.globals.fs,
        path = server.globals.path,
        log = server.globals.log;

    server.globals.controllers = server.globals.controllers || [];

    fs.readdirSync(__dirname).forEach(function (fileName) {
        if (fileName !== "index.js" && path.extname(fileName) === '.js') {
            var controller = require(path.join(__dirname, fileName))(server);
            if (controller && controller.name) {
                log.info('Loading Business controller: ' + controller.name);
                server.globals.controllers[controller.name] = controller;
            }
        }
    });
};

