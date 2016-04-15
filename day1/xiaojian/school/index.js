
// 入口脚本 index.js

var class1 = require('./a_class'); // 引入 a_class.js这个模块

// class1.add('流川枫' , ['张三' , '李四' , '王五' , '赵六']);

exports.add = function(classes){
	classes.forEach(function(item , index){
      var _class = item;
      var teacherName = item.teacherName;
      var students = item.students;
      class1.add( teacherName . students );
	});
};