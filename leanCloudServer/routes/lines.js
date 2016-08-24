'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');

var baseUrl = 'http://www.bjbus.com/home/ajax_search_bus_stop_token.php';
function get(params, ck) {
  return superagent.get(baseUrl + params)
    .withCredentials()
    // .send(data)
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Cookie', ck||'')
}

//  Hm_lvt_2c630339360dacc1fc1fd8110f283748=1471445682,1471529338,1471615890,1471676488;
//  Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471687006;
router.get('/', function (req, res, next) {
  const ck = req.headers.ck;
  const params = url.parse(req.url).search;
  const type = req.query.act;
  const list = [];
  get(params, ck)
      .end(function (err, sres) {
        var $ = cheerio.load(sres.text);
        //查询公交上下行
        if (type == 'getLineDirOption') {
          $('option').each(function (idx, element) {
            var el = $(element);
            if (el.attr('value')) {
              list.push({
                id: el.attr('value'),
                name: el.text()
              })
            }
          })
        }
        if (type == 'getDirStationOption') {
          $('option').each(function (idx, element) {
            var el = $(element);
            if (el.attr('value')) {
              list.push({
                id: el.attr('value'),
                name: el.text()
              })
            }
          })
        }
        if (type == 'busTime') {
          const html = JSON.parse(sres.text).html;
          $ = cheerio.load(html);
          const lists = $('.inquiry_main .fixed li');
          const items = [];
          lists.each(function (i, element) {
            const id = $(this).find('.sicon').parent().attr('id');
            const item = $(this).find(`#${id}`);
            const metre = item.parent().prev().find(`#${id}m`);
            console.log('id', id);
            if (id) { // 确定 items 的条数
              items.push({
                id: id,
                name: item.find('span').attr('title'),
                active: item.find('span').attr('style') ? 'active' : '',
                isDZ: item.find('.buss').attr('clstag') == -1 ? true : false,
                metre: metre.find('.busc').attr('clstag')
              });
            }
          });
          const dataBus = {
            road: $('.inquiry_header #lh').text()
            , roadName: $('.inner #lm').text()
            , roadMsg: $('.inner article').text()
            , list: items
          };
          return res.send(JSON.stringify(dataBus));
        }
        res.send(list);
      })
});

module.exports = router;
