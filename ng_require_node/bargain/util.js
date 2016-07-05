

var util = {};

util.cutTime = function(div,startTime,endTime){
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
            clearTimeout(timerID)
        }
    }
};