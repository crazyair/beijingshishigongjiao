'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');

router.get('/', function (req, res, next) {
    superagent.get('http://www.bjbus.com/home/index.php')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var ck = sres.header['set-cookie'];
            ck = ck.join('').replace('path=/', '').replace('Path=/', '');

            var $ = cheerio.load(sres.text);
            var items = [];
            $('#selBLine a').each(function (idx, element) {
                items.push({
                    id: idx + 1,
                    name: $(element).text(),
                });
            });
            res.send({
                ck: ck,
                line: items
            });
        });
});


module.exports = router;
