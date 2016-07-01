

/**
 * REST即表述性状态传递(增删改查)
 * REST基本架构的四个方法，通常使用json格式
 *   GET : 获取数据
 *   PUT : 添加数据
 *   DELETE : 删除数据
 *   POST : 更新或添加数据
 */

/**
 * RESTful Web Services
 * 基于REST架构的Web Services即RESTful
 */


var express = require('express');
var app = express();
var fs = require('fs');

// 1. 获取用户列表，从users.json中获取
app.get('/listUsers',function(req,res){ // /listUsers路由
  fs.readFile(__dirname + '/' + 'users.json','utf8',function(err,data){
    console.log('1. 路由/listUsers获取users.json中的数据 : ');
    console.log(data);
    res.end(data);
  });
});

// 2. 添加用户
var user = {
   "user4" : {
      "name" : "韦小宝(是新添加的用户)",
      "password" : "666666",
      "profession" : "大内总管",
      "id": 4
   }
};
app.get('/addUser',function(req,res){
  // 2.1 读取已存在的数据
  fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
     // 2.2 users.json中的data转换格式
     var data = JSON.parse(data);
     // 2.3 将值添加到users.json内
     data["user4"] = user["user4"];
     console.log('2. 路由/addUser添加数据到users.json中 : ');
     console.log(data);
     // 2.4 将users.json的值渲染到浏览器中
     res.end(JSON.stringify(data));
  });
});

/*
// 3. 显示用户详情
app.get('/:id',function(req,res){
  // 3.1 读取users.json中已存在的用户
  fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
     // 3.2 转化数据格式
     var data = JSON.parse(data);
     // 3.3 根据id，匹配用户详情
     var user = data["user" + req.params.id];
     console.log("3. /id显示用户详情：");
     console.log(user);
     // http://127.0.0.1:8081/1
     res.end(JSON.stringify(user));
  });
});
*/


// 4. 删除用户
app.get('/deleteUser',function(req,res){
  var delId = 1; // 删除id为2的用户  
  // 4.1 读取users.json中已存在的用户
  fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
     var data = JSON.parse(data) ;
     console.log("4.1 路由/deleteUser删除的用户：");
     console.log(data["user" + delId]);
     // 4.2 删除这个id的用户
     delete data["user"+delId];
     // delete data['menpai'];
     res.end(JSON.stringify(data));
     // console.log("4.2 剩下的全部用户：");
     // console.log(JSON.stringify(data));
  });
});


var server = app.listen(8081,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('RESTful程序执行成功,访问地址：http://127.0.0.1:8081',host,port);
});













