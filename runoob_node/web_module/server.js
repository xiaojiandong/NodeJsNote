

/**
 * web服务器一般指网站服务器
 * 基本功能就是提供web信息浏览服务
 * 他只需要支持http协议，HTML文档格式及url
 * 与客户端的网络浏览器配合
 * 大多数web服务器支持服务端的脚本语言(php,python,ruby)
 * 通过脚本语言从数据库获取数据，
 * 将结果返还给客户端浏览器
 * 主流的3个web服务器：Apache，Nginx，IIS
 */


/**
 * 使用node创建web服务器
 * node提供了http模块，该模块主要用于搭建
 * http 服务端和客户端，
 */
var http = require('http'); // 引入node原生模块
var fs = require('fs');
var url = require('url');
// 创建服务器
http.createServer(function(request,response){
  //1. 请求解析，包括文件名
  var pathname = url.parse(request.url).pathname;
  //2. 输出请求的文件名
  console.log('Request for- '+pathname+' -received');
  //3. 从文件系统中读取请求文件的内容
  fs.readFile(pathname.substr(1),function(err,data){
    if(err){ // 存在错误
      console.error(err);
      //http状态码:404-> not found
      response.writeHead(404,{'Content-Type':'text/html'});
    }else{ // 正常请求回来的响应
      //http状态码：200 -> ok
      response.writeHead(200,{'Content-Type':'text/html'});
      //响应文件内容
      response.write(data.toString());
    }
    //4. 发送响应数据
    response.end();
  });
}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');











 