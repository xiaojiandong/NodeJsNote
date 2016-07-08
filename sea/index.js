
define(function(require,exports,module){
    /**
     * sea.js遵循CMD规范
     * 按需引入模块：
     * 公共模块：subj,jquery
     * 当前页面所需：angular
     */
    var subj = require('subj'); // 引入公共的subj.js这个模块
    var a = require('jquery');// 引入公共的jquery这个模块
    //var bootstrap1 = require('bootstrap');// 引入具体的jquery这个模块(依赖jquery)
    var angular11 = require('angular');// 引入具体的angular这个模块

    //subj.subjFn1(); // 调用模块的方法
    console.log(subj.subjStr);

    // 直接引用jquery里面的写法
    $('.js_test').on('click',function(){
       alert('移动div的位置');
       setTimeout(function(){
           $('.js_test').animate({
             'margin-left' : '250px'
           });
       },800);
    });
    //console.log(angular);//成功
    var app = angular.module('RouterApp',[]);
    app.controller('HomeCtrl',['$scope',
      function($scope){
       $scope.users = [
           {'name' : '张三','age':'20'},
           {'name' : '李四','age':'30'},
           {'name' : '王五','age':'40'}
       ];
    }]);

    angular.bootstrap(document,['RouterApp']);

});

