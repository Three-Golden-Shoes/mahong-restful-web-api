var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/products/:id', function (req, res, next) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            res.sendStatus(404);
            return;
        }
        else {
            getItem(data, req, res);
        }
    });
});

function getItem(data, req, res) {
    var itemsData = JSON.parse(data);
    for (var i = 0; i < itemsData.items.length; i++) {
        if (itemsData.items[i].id === parseInt(req.params.id)) {
            res.status(200).json(itemsData.items[i]);
            return;
        }
    }
    res.sendStatus(404);
}

module.exports = router;
