
/**
 * express是一个简洁灵活的node.js web框架
 * 核心是：
 *   可以设置中间件来响应http请求
 *   定义了路由表用于执行不同的http请求
 *   可以通过向模板传递参数来动态渲染html页面
 */

/**
 * 安装express：npm install express --save
 * 安装body-parser，这个模块是和express框架一起安装的
 *   npm install body-parser --save
 * 安装cookie-parser，cookie解析工具
 *   npm install cookie-parser --save
 * 安装multer，node中间件
 *   npm install multer --save   
 */

var express = require('express');
var app = express();
// 主页输出
app.get('/',function(req,res){
   console.log('1.1 主页GET请求');
   res.send('1.2 Hello World Express1 GET');
});

// POST请求
app.post('/',function(req,res){
  console.log('2.1 主页POST请求');
  res.send('2.2 Hello World Express2 POST');
});

// /del_user 页面响应
app.delete('/del_user',function(req,res){
  console.log('3.1 /del_user响应DELETE请求');
  res.send('3.2 删除页面');
});

// /list_user 页面GET请求
app.get('/list_user',function(req,res){
   console.log('4.1 /list_user响应GET请求');
   res.send('4.2 用户列表页面');
});

// 对页面 abcd,abxcd,ab123cd，等响应GET请求
app.get('/ab*cd',function(req,res){
   console.log('5.2 /ab*cd响应GET请求');
   res.send('5.2 ab*cd正则匹配');
});



var server = app.listen(8081,function(){
   var host = server.address().address;
   var port = server.address().port;
  console.log("express应用实例，访问地址为 http://%s:%s", host, port)
});
























