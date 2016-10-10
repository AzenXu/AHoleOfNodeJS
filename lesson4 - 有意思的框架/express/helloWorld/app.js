var express = require('express');
var app = express();

//  作用？
app.get('/', function (req, res) {
  res.send('hello world!');
})

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', hose, port);
});
