var mongoose = require( 'mongoose' );
var path = require('path');
var log = require(path.join(__dirname, '../app/utils/logger'))();

var databaseUri = 'mongodb://localhost:27017/msi';

mongoose.connect(databaseUri);

/* Mongoose Events */
mongoose.connection.on('connected', function () {
    log.info('Mongoose connected to ' + databaseUri);
});

mongoose.connection.on('error',function (err) {
    log.info('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    log.info('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        log.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});