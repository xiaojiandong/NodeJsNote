
define(['jquery','jquery_confirm','angular_animate','bootstrap','router'],
	function(jquery,jquery_confirm,angular_animate,bootstrap,router){
 
   return SUBJ = {
       angularInit : function (app) {
           //angular.bootstrap(document,[app]);
           angular.bootstrap(document,[app]);
       },
       //动态设置640px的父容器包裹
       outerContainerWrapFn: function(){
        var useScaledViewportMeta = function ( ) {
          var phoneWidth = parseInt(window.screen.width);
          var phoneScale = phoneWidth/640;
          $('head').append('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi,minimum-scale='+phoneScale+',maximum-scale='+phoneScale+'">');
        };
       var ua = navigator.userAgent;
        if (/Android (\d+\.\d+)/.test(ua)){
        var version = parseFloat(RegExp.$1);
        // andriod 2.3
        if(version>2.3){
        useScaledViewportMeta();
        // andriod 2.3以上
       }else{
       $('head').append('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }
      // 其他系统
      } else {
       useScaledViewportMeta();
      }
      var outerContainerWrap = "<div class='js_outer_container_wrap'></div>";
         $( "body" ).wrapInner( outerContainerWrap);
         $('.js_outer_container_wrap').css({
            'width': '640px',
            'margin': '0 auto',
            //'background': 'pink',
            'text-align': 'center',
            'overflow': 'hidden'
          });
       },
       // 通过url的key值，返回对应的value 1
       getValueFromUrlByKey:function(name){
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
           var r = window.location.search.substr(1).match(reg);
           if (r!=null) return decodeURI((r[2])); return null;
       },
       // 通过url的key值，返回对应的value 2
       getValueFromHrefByKey : function (key) {
            //测试数据，实际情况是用window.location.href得到URL
            var sHref = window.location.href;
            //取出不带＃的URL
            //sHref = sHref.split('#')[0];//#之前
            sHref = sHref.split('#')[1];//#之后
            var args = sHref.split("?");
            var retval = "";
            /*参数为空*/
            if(args[0] == sHref){
                return retval; /*无需做任何处理*/
            }
            var str = args[1];
            args = str.split("&");
            for(var i = 0; i < args.length; i++ ) {
                str = args[i];
                var arg = str.split("=");
                if(arg.length <= 1) continue;
                if(arg[0] == key) retval = arg[1];
            }
            //if(!retval){
            //    //alert('url中的' + key + '参数为空');
            //    console.log('url中的' + key + '参数为空');
            //}
            return retval;
        },
       // 获取倒计时，节点，开始时间，结束时间
        getCutTimeDown : function(div,startTime,endTime,callback){
            var time_now_server,time_now_client,time_end,time_server_client,timerID;
            time_end=new Date(endTime);//结束的时间
            time_end=time_end.getTime();
            time_now_server=new Date(startTime);//开始的时间
            time_now_server=time_now_server.getTime();
            time_now_client=new Date();
            time_now_client=time_now_client.getTime();
            time_server_client=time_now_server-time_now_client;
            setTimeout(showTime,1000);
            function showTime(){
                //var timer = document.getElementById("timer");
                var timer = document.getElementById(div) || document.getElementsByClassName(div)[0];
                if(!timer){return;}
                timer.innerHTML =time_server_client;
                var time_now,time_distance,str_time;
                var int_day,int_hour,int_minute,int_second;
                var time_now=new Date();
                time_now=time_now.getTime()+time_server_client;
                time_distance=time_end-time_now;
                if(time_distance>0){ // 正在倒计时
                    int_day=Math.floor(time_distance/86400000);
                    time_distance-=int_day*86400000;
                    int_hour=Math.floor(time_distance/3600000);
                    time_distance-=int_hour*3600000;
                    int_minute=Math.floor(time_distance/60000);
                    time_distance-=int_minute*60000;
                    int_second=Math.floor(time_distance/1000);
                    if(int_hour<10)
                        int_hour="0"+int_hour;
                    if(int_minute<10)
                        int_minute="0"+int_minute;
                    if(int_second<10)
                        int_second="0"+int_second;
                    str_time=int_day+"天"+int_hour+"小时"+int_minute+"分钟"+int_second+"秒";
                    timer.innerHTML=str_time;
                    setTimeout(showTime,1000);
                }else{ // 倒计时已结束
                    //timer.innerHTML =timer.innerHTML;
                    timer.innerHTML = '活动已结束';
                    clearTimeout(timerID);

                    if(callback && callback!=''){
                        callback();
                    }
                }
            }
        }

    };
  
});