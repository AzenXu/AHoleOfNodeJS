/*

唠唠：这一课讲异步并发

目标
建立一个 lesson4 项目，在其中编写代码。
代码的入口是 app.js，当调用 node app.js 时，它会输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式。

输出示例：
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "comment1": "呵呵呵呵"
  },
  {
    "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
    "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
    "comment1": "沙发！"
  }
]

挑战
以上文目标为基础，输出 comment1 的作者，以及他在 cnode 社区的积分值。
示例：
[
  {
    "title": "【公告】发招聘帖的同学留意一下这里",
    "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
    "comment1": "呵呵呵呵",
    "author1": "auser",
    "score1": 80
  },
  ...
]

知识点
体会 Node.js 的 callback hell 之美
学习使用 eventproxy 这一利器控制并发
*/

var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

var app = express();

app.get('/', function(req, res) {
  res.send('行！不过结果得在控制台看 = = 我还没看异步发信息的方案');
  superagent.get(cnodeUrl)
   .end(function(err, res) {
     if(err) {
       return console.log(err);
     }
    _loadUrls(_seekTopicUrls(res.text), function(topics) {
      // res.send(topics);  这里没法调res.send方法啊...提示我这个：res.send is not a function汗
      console.log(topics);
    });
   })
})

app.listen(3000, function(req, res) {
  console.log('来吧，大爷~~~~~');
})

function _seekTopicUrls(text) {
  var topicUrls = [];
  var $ = cheerio.load(text);
  $('#topic_list .topic_title').each(function (idx, element) {
    var $element = $(element);
    //  用 url.resolve 来补全完整url
    var href = url.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);
  });
  console.log(topicUrls);
  return topicUrls;
}

function _loadUrls(urls, callBack) {
  var ep = new eventproxy();
  //  所有子URL抓取完毕，加入数组，返回结果
  ep.after('topic_html', urls.length, function(topics) {
    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
    topics = topics.map(function(topicPair) {
      var topicUrl = topicPair[0];
      var topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);
      return ({
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim()
      });
    })
    callBack(topics);
  })

  //  开始并发请求子URL，抓取子URL内容
  urls.forEach(function (topicUrl) {
    superagent.get(topicUrl).end(function (err, res) {
      console.log('fetch' + topicUrl + 'successful');
      ep.emit('topic_html', [topicUrl, res.text]);
    })
  })
}
