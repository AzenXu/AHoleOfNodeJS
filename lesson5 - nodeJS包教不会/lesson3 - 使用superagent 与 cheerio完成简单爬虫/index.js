/*
目标 - 熟悉Node.js的异步特性
当在浏览器中访问 http://localhost:3000/ 时，输出 CNode(https://cnodejs.org/ ) 社区首页的所有帖子标题和链接，以 json 的形式。
输出示例：
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f"
  }
]

挑战
访问 http://localhost:3000/ 时，输出包括主题的作者，
示例：
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "author": "alsotang"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
    "author": "otheruser"
  }
]

知识点
学习使用 superagent 抓取网页
学习使用 cheerio 分析网页
*/


//  superagent - http的库，发get和post的请求的
//  cheerio - Node.js版的jquery，从网页中以css selector取数据的
//  express - 做web服务的框架

var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next) {
  // res.send('哈哈');
  superagent.get('https://cnodejs.org/').end(function(err, sres) {
    if(err) {
      return next(err);
    }
    //  sres.text里存着html，把它传给cheerio.load，获得jquery接口变量，将其命名为$
    var $ = cheerio.load(sres.text);
    // console.log(sres.text);
    // console.log($);
    var items = [];
    var resultItems = [];
    $('#topic_list .topic_title').each(function(idx, element) {
      // console.log(element);
      var $element = $(element);
      // console.log($element); - 转好的element对象

      //  组一个字典，push到目标数组中
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href'),
      });
    });

    //  进阶挑战 - 找作者并更新
    $('#topic_list .user_avatar img').each(function(idx, element) {
      var $element = $(element);
      // console.log($element);
      var oldElement = items[idx]
      resultItems.push({
        title: oldElement.title,
        href: oldElement.href,
        author: $element.attr('title')
      })
    })

    //  响应
    res.send(resultItems);
  })
})

app.listen(3000, function(req, res) {
  console.log('来吧大爷~~~');
})
