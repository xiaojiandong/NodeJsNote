

/**
 * 链式流
 * 压缩，解压
 */
var fs = require('fs');
var zlib = require('zlib'); // 压缩
 
// 解压 input2.txt.gz 文件为 input1.txt.gz
fs.createReadStream('input2.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input2.txt'));
console.log('1. decompress.js链式流zlib解压成功！')  ;










