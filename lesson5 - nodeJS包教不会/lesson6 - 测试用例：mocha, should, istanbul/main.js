//  JS也可以把函数当变量。。。不过也正常，类型弱成这样的语言出啥幺蛾子都不奇怪= =

//  先做基本功能，然后测试驱动开发抠细节
//  注意注意：mocha要在main的这个目录里调用，而不是在main.test.js这个目录中！
var fibonacci = function(n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0');
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n-1) + fibonacci(n-2);
}

if (require.main === module) {
  //  如果是直接执行main.js，则进入此处
  //  如果main.js被其他文件require，则此处不会执行
  var n = Number(process.argv[2]);  //  取出通过命令行传入的参数并转为number类型
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;
