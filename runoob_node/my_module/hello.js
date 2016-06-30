

// 这里是 hello.js 模块

// exports.worldFn = function(){
//    console.log('这里是hello.js模块，通过exports对外暴露了worldFn方法');
// };

// hello.js
function Hello(){
  var name;
  this.setName = function(thyName){
     name = thyName;
  };
  this.sayHello = function(){
     console.log('1.1 你好：' + name);
  };
};

console.log('1.2 这里是hello.js模块');
// 讲Hello这个模块暴露给外部调用
module.exports = Hello; 













