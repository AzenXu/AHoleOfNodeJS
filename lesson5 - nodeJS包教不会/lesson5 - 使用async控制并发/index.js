

/*
目标
代码的入口是 app.js，当调用 node app.js 时，它会输出 CNode(https://cnodejs.org/ ) 社区首页的所有主题的标题，链接和第一条评论，以 json 的格式。
注意：与上节课不同，并发连接数需要控制在 5 个。
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
知识点
学习 async(https://github.com/caolan/async ) 的使用。这里有个详细的 async demo 演示：https://github.com/alsotang/async_demo
学习使用 async 来控制并发连接数。
*/

//  async 和 eventproxy
//  当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；
//  当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async

//  伪造一个抓网页的函数

var async = require('async');

var concurrencyCount = 0;
var fetchUrl = function(url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('当前并发数：', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay)
};

var urls = [];
for (var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function(url, callback) {
  fetchUrl(url, callback);
}, function(err, result) {
  console.log('final');
  console.log(result);
});
