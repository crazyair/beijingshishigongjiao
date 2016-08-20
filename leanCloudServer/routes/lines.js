'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Line = AV.Object.extend('Line');

// 查询 Todo 列表
router.get('/', function (req, res, next) {
  var query = new AV.Query(Line);
  query.descending('createdAt');
  query.find().then(function (results) {
    res.render('lines', {
      title: 'TODO 列表22222',
      lines: results
    });
  }, function (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.render('lines', {
        title: 'TODO 列表111',
        lines: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});








// 新增 Todo 项目
router.post('/', function (req, res, next) {
  var content = req.body.content;
  var line = new Line();
  line.set('content', content);
  line.save().then(function (todo) {
    res.redirect('/lines'); 1
  }).catch(next);
});

module.exports = router;
