var http = require('http');

var options = {
  hostname: '127.0.0.1',
  port: 8124,
  method: 'POST',
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
}

var request = http.request(options, function (response) {
  console.log(response.headers);
  console.log(response.body);
});

request.write('Hello, Server~~~ 么么哒');  //  写入请求体数据
request.end();
