
// 班级模块 class.js

var student = require('./student'); // 引入学生模块
var teach = require('./teach'); // 引入老师模块

teach.add("新老师：小剑");
student.add("新同学：呵呵达");

function add( teacherName , students ){
  // 添加新老师
  teach.add(teacherName);
  // 添加新学生
  students.forEach(function( item , index ){
      student.add(item);
  });
};

exports.add = add; // 推荐使用
module.exports = add;