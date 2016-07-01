
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

var express = require('express');
var app = express();

// 静态文件存放到public中
app.use(express.static('public'));


app.get('/',function(req,res){
   console.log('1.1 主页GET请求,静态文件');
   res.send('1.2 静态文件访问 Hello World Static Files Express1 GET');
});
 
var server = app.listen(8081,function(req,res){
   var host = server.address().address;
   var port = server.address().port;
   console.log('2.1 程序执行完毕，访问地址:http://127.0.0.1:8081',host,port);
}); 






















