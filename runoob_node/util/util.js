

/**
 * node.js 的原生模块：
 * http，fs，path，zlib，url,util
 */

// 重点使用 util.inherits(SonClass,FooClass)，实现继承
var util = require('util');
function Base(){ // 父类
  this.name = '王小虎';
  this.base = 1991;
  this.sayHello = function(){
    console.log('Hello ' + this.name);
  };
};
Base.prototype.showName = function(){
  console.log('showName: ' + this.name);
};
function Sub(){ // 子类
  this.name = '张小帅';
};

util.inherits(Sub,Base); // 实现对象间原型继承

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase); // 打印当前对象

console.log('======================');

var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);










