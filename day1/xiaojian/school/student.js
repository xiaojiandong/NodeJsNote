
// 学生模块 student.js

function add( student ){
  console.log('Add Student:' + student);
}

// exports 对象
exports.add = add; // 将add方法挂到 exports对象上