
// 启动一个服务器

var http = require('http');
var port = 8088;
var hostname = '127.0.0.1'; // 本机

// 创建web服务器
var server = http.createServer(function(req , res){ // req->请求体 ；res->响应体
	res.writeHead(200 , {'Content-Type' : 'text/plain'}); // 响应头
	// res.write('res.write body');
	res.end('Hello World XiaoJian \n Hello NodeJs...111000'); // 渲染到页面的数据
})

// listen 监听请求
server.listen(port , hostname); 

console.log('server running at -> http://' + hostname + ':' + port);