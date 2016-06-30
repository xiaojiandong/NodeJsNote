
var http = require('http');
var url = require('url');
var util = require('util');
/**
 * 由于get请求直接被嵌入在路径中，url是完整的请求路径
 * 他包含了?后面的部分，因此你可以手动解析后面的内容作为get请求的参数
 * node.js中url模块的parse函数提供了这个功能
 */
// 获取GET请求的数据
http.createServer(function(req,res){
   res.writeHead(200,{'Content-Type' : 'text/plain'});
   var urlParse = url.parse(req.url,true);
   res.end(util.inspect(urlParse));
   console.log('this is get.js 请求成功 - GET请求');
}).listen(3000);
console.log('Server has started -> http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc');
// 在本地访问：
// http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc































