
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

/**
 * express.static来设置本地静态文件css,js,img等
 * 将静态文件放到public目录下
 * app.use(express.static('public'))
 */

// express处理表单提交
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded编码解析
var urlencodeParser = bodyParser.urlencoded({extended:false});
// 静态文件目录
app.use(express.static('public'));
// GET请求
app.get('/index.html',function(req,res){
  res.sendFile(__dirname + '/' + 'index.html');
});

/*
// GET请求的路由
app.get('/process_get',function(req,res){
  // 输出 JSON格式
  var response = {
  	first_name : req.query.first_name,
  	last_name : req.query.last_name,
  	age : req.query.age
  };
  console.log('1. response提交表单的数据get：');
  console.log(response);
  res.end(JSON.stringify(response));
});
*/

// POST请求
app.post('/process_post',urlencodeParser,function(req,res){
  // 输出 JSON 格式
  var response = {
  	first_name : req.body.first_name,
  	last_name : req.body.last_name,
  	age : req.body.name
  };
  console.log('2. response提交表单的数据post：');
  console.log(JSON.stringify(response));
});


var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例访问地址：http://127.0.0.1:8081/index.html');
});











