/**
 * Created on 4/28/14.
 */
var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.bodyParser({keepExtensions:true}));

app.get('/', function(req, res){
    res.sendfile(__dirname + "/form.html");
});

app.get('/uploads', function(req, res){
    fs.readFile(__dirname + '/uploads/Ro', "binary", function(error, file) {
        if(error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(error + "\n");
            res.end();
        } else {

            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");

        }
    });
});

app.post('/', function(req, res){
    var tmp_path = req.files.uploadedfile.path;
    var serverPath = __dirname + '/uploads/' + req.body.fileName+ '.png';

    fs.rename(tmp_path, serverPath, function(error){
        if(error) {
            res.send(error);
            return;
        }
        else {
            fs.unlink(tmp_path, function() {
                if (error) throw error;
                res.send('File uploaded to: ' + serverPath + ' - ' + req.files.uploadedfile.size + ' bytes');
            });
        }
    });
    console.log(req.files);
    console.log("------");
    console.log(req.body);
});

app.listen(4040);