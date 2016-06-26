var express = require('express');
var router = express.Router();
var fs = require("fs");

router.post('/products', function (req, res, next) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            data = {};
            data.indexNum = 1;
            data.items = [];
        }
        else {
            data = JSON.parse(data);
        }
        addItem(data, req, res, next);
    });
});

function addItem(itemsData, req, res, next) {
    var item = {
        "id": itemsData.indexNum,
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    };
    if ((typeof item.barcode) === 'string' && (typeof item.name) === "string" && (typeof item.unit) === "string" && (typeof item.price) === "number") {
        itemsData.items.push(item);
        itemsData.indexNum++;
        fs.writeFile(fileName, JSON.stringify(itemsData), function (err) {
            if (err) {
                return next(err);
            }
        });
        res.status(201).json(item);
    }
    else {
        res.sendStatus(404);
    }
}

module.exports = router;