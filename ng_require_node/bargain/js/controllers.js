
define(['base','services'],function(base,services){
// define(['base'],function(base){
  var routerCtrls = angular.module('RouterCtrl',['RouterServices']);

  routerCtrls.controller('IndexCtrl',['$rootScope','$scope','$state','goodsInfoFactory',
   	 function($rootScope,$scope,$state,goodsInfoFactory){
      
     $scope.tabs = goodsInfoFactory.topTabGoodsBg;
     //console.log(goodsInfoFactory);

     $scope.activeIndex = 0;//tab和下面商品的索引
     //点击tab切换卡
     $scope.onTabClick = function(tab){
         $scope.activeIndex = tab.tab_id;
     };
     $rootScope.actBgSrc = goodsInfoFactory.actBgSrc;//首页，底部商品图片

     $scope.onStartKillClick = function(actBg){
         // todo 发起倒计时请求
         //console.log(actBg);
         //return false;
        //$state.go("index.act_down");
         window.location.href='http://127.0.0.1:8083/' +
         'bargain/index.html#/index/act_down?goods_type='+actBg.src_id;

     };
  }]);

  // 活动初始页
  routerCtrls.controller('HomeCtrl',['$rootScope','$scope',
      function($rootScope,$scope){
  }]);

  // 活动倒计时页
 routerCtrls.controller('ActDownCtrl',['$rootScope','$scope','$timeout','goodsInfoFactory',
  function($rootScope,$scope,$timeout,goodsInfoFactory){

  var goodsType = SUBJ.getValueFromHrefByKey('goods_type');
      console.log('goodsType : ' + goodsType);
   $rootScope.actTopBgSrc = goodsInfoFactory.actTopBgSrc;//倒计时页面，头部商品图片
   console.log(goodsInfoFactory.actTopBgSrc[goodsType]);
   $rootScope.actTopBgInfo = goodsInfoFactory.actTopBgSrc[goodsType];

   //var goodsData = {
   //    hasCut : false
   //};
   //if(window.localStorage){
   //    localStorage.setItem('goodsStatus',JSON.stringify(goodsData));
   //}
   $scope.isShowSuccessMask = false; // 是否显示砍价成功的弹窗
   $scope.hasCut = false;// 是否已帮ta砍价过

   // 获取本地存储的数据
   if( localStorage.getItem('goodsStatus') &&
       localStorage.getItem('goodsStatus') != null &&
       localStorage.getItem('goodsStatus') != 'undefined'){
       var goo = JSON.parse(localStorage.getItem('goodsStatus'));
       console.log(goo);
       if(goo.hasCutLocal){ // 已经砍过
           $('.js_help_ta_kill').text('已砍过').css('color','#999');
           $rootScope.actTopBgInfo.price = goo.price;
           //$scope.bindKillClick(goo.hasCutLocal);
           $scope.onHelpTaKillClick = function(){
               return false;
           };
       }
   }else{ // 首次刷新页面或清空缓存的状态
       $('.js_help_ta_kill').text('帮ta砍价');
       $scope.onHelpTaKillClick = function(){
               $('.js_help_ta_kill').text('已砍过').css('color','#999');
               $scope.isShowSuccessMask = !$scope.isShowSuccessMask;
               // 随机折扣价
               $scope.randomCutPrice = Math.random().toFixed(2) * 100;
               $rootScope.actTopBgInfo.price -=  $scope.randomCutPrice;
               var goodsData = {};
               goodsData.hasCutLocal = true;
               goodsData.price = $rootScope.actTopBgInfo.price; //将砍价后的价格存储到本地
               localStorage.setItem('goodsStatus',JSON.stringify(goodsData));
       };
   }


      /*
      setTimeout(function(){
          var goodsData = {hasCut:false};
          localStorage.setItem('goodsStatus',JSON.stringify(goodsData));
          location.reload();
      },3000);
      */
   //关闭成功的弹窗
    $scope.onCloseMask = function(){
        $scope.isShowSuccessMask = !$scope.isShowSuccessMask;
    };
    // 阻止冒泡
    $scope.onStopPropagationClick = function(e){
        var e = e || window.event;
        e.stopPropagation();
    };

    // 分享给好友
    $scope.onShareFriendsClick = function(){
      alert('分享给好友');
    };

      var t = new Date();
      console.log(t);
      var startTime = '2016/07/05 17:20:20';
      var endTime = '2016/07/05 17:20:25';
      $scope.callback = function(){
         console.log('倒计时结束');
         $('.cut-words-tips-wrap').css('color','#999');
         $('.js_time_p').text('活动已结束！');
         $('.js_now_pay_btn').show(); //立即付款
         $('.js_start_kill_again').show(); // 重新发起
      };
      SUBJ.getCutTimeDown('js_time',startTime,endTime,$scope.callback);
     //立即付款
      $scope.onPayClick = function(){
        alert('跳转到立即付款页面');
      };
      // 重新发起
      $scope.onStartAgain = function(){
        alert('重新发起砍价');
        //location.reload();
        localStorage.removeItem("goodsStatus");//清除本地缓存goodsStatus的值
      };
  }]);
    
  

});