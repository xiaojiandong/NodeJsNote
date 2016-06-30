
/**
 * node.js 文件系统(fs模块)中的方法有异步和同步
 */

var fs = require('fs');

// 写入文件 fs.writeFile()
console.log('1. 准备写入文件');
var writeContent = '我是写入的内容，fs.writeFile方法';
fs.writeFile('input1.txt',writeContent,function(err){
   if(err){
     return console.error(err);
   };
   console.log('2. 数据写入成功');
   console.log('======华丽的分割线 1======');
   console.log('3. 读取写入的数据');
   fs.readFile('input1.txt',function(err,data){
      if(err){
        return console.error(err);   
      };
      console.log('异步读取文件数据：'+data.toString());
   });
});

console.log('======华丽的分割线 2======');

// 删除文件 fs.unlink()
setTimeout(function(){
 console.log('4. 准备删除文件');
 fs.unlink('input1.txt',function(err,data){
   if(err){
    return console.error(err);
   }
   console.log('5. 文件删除成功');
 });
},2500);


console.log('======华丽的分割线 3======');

/*
// 创建目录
console.log('6. 创建目录/tmp/test/');
fs.mkdir('/tmp/test/',function(err){
  if(err){
    return console.error(err);
  };
  console.log('7. 目录创建成功');
});
*/






