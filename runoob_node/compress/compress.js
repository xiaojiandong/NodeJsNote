

/**
 * 链式流
 * 压缩，解压
 */
var fs = require('fs');
var zlib = require('zlib'); // 压缩
 
// 压缩 input2.txt 文件为 input2.txt.gz
fs.createReadStream('input2.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input2.txt.gz'));
console.log('1. compress.js链式流zlib压缩成功！')  ;










