

// 全局对象

// 输出全局变量 __filename 的值
// __filename : 表示当前执行脚本所在的目录
console.log( __filename );

function printHello(){
 console.log('1. printHello()方法，延时处理 setTimeout()');
};
// 设置定时器
var timer = setTimeout(printHello , 2000);
// 清除定时器
//clearTimeout(timer);
//var timer1 = setInterval(printHello,1200);

// 输出当前目录
console.log('当前目录: ' + process.cwd());
// 输出当前版本
console.log('当前版本: ' + process.version);
// 输出内存使用情况
console.log(process.memoryUsage());




 



