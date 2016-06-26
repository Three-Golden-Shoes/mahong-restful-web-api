var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/products', function (req, res, next) {
    fs.readFile("items.json", 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            data = {};
            data.items = [];
            res.status(200).json(data.items);
            return;
        }
        else {
            data = JSON.parse(data);
            res.status(200).json(data.items);
        }
    });
});

module.exports = router;