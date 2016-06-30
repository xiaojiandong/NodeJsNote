
// 事件驱动程序
// 非阻塞式IO或者事件驱动IO
// 
// 引入 events 模块
var events = require('events'); 
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var connectHandler = function connected(){
   console.log('1. 链接成功 - connectHandler');
   // 触发 data_received 事件
   eventEmitter.emit('data_received');
};
// 绑定 connection 事件处理程序
eventEmitter.on('connection' , connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received' , function(){
   console.log('2. 匿名函数绑定data_received事件，数据接收成功');
});
// 触发 connection 事件
eventEmitter.emit('connection');
console.log('3. main1.js程序执行完毕');
 



