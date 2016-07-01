
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

// express 上传文件
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));//静态文件
app.use(bodyParser.urlencoded({ extended: false }));//编码
app.use(multer({ dest: '/tmp/'}).array('image'));//上传文件

// 上传文件的html页面
app.get('/uploadfile.html',function(req,res){
  res.sendFile(__dirname + '/' + 'uploadfile.html');
});

// 上传到的位置
app.post('/file_upload',function(req,res){
  console.log(req.files[0]);//上传文件信息
  var des_file = __dirname + '/' + req.files[0].originalname;
  // 读取文件流
  fs.readFile(req.files[0].path , function(err,data){
    var response;
    if(err){
     console.log(err);
    }else{
      // 服务端得到的响应数据
      response = {
        hasUploaded : true,
        userId : 545154411,
        userName : 'Jack',
        data : {
          message : 'the file has uploaded success',
          filename : req.files[0].originalname,
          person : '余小二',
          book : '<<余罪>>'
        }
      };
    }
    console.log('response信息：');
    console.log(response);
    res.end(JSON.stringify(response));
  });
});

var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例访问地址：http://127.0.0.1:8081/uploadfile.html');
});











