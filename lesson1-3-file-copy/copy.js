var fs = require('fs');

function copy(src, dst){
  // readFileSync -> 读取文件
  //  writeFileSync -> 写文件
  fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
  copy(argv[0], argv[1]);
}

//  process -> 一个全局变量，通过process.argv获取命令行参数
//  argv参数，0 == NodeJS执行程序绝对路径，1 == 主模块绝对路径
//  slice(2) -> 切片，取2以后的参数
main(process.argv.slice(2));
