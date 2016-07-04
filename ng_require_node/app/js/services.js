

define(['base'],function(base){
  var routerAppSer = angular.module('RouterServices',[]);
    routerAppSer.factory('testService' , function(){
        var data = {};
        data.a = 10;
        data.b = 'asas';
        return data;
    });

// 创建一个公共的服务
    routerAppSer.factory('AllUserInfosFactory' , function(){
        var userInfo = ['张三' , '李四' , '王五' , '赵六'];
        var factory = {};
        factory.userInfo = userInfo;
        return  factory;
    });
// 创建一个公共服务，存储修改过的用户
    routerAppSer.factory('saveUserEditedInfo' , function(){
        var provide = {};
        provide.editedInfo = '';
        return provide;
    });

// 学生的具体信息
    routerAppSer.factory('allStudentsInfo' , function(){
        var allStudents = {};
        allStudents.info = [ // 学生信息
            {'name':'刘天华','no':'2016210301','className':'高三(1)班','teacher':'吴老师','sex':'男','birthday':'1999.02.03','nativePlace':'上海-徐汇','index':'0',
                'tel' : '13952524141','totalScore':'570','classType':'1','avatar':'http://p.3761.com/pic/99751429577705.jpg'},
            {'name':'李八折','no':'2016520303','className':'高三(3)班','teacher':'薛老师','sex':'男','birthday':'1998.11.13','nativePlace':'北京-朝阳','index':'1',
                'tel' : '13735241577','totalScore':'522','classType':'3','avatar':'http://www.ld12.com/upimg358/20160130/144305263177296.jpg'},
            {'name':'张四风','no':'2016540304','className':'高三(4)班','teacher':'孔老师','sex':'女','birthday':'1999.05.26','nativePlace':'河北-秦皇岛','index':'2',
                'tel' : '13863527888','totalScore':'420','classType':'4','avatar':'http://www.ld12.com/upimg358/allimg/c150729/143Q5R552Y0-234603.jpg'},
            {'name':'王浩浩','no':'2016650301','className':'高三(1)班','teacher':'吴老师','sex':'男','birthday':'2000.01.03','nativePlace':'山东-济宁','index':'3',
                'tel' : '12865244412','totalScore':'468','classType':'1','avatar':'http://www.qq1234.org/uploads/allimg/150728/8_150728144315_9.jpg'},
            {'name':'王麻子','no':'2016540302','className':'高三(2)班','teacher':'刘老师','sex':'女','birthday':'1998.12.16','nativePlace':'山西-太原','index':'4',
                'tel' : '13854157474','totalScore':'340','classType':'2','avatar':'http://img4q.duitang.com/uploads/item/201501/24/20150124174550_3erfQ.png'},
            {'name':'张明明','no':'2016740302','className':'高三(2)班','teacher':'刘老师','sex':'女','birthday':'1999.05.18','nativePlace':'河南-郑州','index':'5',
                'tel' : '13765235454','totalScore':'586','classType':'2','avatar':'http://www.qqleju.com/uploads/allimg/141022/22-032936_250.jpg'},
            {'name':'赵晨晨','no':'2016770303','className':'高三(3)班','teacher':'薛老师','sex':'女','birthday':'1998.10.08','nativePlace':'湖北-荆州','index':'6',
                'tel' : '15252401745','totalScore':'473','classType':'3','avatar':'http://img1.3lian.com/gif/more/11/201207/d265a2ff997c4e4057681d4d0c14b6dc.jpg'},
            {'name':'张洁洁','no':'2016690301','className':'高三(1)班','teacher':'吴老师','sex':'女','birthday':'1999.03.16','nativePlace':'福建-福州','index':'7',
                'tel' : '13565254881','totalScore':'361','classType':'1','avatar':'http://www.ld12.com/upimg358/allimg/c150729/143Q5R555PZ-243100.jpg'}
        ];
        allStudents.classInfo = [ // 班级信息
            {'name' : '高三(1)班','teacher':'吴老师','subject':'文科','classType':'1'},
            {'name' : '高三(2)班','teacher':'刘老师','subject':'理科','classType':'2'},
            {'name' : '高三(3)班','teacher':'薛老师','subject':'理科','classType':'3'},
            {'name' : '高三(4)班','teacher':'孔老师','subject':'理科','classType':'4'}
        ];
        return allStudents;
    });

// 通过url获取参数
    routerAppSer.factory('SUBJFac' , function(){
        var SUBJ = {};
        SUBJ.getValueFromUrl = function(name){ // 传参，通过key，范湖value值
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return decodeURI((r[2])); return null;
        };
        SUBJ.hasUnitStr = function(originStr,needStr){ // 传参(原始的str，指定的str)，返回boolean值
            if(originStr.indexOf(needStr) > 0){ // originStr中是否包含needStr
                return true;
            }else{
                return false;
            }
        };
        // 原始长longStr;指定str;index - (0:之前，1:之后)
        SUBJ.getBeforeOrAfterStr = function(longStr,str,index){ // 截取指定字符串前后的字符串
            var str_before = longStr.split(str)[0];
            var str_after = longStr.split(str)[1];
            //alert('前：'+str_before+' - 后：'+str_after);
            if(index == 0){ // 截取str之前的
                return str_before;
            }else{ // 截取str之后的
                return str_after;
            }
        };
        // 导航高亮定位工具方法
        SUBJ.selectTopBarActive = function(index){
            setTimeout(function(){
                $('.common-topbar').removeClass('activeBar');
                $('.topbar-'+index).addClass('activeBar');
            },30);
        };
        // 初始化导航高亮，页面刷新也不会保存当前高亮
        SUBJ.topBarInit = function(){
            var winUrl = window.location.href; // 通过url，判断哪个tab高亮
            if(SUBJ.hasUnitStr(winUrl,'usermng')){ // 是否包含 usermng
                SUBJ.selectTopBarActive(1); // 班级管理
            }else if(SUBJ.hasUnitStr(winUrl,'score') || SUBJ.hasUnitStr(winUrl,'edit')){
                SUBJ.selectTopBarActive(2); // 成绩管理
            }else if(SUBJ.hasUnitStr(winUrl,'signup')){
                SUBJ.selectTopBarActive(3); // 学生注册
            }else if(SUBJ.hasUnitStr(winUrl,'userInfo')){
                SUBJ.selectTopBarActive(4); // 个人中心
            }
        };
        // 编辑/注册学生信息时, 全局计算不同班级老师和学生对应的个数
        SUBJ.countClassTeacherAndStudentsNum = function(allStudentsInfo){ // 参数为控制器中传入的学生factory
            //alert('计算老师对应的学生个数factory');
            var classNameThree1Count = 0; // 累计高三(1)班的人数
            var classNameThree2Count = 0; // 累计高三(2)班的人数
            var classNameThree3Count = 0; // 累计高三(3)班的人数
            var classNameThree4Count = 0; // 累计高三(4)班的人数
            angular.forEach(allStudentsInfo.info, function(data,index,array){
                //data等价于array[index]，即数组内部的每个元素(或对象)
                //console.log(data.name+'='+array[index].name); // 都是相等的
                //console.log(data);
                if(data.className == '高三(1)班'){
                    classNameThree1Count += 1;
                }else if(data.className == '高三(2)班'){
                    classNameThree2Count += 1;
                }else if(data.className == '高三(3)班'){
                    classNameThree3Count += 1;
                }else if(data.className == '高三(4)班'){
                    classNameThree4Count += 1;
                }
                //console.log(arra);
            });
            var classNameStudentCount = []; // 该数组包含4个班级的人数
            classNameStudentCount[0] = classNameThree1Count; // 1班人数
            classNameStudentCount[1] = classNameThree2Count; // 2班人数
            classNameStudentCount[2] = classNameThree3Count; // 3班人数
            classNameStudentCount[3] = classNameThree4Count; // 4班人数
            return classNameStudentCount;
        };
        return SUBJ;
    });
});