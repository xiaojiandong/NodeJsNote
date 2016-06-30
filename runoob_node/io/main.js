
/**
 * 阻塞代码
 * var fs = require('fs');
 * var data = fs.readFileSync('input.txt');
 * console.log(data.toString());
 * console.log( '程序执行结束！阻塞代码，按顺序执行' );
 * 
 */

// 非阻塞代码

var fs = require('fs');
fs.readFile('input.txt' , function(err,data){
  /* 
  if(err){
    return console.error(err);
  };
  */
  if(err){
    console.log(err.stack);
    return;
  }
   console.log(data.toString());
});
console.log('main.js 程序执行结束! 非阻塞代码，不需要按顺序执行');
 