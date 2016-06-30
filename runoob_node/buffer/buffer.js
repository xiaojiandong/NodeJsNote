
/**
 * buffer 缓冲区
 * node.js 中的 Buffer类，
 * 用来创建一个专门存放二进制数据的缓存区
 */

// 创建 Buffer 类
// 方法1 创建长度为10字节的Buffer实例
var buf1 = new Buffer(10);
// 方法2 通过给定的数组创建 Buffer 实例
var buf2 = new Buffer([2,4,5,8]);
// 方法3 通过一个字符串来创建 Buffer 实例
var buf3 = new Buffer('www.runoob.com','utf-8');
// 写入缓冲区
var len = buf3.write('https://www.hao123.com/');
console.log('写入的字节数len：' + len);

var buf4 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf4[i] = i + 97;
}

console.log( buf4.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf4.toString('ascii',0,5));   // 输出: abcde
console.log( buf4.toString('utf8',0,5));    // 输出: abcde
console.log( buf4.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde













 
 