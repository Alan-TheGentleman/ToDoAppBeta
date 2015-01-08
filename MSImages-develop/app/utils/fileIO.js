module.exports = function (server) {
    "use strict";

    var fs = server.globals.fs,
        log = server.globals.log,
        path = require('path'),
        uploadDir = server.get('uploadDir');

    var Handler = {
        name: "FileIO"
    };

    var getExtension = function(filename) {
        var ext = path.extname(filename||'').split('.');
        return ext[ext.length - 1];
    };

    Handler.saveFile = function(file, name, callback) {
        var tmp_path = file.path;
        var serverPath = uploadDir + name + '.' + getExtension(file.name);

        fs.rename(tmp_path, serverPath, function(error){
            if(error) {
                callback(error);
                return;
            }
            else callback(error, serverPath);
        });
    };

    Handler.deleteFile = function(serverPath, callback){
        fs.unlink(serverPath, function (error) {
            if (error) throw error;
            else {
                log.info('Successfully deleted '+ serverPath);
                callback(error);
            }
        });
    };

    return Handler;
};
