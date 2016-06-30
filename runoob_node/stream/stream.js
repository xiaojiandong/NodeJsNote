
/**
 * Stream 是一个抽象接口，
 * 例如对http服务器发起请求的request对象
 * 就是一个Stream，还有stdout(标准输出)
 * 1.Stream 有4种流类型
 *    Readable - 可读操作
 *    Writable - 可写操作
 *    Duplex - 可读可写操作
 *    Transform - 操作被写入数据，然后读出结果
 * 2.所有Stream对象都是EventEmitter的实例
 *    data - 当有数据可读时触发
 *    end - 没有更多的数据可读时触发
 *    error - 在接收和写入过程中发生错误时触发
 *    finish - 所有数据已被写入到底层系统时触发  
 */

// 读取流
var fs = require('fs');
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 uft-8
readerStream.setEncoding('UTF-8');
// 处理流事件 -> data,end,error
readerStream.on('data',function(chunk){
  data += chunk;
});
readerStream.on('end',function(){
  console.log(data);
});
readerStream.on('error',function(err){
  console.log(err.stack);
});
console.log('1. stream.js程序执行完毕，读取input.txt中的数据');

console.log('===============');

// 写入流
var data1 = '我现在是在stream.js中的数据，现在要通过writerStream.write(data1,UTF8);写入到output.txt文件中';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');
// 使用 UTF8 编码写入数据
writerStream.write(data1,'UTF8');
// 标记文件末尾
writerStream.end();
// 处理流事件 -> data,end,error
writerStream.on('finish',function(){
  console.log('2.1 写入完成');
});
writerStream.on('error' , function(err){
	console.log(err.stack);
});
console.log('2.2 stream.js程序执行完毕，写入了数据到output.txt中');

console.log('===============');

/**
 * 管道读写操作(借用上面的 readerStream 实例和 writerStream 实例)
 * 读取 input.txt 文件内容，并写入到 output.txt 文件内
 */
var readerStream1 = fs.createReadStream('input1.txt');
var writerStream1 = fs.createWriteStream('output1.txt');
readerStream1.pipe(writerStream1);// read的内容，写入到weite中
console.log('3 读写管道流readerStream1.pipe(writerStream1)操作完毕');










