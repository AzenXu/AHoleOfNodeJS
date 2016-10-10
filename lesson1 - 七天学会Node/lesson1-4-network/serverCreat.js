var http = require('http');

http.createServer(function (request, response) {
  var body = [];
  _analysisRequest(request, body)
  _writeResponseNormal(response, body)
  // _analysisRequestAndWriteResponseStreaming(request)
}).listen(8124);

function _analysisRequest(request, body) {
  console.log(request.method);
  console.log(request.headers);

  request.on('data', function (chunk) {
    body.push(chunk);
  });

  request.on('end', function() {
    body = Buffer.concat(body); //  用于连接两个或多个数组
    console.log(body.toString());
  })
}

function _writeResponseNormal(response, body) {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello World!\n');
}

function _analysisRequestAndWriteResponseStreaming(request) {
  console.log(request.method);
  console.log(request.headers);

  request.on('data', function (chunk) {
    response.write(chunk);
  });

  request.on('end', function() {
    response.end(); //  这句报错了..说我的response not define... WTF
  })
}
