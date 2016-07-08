
// 自定义的subj.js模块
define(function(require, exports, module) {
    /**
     * retuire : 引入需要依赖的模块
     * exports : 当前模块对外输出的接口
     */
   //写法1. 返回的数据
   //return  {  //(也可以不经过return)
   //   subjFn1 : function(){
   //       alert('subj.js里面的一个工具方法 subjFn1(),通过return');
   //   },
   //   subjStr : "这里是subj.js里面的一个字符串subjStr通过return"
   //};
   // 写法2，
   module.exports = {
      subjFn1 :function(){
          alert('subj.js里面的一个工具方法 subjFn1(),通过module.exports');
      },
      subjStr : "这里是subj.js里面的一个字符串subjStr通过module.exports"
   };

});