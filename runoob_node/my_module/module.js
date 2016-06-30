

/**
 * 模块系统
 * 模块是node应用程序的基本组成部分，文件和模块一一对应
 * 一个文件就是一个模块，这个文件可能是js，json等
 * node.js提供了exports和require两个对象
 * exports是模块公开的接口
 * require用于从外部获取一个模块的接口
 */ 

// 创建模块 （引入当前目录下的 hello.js 文件）
var Hello = require('./hello');// ./ ->当前目录
var hello = new Hello(); // 实例化Hello这个模块
hello.setName('鱼小二');
hello.sayHello();
console.log('2. 这里是module.js模块，我们启动的就是这个脚本');












