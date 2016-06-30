
var http = require('http');
var querystring = require('querystring');
var util = require('util');
/**
 * post请求的内容全在请求体中
 * http.ServerRequest并没有一个属性内容为请求体
 * 原因是在等待请求体传输可能是一件耗时的工作
 * node.js默认是不会解析请求体的
 * 如果需要解析请求体，可以手动来做
 */
// 获取POST请求的数据
http.createServer(function(req,res){
   var post = '' ;//定义了一个post变量，用于暂存请求体的信息
   /**
    * 通过req的data事件监听函数，每当接受到新请求体的数据
    * 就累加到post变量中
    */
   req.on('data',function(chunk){
     post += chunk;
   });
   /**
    * 在end事件触发后，通过querystring.parse
    * 将post解析为真正的post请求格式
    * 然后向客户端返回
    */
   req.on('end',function(){
     post = querystring.parse(data);
     res.end(util.inspect(post));
   });
   console.log('this is post.js 请求成功 - POST请求');
}).listen(3000);
console.log('Server has started -> http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc');
// 在本地访问：
// http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc































