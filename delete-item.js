var express = require('express');
var router = express.Router();
var fs = require("fs");

router.delete('/products/:id', function (req, res, next) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            res.sendStatus(404);
        }
        else {
            deleteItem(data, req, res, next);
        }
    });
});

function deleteItem(data, req, res, next) {
    var itemsData = JSON.parse(data);
    for (var i = 0; i < itemsData.items.length; i++) {
        if (itemsData.items[i].id === parseInt(req.params.id)) {
            itemsData.items.splice(i, 1);
            fs.writeFile(fileName, JSON.stringify(itemsData), function (err) {
                if (err) {
                    return next(err);
                }
            });
            res.status(204).json();
            return;
        }
    }
    res.sendStatus(404);
}

module.exports = router;