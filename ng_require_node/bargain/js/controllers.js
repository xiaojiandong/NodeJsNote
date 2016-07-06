
define(['base','services'],function(base,services){
// define(['base'],function(base){
  var routerCtrls = angular.module('RouterCtrl',['RouterServices']);

  routerCtrls.controller('IndexCtrl',['$rootScope','$scope','$state','goodsInfoFactory',
   	 function($rootScope,$scope,$state,goodsInfoFactory){

     $rootScope.tabs = goodsInfoFactory.topTabGoodsBg;
     angular.forEach($rootScope.tabs, function(data,index,array){
         array[0].check_name = '砍价者';
         array[1].check_name = '其他砍价团';
         array[2].check_name = '规则声明';
     });

     $rootScope.activeIndex = 0;//tab和下面商品的索引
     $rootScope.changeIndex = 0;
     $rootScope.pageClass = 'tab0';
     //点击tab切换卡
     $rootScope.onTabClick = function(tab){
         $rootScope.activeIndex = tab.tab_id;
         $rootScope.changeIndex = 0;
         console.log(tab);

         // tab内容部分动画
         $rootScope.pageClass = 'tab'+tab.tab_id; //砍价者
         //$scope.pageClass = 'tab1'; //其他砍价团
         //$scope.pageClass = 'tab2'; //规则声明
     };
     $scope.onTabClick1 = function(tab){
         $rootScope.changeIndex = tab.tab_id;
         console.log(tab.tab_id);
     };

     $rootScope.actBgSrc = goodsInfoFactory.actBgSrc;//首页，底部商品图片
     $rootScope.callback = function(){
             console.log('倒计时结束');
             $('.cut-words-tips-wrap').css('color','#999');
             //$('.js_time_p').text('本场活动已结束！');
             $('.js_now_pay_btn').show(); //立即付款
             $('.js_start_kill_again').show(); // 重新发起
     };

     $scope.onStartKillClick = function(actBg){
         // todo 发起倒计时请求
         //console.log(actBg);
         //return false;
        //$state.go("index.act_down");
         if(localStorage.getItem("goodsStatus")){
             localStorage.removeItem("goodsStatus");//清除本地缓存goodsStatus的值
         }

         location.reload();
         window.location.href='http://127.0.0.1:8083/' +
         'bargain/index.html#/index/act_down?goods_type='+actBg.src_id;
         var startTime = '2016/7/5 17:20:20';
         var endTime = '2016/7/5 17:20:30';
         // 倒计时工具方法
         SUBJ.getCutTimeDown('js_time',startTime,endTime,$rootScope.callback);
     };

     var DEVICE_HEIGHT = $(window).height(); // 设备窗口高度
     $(window).on('scroll',function(){
         var currentScrollTop  = $(window).scrollTop();
         if(currentScrollTop>DEVICE_HEIGHT){
             $rootScope.isShowReturn = true;
             $('.js_return_top_btn').show();
         }else{
             $('.js_return_top_btn').hide();
         }
     });
     // 返回顶部
     $rootScope.onReturnTopClick = function(){
         var timer = null;
         timer = setInterval(function(){
             var currentScrollTop  = $(window).scrollTop();
             currentScrollTop = (currentScrollTop / 1.3 ).toFixed(2); // 设置滚动条缓冲
             if( currentScrollTop < 1 ){
                 currentScrollTop = Math.floor(currentScrollTop); //向下取整，最终为0
             }
             if( currentScrollTop <=0 ){
                 clearInterval(timer);
             }
             $(window).scrollTop( currentScrollTop ); // 重置滚动条高度，返回顶部
         } , 30);
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
   $rootScope.actTopBgSrc = goodsInfoFactory.actTopBgSrc;//倒计时页面，头部商品图片
   $rootScope.actTopBgInfo = goodsInfoFactory.actTopBgSrc[goodsType];

   $scope.isShowSuccessMask = false; // 是否显示砍价成功的弹窗
   $scope.hasCut = false;// 是否已帮ta砍价过
   $rootScope.randomPrice = 0; //初始状态无人砍价
   // 获取本地存储的数据
   if( localStorage.getItem('goodsStatus') &&
       localStorage.getItem('goodsStatus') != null &&
       localStorage.getItem('goodsStatus') != 'undefined'){
       var goo = JSON.parse(localStorage.getItem('goodsStatus'));
       if(goo.hasCutLocal){ // 已经砍过
           $('.js_help_ta_kill').text('已砍过').css('color','#999');
           $rootScope.actTopBgInfo.price = goo.price;
           $rootScope.randomPrice = goo.randomPrice;
           //$scope.bindKillClick(goo.hasCutLocal);
           $scope.onHelpTaKillClick = function(){
               return false;
           };
       }
   }else{ // 首次刷新页面或清空缓存的状态
       $('.js_help_ta_kill').text('帮TA砍价');
       $scope.onHelpTaKillClick = function(){
           if(!$scope.hasCut){ // 第一次砍
               // 存储砍的次数，最多不超过3次
               var time = 0;
               if(localStorage.getItem('cutKillTime') && // 存在次数，则先取出来
                   localStorage.getItem('cutKillTime') != null &&
                   localStorage.getItem('cutKillTime') != 'undefined'){
                   var cut = JSON.parse(localStorage.getItem('cutKillTime'));
                   cut = parseInt(cut);
                   time = cut + 1;
               }else{ // 首次砍，次数加1，并存入到本地存储
                   time += 1;
               }
               localStorage.setItem('cutKillTime',JSON.stringify(time));
               var cut = JSON.parse(localStorage.getItem('cutKillTime'));
               console.log('砍的次数cut：' + cut);
               if(cut > 3){ // 超过3次，则禁止再砍
                 alert($rootScope.actTopBgInfo.actName + ' 已经砍了3次了，不能再砍了');
               }else{
                   $('.js_help_ta_kill').text('已砍过').css('color','#999');
                   $scope.isShowSuccessMask = !$scope.isShowSuccessMask;
                   // 随机折扣价
                   $scope.randomCutPrice = parseInt(Math.random().toFixed(2) * 100);
                   $rootScope.actTopBgInfo.price -=  $scope.randomCutPrice;
                   var goodsData = {};
                   goodsData.hasCutLocal = true;
                   goodsData.price = $rootScope.actTopBgInfo.price; //将砍价后的价格存储到本地
                   goodsData.randomPrice = $scope.randomCutPrice; //将砍的价格存储到本地
                   $rootScope.randomPrice = goodsData.randomPrice;
                   localStorage.setItem('goodsStatus',JSON.stringify(goodsData));
                   // 弹窗显示还能砍的次数
                   $scope.leaveCutTime = 3-cut;
               }
           }else{

           }
           $scope.hasCut = true;
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

     //立即付款
      $scope.onPayClick = function(){
        alert('跳转到立即付款页面，当前价格:'+$scope.actTopBgInfo.price);
      };
      // 重新发起
      $scope.onStartAgain = function(){
        $('.js_now_pay_btn , .js_start_kill_again').hide();
        $('.js_help_ta_kill').show().text('帮TA砍价').css('color','#fff');
        //alert('重新发起砍价');
        location.reload();

        localStorage.removeItem("goodsStatus");//清除本地缓存goodsStatus的值
          $('.cut-words-tips-wrap').css('color','#fff');
          $('.js_time').text('开始倒计时');
          var t = new Date();
          $scope.bindTimeCut(t);
          var clickStartDate = $scope.bindTimeCut(t).clickStartDate;
          var clickEndDate = $scope.bindTimeCut(t).clickEndDate;
          var d = {
              clickStartDate : clickStartDate,
              clickEndDate : clickEndDate
          };
          console.log('clickStartDate : ' + clickStartDate);
          console.log('clickEndDate : ' + clickEndDate);
          // 将开始时间和结束时间存储到本地
          localStorage.setItem('dateObj',JSON.stringify(d));
      };
      // 页面刷新，从本地存储中获取开始/结束时间的数据
      if(localStorage.getItem('dateObj') &&
          localStorage.getItem('dateObj') != null &&
          localStorage.getItem('dateObj') != 'undefined'){
          var d = JSON.parse(localStorage.getItem('dateObj'));
          SUBJ.getCutTimeDown('js_time',d.clickStartDate,d.clickEndDate,$rootScope.callback);
      }

      $scope.bindTimeCut = function(t){
          var year = t.getFullYear(); //年
          var mon = t.getMonth()+1; //月
          var day = t.getDate(); //天
          var hour = t.getHours(); //时
          var min = t.getMinutes(); //分
          var sec = t.getSeconds(); //秒
          console.log(t);
          // 开始时间
          var clickStartDate = year+'/'+mon+'/'+day+' '+hour+':'+min+":"+sec;
          // 设置间隔时间为10s
          var day1,hour1,min1,sec1;
          sec1 = sec + 11; //截止秒
          if(sec1 >= 60){
              sec1 = sec1 - 60;
              min1 = min + 1;
              if(min1 >= 60){
                  min1 = min1 - 60;
                  hour1 = hour + 1;
              }else{
                  hour1 = hour;
                  day1 = day;
              }
          }else{
              min1 = min;
              hour1 = hour;
              day1 = day;
          }
          // 结束时间
          var clickEndDate = year+'/'+mon+'/'+day1+' '+hour1+':'+min1+":"+sec1;
          SUBJ.getCutTimeDown('js_time',clickStartDate,clickEndDate,$rootScope.callback);
          return dateObj = {
              clickStartDate : clickStartDate,
              clickEndDate : clickEndDate
          };
      };

      // 用户图片轮播
      console.log(goodsInfoFactory.userInfo);
      $scope.userInfos = goodsInfoFactory.userInfo;
      $rootScope.bindScroll = function(){
          var SINGLE_LI_HEIGHT;
          var userInfoContentTop;
          var userInfoContentTHeight;
          setTimeout(function(){
              SINGLE_LI_HEIGHT = $('.js_single_user_li').outerHeight() + 15;
              userInfoContentTHeight = $('.js_user_scroll_wrap').outerHeight();
          },30);
          setInterval(function(){
              if($('.js_user_scroll_wrap').position() && $('.js_user_scroll_wrap').position().top != 'undefined'){
                  userInfoContentTop = $('.js_user_scroll_wrap').position().top;
                  if(userInfoContentTop <= -(userInfoContentTHeight/2 - 15)){
                      $('.js_user_scroll_wrap').css({
                          'top' : '0'
                      });
                  }else{
                      $('.js_user_scroll_wrap').animate({
                          'top' : '-=' + SINGLE_LI_HEIGHT
                      },800);
                  }
              }
          },3000);
      };
      $rootScope.bindScroll();


      //其他两个砍价团过滤
      $scope.actFilterFn = function(data){
          if(data.src_id != goodsType){ //过滤掉正在砍价的团
              return data;
          }
      };


  }]);
    
  

});