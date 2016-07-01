var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

fs.stat('items.json', function (err, stat, next) {
    if ((stat && stat.isFile())) {
        console.log("文件存在");
    } else {
        fs.open("items.json", "a", function (err) {
            if (err) {
                return next(err);
            }
        });
    }
});

app.use('/', require('./get-allItems'));
app.use('/', require('./get-item'));
app.use('/', require('./add-item'));
app.use('/', require("./delete-item"));
app.use('/', require("./update-item"));

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('文件不存在');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});