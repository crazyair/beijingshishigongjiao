const Server = require('./server.js');
const port = (process.env.PORT || 8081);
const app = Server.app();

const cheerio = require('cheerio');
const superagent = require('superagent');

var ck = '';

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, tokenId');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("X-Powered-By", 'PHP/5.2.5');
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.header("Content-Type", "text/html");
    res.header("Pragma", "no-cache");
    // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    // res.header("Expires", 0);

    // res.header("Set-Cookie", 'SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471397374|1471397213;Path=/')
    next();
});

app.get('/api', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each(function (idx, element) {
                var $element = $(element).find('.topic_title');
                var $element2 = $(element).find('.last_active_time');
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    text: $element2.text()
                });
            });
            res.send(items);
        });
});

app.get('/get', function (req, res, next) {
    getCk(req, res, next);
});
function getCk(req, res, next) {
    superagent.get('http://www.bjbus.com/home/index.php')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            console.log(111, sres.header['set-cookie']);
            ck = sres.header['set-cookie'];
            ck = ck.join('').replace('path=/', '').replace('Path=/', '');
            res.send(sres.header);
        });
}
app.get('/bj', function (req, res, next) {
    // console.log(req);
    // console.log(req.query);
    superagent.get('http://www.bjbus.com/home/ajax_search_bus_stop_token.php?act=busTime&selBLine=1&selBDir=5276138694316562750&selBStop=1')
        .withCredentials()
        .set('X-Requested-With', 'XMLHttpRequest')
        // .set('Cookie', 'PHPSESSID=4a1b39ebfed819523e27ee4f728dfdaf; SERVERID=ebcde74858922aec8aaf8fb40aed60362;')
        // .set('Cookie', ck)
        .set('Cookie', 'PHPSESSID=056407d382622455fe967c07d973efa7;SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471708800|1471536000;Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471405742;Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470987371,1471397218')
        .set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            // console.log(111,JSON.parse(sres.text).html)
            // console.log(sres.text);
            if (sres.text == 'timeout') {
                return res.send(sres);
            }
            // var d=Object.parse(sres);
            const html = JSON.parse(sres.text).html;
            const $ = cheerio.load(html);
            // console.log($('.inquiry_header #lh').text())
            const data = {
                numRoad: $('.inquiry_header #lh').text()
                , numRoadDec: $('.inner #lm').text()
                , numRoadDec2: $('.inner article').text()
            }

            // res.send(html);
            res.send(JSON.stringify(data));
        });
});
app.get('/test', function (req, res, next) {
    // seq:12
    // w 572
    const $ = cheerio.load('<div class="inquiry_header"><div class="left fixed"><h3 id="lh">2路</h3></div><div class="inner"><h2 id="lm">海户屯-宽街路口南</h2><article><p>宽街路口南&nbsp;5:00-23:00&nbsp;分段计价&nbsp;所属电车分公司</p><p>最近一辆车距离此还有&nbsp;0&nbsp;站，&nbsp;<span>649</span>&nbsp;米，预计到站时间&nbsp;<span>2</span>&nbsp;分钟</p></article></div></div><div id="cc_stop" class="inquiry_main" unselectable="on" onselectstart="return false;"><ul class="fixed"><li><div id="1"><i></i><p class="sicon"></p><span title="海户屯">海户屯</span></div></li><li><div id="2m"><i ></i></div></li><li><div id="2"><i class="buss" clstag="-1"></i><p class="sicon"></p><span title="木樨园桥北">木樨园桥北</span></div></li><li><div id="3m"><i ></i></div></li><li><div id="3"><i></i><p class="sicon"></p><span title="沙子口">沙子口</span></div></li><li><div id="4m"><i ></i></div></li><li><div id="4"><i></i><p class="sicon"></p><span title="永定门内">永定门内</span></div></li><li><div id="5m"><i ></i></div></li><li><div id="5"><i></i><p class="sicon"></p><span title="天坛西门">天坛西门</span></div></li><li><div id="6m"><i  class="busc" clstag="5887"></i></div></li><li><div id="6"><i></i><p class="sicon"></p><span title="大栅栏">大栅栏</span></div></li><li><div id="7m"><i ></i></div></li><li><div id="7"><i></i><p class="sicon"></p><span title="天安门广场东">天安门广场东</span></div></li><li><div id="8m"><i ></i></div></li><li><div id="8"><i></i><p class="sicon"></p><span title="天安门东">天安门东</span></div></li><li><div id="9m"><i  class="busc" clstag="3826"></i></div></li><li><div id="9"><i></i><p class="sicon"></p><span title="东华门">东华门</span></div></li><li><div id="10m"><i ></i></div></li><li><div id="10"><i></i><p class="sicon"></p><span title="北京妇产医院">北京妇产医院</span></div></li><li><div id="11m"><i ></i></div></li><li><div id="11"><i></i><p class="sicon"></p><span title="沙滩路口南">沙滩路口南</span></div></li><li><div id="12m"><i  class="busc" clstag="649"></i></div></li><li><div id="12"><i></i><p class="sicon"></p><span title="宽街路口南" style="font-size: 16px;font-weight:700;">宽街路口南</span></div></li></ul></div><div class="inquiry_footer"><section><div class="inner"><span class="buss">途中车辆</span><span class="busc">到站车辆</span></div></section></div>');

    const list = $('.inquiry_main .fixed li');
    const items = [];
    list.each(function (i, element) {
        const id = $(this).find('.sicon').parent().attr('id');
        const item = $(this).find(`#${id}`);
        const metre = item.parent().prev().find(`#${id}m`);

        if (id) { // 确定 items 的条数 
            items.push({
                id: id,
                name: item.find('span').attr('title'),
                active: item.find('span').attr('style') ? 'active' : '',
                isDZ: item.find('.buss').attr('clstag') == -1 ? true : false,
                metre: metre.find('.busc').attr('clstag')
            });
        }
    })


    const data = {
        numRoad: $('.inquiry_header #lh').text()
        , numRoadDec: $('.inner #lm').text()
        , numRoadDec2: $('.inner article').text()
        , numRoadList: items
    }
    res.send(JSON.stringify(data));
})
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
