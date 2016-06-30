

// 入口文件 index.js

var server = require('./server'); // 同级目录下的server.js
var router = require('./router');

// router模块的 route方法是一个返回值
server.start(router.route);





 



