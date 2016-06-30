
/**
 *  EventEmitter 类
 *  events模块只提供了一个对象：events.EventEmitter
 *  EventEmitter对象的核心就是：
 *  事件触发与事件监听器功能的封装
 */

/**
 * EventEmitter 对象如果在实例化时发生错误，会执行'error'事件
 * 当添加新的监听器时，'newListener'事件会触发
 * 当监听器被移除时，'removeListener' 事件会被触发
 */

// 引入 events 模块
var events = require('events'); 
// 创建 EventEmitter 对象
var event = new events.EventEmitter();

// 绑定 some_event 事件
event.on('some_event' , function(){
  console.log('1.1 延迟2.5s -> some_event事件触发');
});
setTimeout(function(){
  // 触发 some_event 事件
  event.emit('some_event');
},2500);

console.log('=============');

/**
 * EventEmitter 对象的每个事件由一个事件名和若干个数组组成
 * 事件名是一个有一定语义的字符串，
 * EventEmitter 支持若干个事件监听器
 */
event.on('someEvent1' , function(arg1,arg2){
  console.log('2.1 liste1',arg1,arg2);
});
event.on('someEvent1',function(arg1,arg2){
  console.log('2.2 liste2',arg1,arg2);
});
event.emit('someEvent1','参数arg1','参数arg2');

console.log('=============');

// 通过 connection(连接)事件，演示 EventEmitter 类的应用
// 监听器 #1
var listener1 = function listener1(){
  console.log('3.1 监听器listener1 执行');
};
// 监听器 #2
var listener2 = function listener2(){
  console.log('3.2 监听器listener2 执行');
};
// 绑定 connection 事件，处理函数为 listener1
event.addListener('connection',listener1);
// 绑定 connection 事件，处理函数为 listener2
event.on('connection',listener2);
var eventListenersCount = require('events').EventEmitter.listenerCount(event,'connection');
console.log(eventListenersCount + '个监听器监听连接事件.A');

// 处理 connection 事件
event.emit('connection');
// 移除监绑定的 listener1 函数
event.removeListener('connection',listener1);
console.log('listener1 不再受监听！');
// 触发连接事件
event.emit('connection');
// event.emit('error');

eventListenersCount = require('events').EventEmitter.listenerCount(event,'connection');
console.log(eventListenersCount + " 个监听器监听连接事件.B");
console.log('3.3 程序执行完毕');

console.log('=============');



