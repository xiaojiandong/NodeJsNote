

// http://cnodejs.org/topic/4f16442ccae1f4aa27001071


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
var fs = require('fs');// fs流
var url = require('url');
var path = require('path'); // 处理静态文件路径

// 创建服务器
http.createServer(function(req,res){
 // 访问静态文件
 var pathname=__dirname+url.parse(req.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }
    // 本地静态资源匹配
    fs.exists(pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname,function (err,data){
                res.end(data);
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found (no file to be found)</h1>");
        }
    });
    
}).listen(8082);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8082/');











 