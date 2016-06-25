var express = require('express');
var router = express.Router();
var fs = require("fs");

router.put('/products/:id', function (req,res,next) {
    var item = {
        "id": parseInt(req.params.id),
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    };
    fs.readFile("items.json", 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data=== '') {
            res.sendStatus(404);
        }
        else {
            updataItem(data,item,req,res,next);
        }
    });
});

function updataItem(data,item,req,res,next) {
    var itemsData = JSON.parse(data);
    if ((typeof item.barcode) === 'string' && (typeof item.name) === "string" && (typeof item.unit) === "string" && (typeof item.price) === "number") {
        for (var i = 0; i < itemsData.items.length; i++) {
            if (itemsData.items[i].id === parseInt(req.params.id)) {
                itemsData.items[i] = item;
                fs.writeFile('items.json', JSON.stringify(itemsData), function (err) {
                    if (err) {
                        return next(err);
                    }
                });
                res.status(200).json(item);
                return;
            }
        }
        res.sendStatus(404);
    }
    else {
        res.sendStatus(404);
    }
}

module.exports = router;