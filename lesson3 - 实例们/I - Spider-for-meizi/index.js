/*
知识点：
1. 使用request库请求网络
2. 使用cheerio拿到特定节点中的内容
3. 使用request库的head方法下载图片
4. request().pipe方法将图片写到本地

关键点：
1. 一开始木有配User-Agent，导致请求返回503 - 配置User-Agent即可
2. cheerio这个库 和 request这个库
3. 需要判断下有木有images这个文件夹，如果木有，再创建。 node.JS的fileSystem系统
*/


var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var startPage = 2162

// downloadWithPageNumber(startPage)

for (var i = startPage; i > startPage - 100; i--) {
  // if (i != startPage) {
  //   sleep(5000)
  //   console.log('睡醒了');
  // }
  downloadWithPageNumber(i);
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function downloadWithPageNumber(number) {
  console.log('下载第' + number + '页');
  var options = {
    url: 'http://jandan.net/ooxx/page-' + number,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    // console.log(error);
    // console.log(response);
    // console.log(body);
    console.log(options.url);
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      // console.log(body);
      _acquireData(body);
    }
  })
}

function _acquireData(data) {
  var $ = cheerio.load(data);
  var meizi = $('.text img').toArray(); //  拿所有class = text模块下的img标签的内容，放入数组中
  console.log(meizi.length);
  var len = meizi.length;
  for (var i = 0; i < len; i++) {
    var imgsrc = meizi[i].attribs.src //  获取src属性中的内容 - attribs这个也是返回来的网页字段
    console.log(imgsrc);

    var filename = _parseUrlForFileName(imgsrc);
    console.log(filename);
    _downloadImg(imgsrc, filename, function(){
      console.log(filename + ' done');
    })
  }
}
/*  还可以用.each函数替换for循环
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.img img').each(function() {
            var src = $(this).attr('src');
            console.log('正在下载' + src);
            download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
            console.log('下载完成');
        });
    }
});
*/
function _parseUrlForFileName(address) {
  var filename = path.basename(address);  //  根据url取出图片文件名
  return filename;
}

function _downloadImg(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    if (err) {
      console.log('err: '+ err);
      return false;
    }
    console.log('res: '+ res);
    console.log('uri: '+ uri);
    if (!fs.existsSync('./images')) {
      // We use fs.mkdirSync to create the folder
      fs.mkdirSync('./images');
    }
    request(uri).pipe(fs.createWriteStream('images/'+filename))  //  将下载流和文件写入流打通
  });
};
