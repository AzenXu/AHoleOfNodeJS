/*
目标
当在浏览器中访问 http://localhost:3000/?q=alsotang 时，输出 alsotang 的 md5 值，即 bdd5e57b5c0040f9dc23d430846e68a3。

挑战
访问 http://localhost:3000/?q=alsotang 时，输出 alsotang 的 sha1 值，即 e3c766d71667567e18f77869c65cd62f6a1b9ab9。

知识点
学习 req.query 的用法
学习建立 package.json 来管理 Node.js 项目。
*/

'use-strict'
var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
  //  1. 取出?后面的q参数
  var q = req.query.q;
  //  2. 调用utility.md5方法，获得 md5
  var md5value = utility.md5(q);
  var sha1Value = utility.sha1(q);
  //  3.  返回
  // res.send(md5value)
  console.log(q);
  console.log(md5value);
  console.log(sha1Value);
  // res.send('嗯！');
  res.send("md5" + md5value + "\n" + "sha1" + sha1Value);
});

app.listen(3000, function(req, res) {
  console.log('不错不错，在监听了！');
})
