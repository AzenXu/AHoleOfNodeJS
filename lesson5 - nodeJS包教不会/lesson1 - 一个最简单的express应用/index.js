'use-strict'

var express = require('express');
//  express的实例，封装了多种网络方法 get、post等都有
var app = express();

//  req - 从浏览器请求过来的信息
//  res - 直接用法send东西
//  如果请求的url-path 是/的话，就调这个回调
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/test', function (req, res) {
  res.send('额，行啊小伙，这都能请求到！可以。')
});

//  占据电脑的3000号端口，一旦3000有消息，就调起本app（执行上面那段）
app.listen(3000, function() {
  console.log('app is listening at port 3000');
});

// http://localhost:3000/
//  本机已经配好了localhost,azen.com会指到127.0.0.1
/*
  端口：区分同一个电脑内不同的进程，从而实现一条网线同时链接多个程序
  app.listen(3000),则进程被打标，一旦电脑接收到3000端口的网络信息，就会发送给我们的进程
*/
/*
  URL - <scheme>://<user>:<password>@<host>:<port>/<url-path>
  上面的url: scheme - http
            host - localhost
            port - 3000
            url-path - /
*/
