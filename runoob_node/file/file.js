
/**
 * node.js 文件系统(fs模块)中的方法有异步和同步
 */

var fs = require('fs');
// 异步读取
fs.readFile('input.txt' , function(err,data){
  if(err){
  	return console.error(err);
  }
  console.log('1. 异步读取：' + data.toString() );
});

console.log('=======================');

// 同步读取
var data = fs.readFileSync('input.txt');
console.log('2. 同步读取：' + data.toString() );
console.log('3. file.js 程序执行完毕！');

console.log('=======================');


// 异步打开文件 input.txt，并进行读写
console.log("4. 准备打开文件！");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("5. 读取文件信息成功！");
   
   // 检测文件类型
   console.log("6. 是否为文件(isFile) ? " + stats.isFile());
   console.log("7. 是否为目录(isDirectory) ? " + stats.isDirectory());    
});










