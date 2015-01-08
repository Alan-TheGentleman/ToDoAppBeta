var express = require('express');
var server = module.exports = express();
server.globals = {};

var db = require('./config/db');
var fs = require('fs');
var http = require('http');
var path = require('path');
var log = require(path.join(__dirname, './app/utils/logger'))();
var q = require('q');

server.globals.fs = fs;
server.globals.log = log;
server.globals.path = path;
server.globals.q = q;

server.use(express.bodyParser({keepExtensions:true}));
server.set('uploadDir', __dirname + '/public/uploads/');

server.globals.fileIO = require(path.join(__dirname, './app/utils/fileIO'))(server);
require(path.join(__dirname, '/app/models'))(server);
require(path.join(__dirname, '/app/controllers'))(server);
require(path.join(__dirname, '/app/routes'))(server);

server.set('port', process.env.PORT || 4040);

server.use(express.static(__dirname + "/public"));

server.get('/', function(req, res){
    res.sendfile(__dirname + "/public/index.html");
});

http.createServer(server).listen(server.get('port'), function() {
    server.globals.log.info('Express server listening on port ' + server.get('port'));
});