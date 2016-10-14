//  1. 装一个全局的测试框架mocha: $ npm install mocha -g

var main = require('../main');
var should = require('should'); //  断言库 - should在js的Object基类上，注入了#should属性，这个属性中，又有许多测试相关的属性（方法）可以调用。
                                //  如 (5).should.above(3);  https://github.com/tj/should.js

/*  测试驱动开发 - 传说中的『红-绿-重构』
1. 先把要达到的目的都描述清楚
2. 让现有的程序跑不过case
3. 再修补程序，让case过
4. 重构


describe -> 描述待测主体是什么
it -> 描述case的内容
*/
describe('test/main.test.js', function() {
  it('should equal 0 when n === 0', function() {
    main.fibonacci(0).should.equal(0);
  });

  it('should equal 1 when n === 1', function() {
    main.fibonacci(1).should.equal(1);
  });

  it('should equal 55 when n === 10', function() {
    main.fibonacci(10).should.equal(55);
  });

  it('should throw when n > 10', function() {
    (function() {
      main.fibonacci(11);
    }).should.throw('n should <= 10');
  });

  it('should throw when n < 0', function() {
    (function() {
      main.fibonacci(-1);
    }).should.throw('n should >= 0');
  });

  it('should throw when n isnt Number', function() {
    (function() {
      main.fibonacci('呵呵');
    }).should.throw('n should be a Number');
  });
});
