module.exports = function(){
    "use-strict";
    var winston = require('winston');

    var logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true
            })
        ]
    });

    return logger;
};
