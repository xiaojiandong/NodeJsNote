
define(['base','services'],function(base,services){
  var routerCtrls = angular.module('RouterCtrl',['RouterServices']);

routerCtrls.controller('HomeCtrl',['$rootScope','$scope','allStudentsInfo',
   	function($rootScope,$scope,allStudentsInfo){
        $rootScope.students = allStudentsInfo.info;
        $rootScope.singleStudentInfo = allStudentsInfo.info[0]; // 默认第1个，点击score页面的“编辑”按钮
        $rootScope.arrIndex; // 全局的数组索引
        $rootScope.classInfos = allStudentsInfo.classInfo; //  与班级管理-全部班级里的数据保持一致
        $rootScope.classDetails = allStudentsInfo.info; // 班级详情信息
        $rootScope.classType = '1'; // 班级类型，代表1~4这四个班

        var data = {
        	'0' : {
        	 'name' : '张三',
             'age' : '20',
             'place' : '中国'	
        	},
           '1' : {
        	 'name' : '李四',
             'age' : '21',
             'place' : '美国'	
        	},
        	'2' : {
        	 'name' : '王五',
             'age' : '22',
             'place' : '英国'	
        	}
        };
        if(window.localStorage){
            localStorage.setItem('testData' , JSON.stringify(data));
        }else{
        	console.log('你的浏览器不支持localStorage');
        };
        var getData = localStorage.getItem('testData');
        console.log('测试loaclStorage数据：');
        console.log( JSON.parse(getData) );
}]);
 
// 导航topbar
routerCtrls.controller('topbarCtrl' , ['$scope','SUBJFac',
   function($scope,SUBJFac){
    $scope.tobarItems = [
            {'sref' : 'index','text' : '首页'},
            {'sref' : 'index.usermng.allstudents','text' : '班级管理'},
            {'sref' : 'index.score','text' : '成绩管理'},
            {'sref' : 'index.signup','text' : '学生注册'},
            {'sref' : 'index.userInfo','text' : '个人中心'}
        ];
    SUBJFac.topBarInit(); // 初始化导航条高亮，页面刷新也可以保持高亮
    $scope.activeIndex = 0; // 默认第1个"首页"高亮
    $scope.onTopNavClick = function(index){
         $scope.activeIndex = index; // 在html中判断高亮
            SUBJFac.selectTopBarActive(index); // 点击事件判断高亮
        };
}]);

// 班级管理 左侧导航
routerCtrls.controller('UserMngCtrl' ,['$rootScope','$scope','$state','allStudentsInfo',
     function($rootScope,$scope,$state ,allStudentsInfo){
        $scope.currentIndex = 0;
        $scope.uiSrefs = [
                {url : 'allstudents' , word : '全部学生'},
                {url : 'allclass' , word : '全部班级'},
                {url : 'honorlist' , word : '光荣榜(>550)'},
                //{url : 'lowusers' , word : '成绩较差(<400)'},
                {url : 'blacklist' , word : '补考名单(<400)'}
                //{url : 'edit' , word : '编辑'}
        ];
        $scope.setUiSrefClick = function(index){
                $scope.currentIndex = index;
        };
        $scope.addUserType = function() {
                $state.go("index.usermng.addusertype");
        };
        $scope.clickedIndex;
        $scope.currentUserInfo;
            // 点击编辑
        $scope.onEditClick = function(tar){
            $scope.clickedIndex = tar.$index;
            $rootScope.editStudentsInfo = allStudentsInfo.info[$scope.clickedIndex];
            $state.go("index.usermng.detail");
         };
}]);

// 全部用户分类控制器
routerCtrls.controller('allUsersCtrl',function( $scope , AllUserInfosFactory){
    $scope.names = AllUserInfosFactory.userInfo;
});

// 全部班级控制器
routerCtrls.controller('classCtrl' , ['$rootScope','$scope','$state','allStudentsInfo','SUBJFac',
        function($rootScope,$scope,$state,allStudentsInfo,SUBJFac){
            var studentNumData = SUBJFac.countClassTeacherAndStudentsNum(allStudentsInfo); // 全局计算不同班级老师和学生对应的个数
            angular.forEach(studentNumData , function(data,index){ // 将计算出的各班人数，赋值给全局变量 $rootScope.classInfos
                $rootScope.classInfos[index].studentNum = data;
            });
        $scope.onClassDetailClick = function(classInfo){ // 点击班级详情
                var index = parseInt(classInfo.classType)-1;
                var studentNum = $rootScope.classInfos[index].studentNum; // 当前班级的人数

                if(studentNum == 0){ // 这个班没人了
                    $.confirm({
                        title: classInfo.name+' 班没人了',
                        //closeIcon: true,
                        //animation: 'rotateXR (reverse)',
                        //closeAnimation: 'scale',
                        icon: 'glyphicon glyphicon-heart',
                        content: '确定还要进去吗?',
                        confirmButtonClass: 'btn-info',
                        cancelButtonClass: 'btn-success',
                        confirmButton: '下一步有惊喜',
                        cancelButton: '取消',
                        cancel: function(){
                            //alert('before the modal is closed 在关闭之前回调');
                            //alert('催发了关闭按钮');
                        },
                        confirm: function () {
                            //alert('确定关闭');
                            $.alert({
                                title : '班级详情',
                                content : '跳转到班级详情页面',
                                confirmButtonClass: 'btn-success',
                                confirmButton: '好的再下一步',
                                onAction: function(){ // 点击确定之后的回调函数
                                    // action is either 'confirm', 'cancel' or 'close'
                                    //setTimeout(function(){
                                    //    $state.go('index.signup');
                                    //},500);
                                    $rootScope.classType = classInfo.classType;
                                    //console.log($rootScope.classDetails);
                                    $state.go('index.usermng.classdetail'); // 跳转到班级详情页面
                                }
                            });
                        }
                    });
                }else{
                    // 点到哪个班级就传哪个班级的type
                    $rootScope.classType = classInfo.classType;
                    $state.go('index.usermng.classdetail'); // 跳转到班级详情页面
                }
        };
}]);

// 班级详情
routerCtrls.controller('classDetailCtrl' , ['$rootScope','$scope','$state','allStudentsInfo',
        function($rootScope,$scope,$state,allStudentsInfo){
            $scope.hasStudent = true; // 刚开始都有学生
            $scope.classLocalInfo = {}; // 局部变量，班级页面的头部信息：班级名和老师名
            var index = Number($rootScope.classType)-1; // 班级数组的索引
            $scope.classLocalInfo.name = allStudentsInfo.classInfo[index].name;
            $scope.classLocalInfo.teacher = allStudentsInfo.classInfo[index].teacher;
            if($rootScope.classInfos[index].studentNum == 0){ // 这个班级详情有0个学生
                $scope.hasStudent = false; // 一个学生都没有了
                $.alert({
                    title: $scope.classLocalInfo.name+' 的悲哀',
                    //closeIcon: true,
                    //animation: 'rotateXR (reverse)',
                    //closeAnimation: 'scale',
                    icon: 'glyphicon glyphicon-heart',
                    content: $scope.classLocalInfo.teacher + ' 你们班木有学生了',
                    confirmButtonClass: 'btn-info',
                    //onClose: function(){
                    //    alert('before the modal is closed 在关闭之前回调');
                    //},
                    confirm: function () {
                        //alert('确定关闭');
                        $.alert({
                            title : $scope.classLocalInfo.name + '和' + $scope.classLocalInfo.teacher + ' 需要你',
                            content : '跳转到学生注册页面',
                            confirmButtonClass: 'btn-success',
                            onAction: function(){ // 点击确定之后的回调函数
                                // action is either 'confirm', 'cancel' or 'close'
                                setTimeout(function(){
                                    $state.go('index.signup');
                                },100);
                            }
                        });
                    }
                });
                //return false;
            }else{ // 存在学生
                $scope.classTypefilter = function(data){ // 根据班级的classType过滤
                    //return data.totalScore > 550; // 分数>500的结果保留
                    //return data.classType = '1'; // classType=1，即1班的学生保留
                    // 承接 classCtrl中变化后的全局 $rootScope.classType
                    if(data.classType == $rootScope.classType){ // 返回改班的学生数据
                        return data
                    }
                };
            }
            $scope.onReturnClassListClick = function(){ // 返回班级列表
                $state.go('index.usermng.allclass');
            };
}]);

// 学生详情页面
routerCtrls.controller('detailUsersCtrl' , ['$rootScope','$scope','$state','allStudentsInfo','SUBJFac',
        function($rootScope , $scope , $state , allStudentsInfo,SUBJFac){
            if($rootScope.editStudentsInfo == 'undefined' || $rootScope.editStudentsInfo == null){
                $rootScope.editStudentsInfo = allStudentsInfo.info[0];
            }
            // 返回上一页 全部学生列表
            $scope.onReturnBackClick = function(){
                $state.go('index.usermng.allstudents');
            };
            // 返回 学生注册
            $scope.onReturnSignUpClick = function(){
                $state.go('index.signup');
                SUBJFac.selectTopBarActive(3);// 学生注册 topbar-3
            };
}]);

// 光荣榜
routerCtrls.controller('honorCtrl' , ['$scope','allStudentsInfo',function($scope,allStudentsInfo){
    $scope.honorFilter = function(data){ // 过滤器
         return data.totalScore > 550; // 分数>500的结果保留
    };
}]);

// 补考名单
routerCtrls.controller('blackCtrl' , ['$scope',function($scope){
    $scope.blackFilter = function(data){ // 过滤器
            return data.totalScore < 400; // 分数<400的结果保留
    }
}]);

// 成绩管理
routerCtrls.controller('scoreCtrl' , ['$rootScope','$scope','$state','allStudentsInfo','SUBJFac',
    function($rootScope,$scope,$state,allStudentsInfo,SUBJFac){
            // 此链接ng鼠标移入/移出事件的下拉框： http://plnkr.co/edit/Ro80nR7HT7OGGPCXjz7E?p=preview
            // jq+bootstrap弹窗 ： http://www.html580.com/12067/demo

            $scope.word = '高->低 降序';
            $scope.flag = true;
            $scope.colName = 'name';//默认按name列排序
            $scope.birthDay = 'birthday';//默认按name列排序
            $scope.desc = 1;//默认排序条件 0-升序,1-降序
            $scope.scoreOrder = 'totalScore'; // 按分数排
            $scope.onOrderCheckClick = function(){ // 排序
                $scope.flag = !$scope.flag;
                //$scope.word =$scope.flag ? '高->低' : '低->高';
                if($scope.flag){
                    $scope.word = '高->低 降序';
                    $scope.desc = 1;
                }else{
                    $scope.word = '低->高 升序';
                    $scope.desc = 0;
                }
            };
            $scope.onEditClick = function(student,index){ // 点击进入编辑页面
                var studentIndex = student.index;
                $rootScope.arrIndex = index; // 全局的数组索引
                $rootScope.singleStudentInfo = allStudentsInfo.info[$rootScope.arrIndex];
                $state.go('index.edit');
            };
            //$('.popover-hide').popover('hide'); // bootstrap鼠标悬浮提示框
}]);

// 编辑
routerCtrls.controller('editCtrl' , ['$rootScope','$scope','$state','allStudentsInfo','SUBJFac',
        function($rootScope,$scope,$state,allStudentsInfo,SUBJFac){
            $('.popover-hide').popover('hide'); // tip鼠标悬浮提示
            if($rootScope.arrIndex==null || $rootScope.arrIndex == 'undefined'){
                $rootScope.arrIndex = 0;
            }
            $scope.editInfo = {}; // 编辑页面局部信息
            $scope.editInfo.score = allStudentsInfo.info[$rootScope.arrIndex].totalScore;
            $scope.editInfo.name = allStudentsInfo.info[$rootScope.arrIndex].name;
            $scope.editInfo.no = allStudentsInfo.info[$rootScope.arrIndex].no;
            $scope.editInfo.className = allStudentsInfo.info[$rootScope.arrIndex].className;

            $scope.classes = [
                {'className' : '高三(1)班','teacher' : '吴老师'},
                {'className' : '高三(2)班','teacher' : '刘老师'},
                {'className' : '高三(3)班','teacher' : '薛老师'},
                {'className' : '高三(4)班','teacher' : '孔老师'}
            ];
            $scope.editInfo.selectedClass;
            $scope.editInfo.birthday = allStudentsInfo.info[$rootScope.arrIndex].birthday;
            $scope.editInfo.nativePlace = allStudentsInfo.info[$rootScope.arrIndex].nativePlace;
            $scope.editInfo.tel = allStudentsInfo.info[$rootScope.arrIndex].tel;

            $scope.isShowInitClass = true; // 第一次显示初始班级
            $scope.onChangeClassOption = function(){ // 点击下拉框的交互
                $scope.isShowInitClass = false; // change事件后，班级改变
            };
            $scope.selectClassNameTeacherType = function(){ // 班级-老师-classType保持对应
                var myNewClassName; // 学生新的班级
                var myNewClassTeacher; // 学生新班级对应的新老师
                var myNewClassType; // 学生新班级的classType
                if($scope.isShowInitClass){ // 初始化班级
                    myNewClassName = allStudentsInfo.info[$rootScope.arrIndex].className; // 初始班级和老师都不变
                    myNewClassTeacher = allStudentsInfo.info[$rootScope.arrIndex].teacher;
                    myNewClassType = allStudentsInfo.info[$rootScope.arrIndex].classType;
                }else{ // change后的班级
                    myNewClassName = $scope.editInfo.selectedClass; // 新的班级和对应的新老师
                    if(myNewClassName == '高三(1)班'){ myNewClassTeacher = '吴老师'; myNewClassType = '1';}
                    if(myNewClassName == '高三(2)班'){ myNewClassTeacher = '刘老师'; myNewClassType = '2';}
                    if(myNewClassName == '高三(3)班'){ myNewClassTeacher = '薛老师'; myNewClassType = '3';}
                    if(myNewClassName == '高三(4)班'){ myNewClassTeacher = '孔老师'; myNewClassType = '4';}
                }
                $rootScope.singleStudentInfo.className = myNewClassName;
                $rootScope.singleStudentInfo.classType = myNewClassType;
                $rootScope.singleStudentInfo.teacher = myNewClassTeacher;
            };

            $scope.onScoreBlur = function(){
                //alert('$scope.editInfo.score : ' + $scope.editInfo.score);
                if($scope.editInfo.score > 750 || $scope.editInfo.score < 0){
                    $.alert({
                        title: '你输入的 ' + $scope.editInfo.score + ' 分不正确',
                        //closeIcon: true,
                        //animation: 'rotateXR (reverse)',
                        //closeAnimation: 'scale',
                        icon: 'glyphicon glyphicon-heart',
                        content: '分数必须在[0,750]之间',
                        confirmButtonClass: 'btn-info',
                        //onClose: function(){
                        //    alert('before the modal is closed 在关闭之前回调');
                        //},
                        confirm: function () {
                            //alert('确定关闭');
                            $('.js_score_edit').focus();
                        }
                    });
                    return false;
                }
            };

            $scope.onSubmitInfoClick = function(){ // 保存之前的修改

                $rootScope.singleStudentInfo.totalScore = $scope.editInfo.score;
                $rootScope.singleStudentInfo.name = $scope.editInfo.name;
                $rootScope.singleStudentInfo.no = $scope.editInfo.no;
                $rootScope.singleStudentInfo.birthday = $scope.editInfo.birthday;
                $rootScope.singleStudentInfo.nativePlace = $scope.editInfo.nativePlace;
                $rootScope.singleStudentInfo.tel = $scope.editInfo.tel;
                $scope.selectClassNameTeacherType();

                var studentNumData = SUBJFac.countClassTeacherAndStudentsNum(allStudentsInfo); // 全局计算不同班级老师和学生对应的个数
                angular.forEach(studentNumData , function(data,index){ // 将计算出的各班人数，赋值给全局变量 $rootScope.classInfos
                    $rootScope.classInfos[index].studentNum = data;
                });

                $.alert({
                    title: $scope.editInfo.name,
                    //closeIcon: true,
                    //animation: 'rotateXR (reverse)',
                    //closeAnimation: 'scale',
                    icon: 'glyphicon glyphicon-heart',
                    content: '信息修改成功!',
                    confirmButtonClass: 'btn-info',
                    //onClose: function(){
                    //    alert('before the modal is closed 在关闭之前回调');
                    //},
                    //confirm: function () {
                    //    //alert('确定关闭');
                    //}
                    onAction: function(){ // 点击确定之后的回调函数
                        // action is either 'confirm', 'cancel' or 'close'
                        setTimeout(function(){
                            //alert(' was clicked 关闭之后回调 跳转到成绩管理页面');
                        },500);
                    }
                });
            };

            $scope.hasDeleted = false; // 是否已经删除了当前信息

            $scope.onResetInfoClick = function(){ // 清空之前的修改
                $scope.editInfo.score = allStudentsInfo.info[$rootScope.arrIndex].totalScore;
                $scope.editInfo.name = allStudentsInfo.info[$rootScope.arrIndex].name;
                $scope.editInfo.no = allStudentsInfo.info[$rootScope.arrIndex].no;
                $scope.editInfo.birthday = allStudentsInfo.info[$rootScope.arrIndex].birthday;
                $scope.editInfo.nativePlace = allStudentsInfo.info[$rootScope.arrIndex].nativePlace;
                $scope.editInfo.tel = allStudentsInfo.info[$rootScope.arrIndex].tel;
                $scope.editInfo.selectedClass = allStudentsInfo.info[$rootScope.arrIndex].className; // 回到初始班级
                $scope.editInfo.teacher = allStudentsInfo.info[$rootScope.arrIndex].teacher; // 回到初始化班级
                $.alert({
                    //title: false,
                    title: '已恢复到上一级修改的状态',
                    confirmButtonClass: 'btn-success',
                    //content: '信息修改成功!',
                    content: false,
                    animationBounce: 1.5 // default is 1.2 whereas 1 is no bounce.
                });
            };
            $scope.onReturnScoreClick = function(){ // 返回成绩管理页面
                $state.go('index.score');
            };

            var count = 0;
            $scope.onDeleteInfoClick = function(){ // 删除当前信息
                // 点击删除后，重置/保存 按钮为禁用
                $scope.hasDeleted = true;
                count += 1;
                if(count == 1){
                    var name = allStudentsInfo.info[$rootScope.arrIndex].name;
                    // 删除点击的 第 index个索引的那个元素
                    allStudentsInfo.info.splice($rootScope.arrIndex, 1);
                    // 每次删除一个元素后，更新全局的学生数组
                    $rootScope.students = allStudentsInfo.info;
                    $.alert({
                        title: '删除提示',
                        confirmButtonClass: 'btn-success',
                        content: name + ' 已成功删除!',
                        //content: false,
                        animationBounce: 1.5, // default is 1.2 whereas 1 is no bounce.
                        onAction: function(action){
                            // action is either 'confirm', 'cancel' or 'close'
                            var imgObj = "<div class='col-md-12'>" +
                                "<img src='http://pic.uuhy.com/uploads/2011/08/01/github.jpg' style='width: 100%' />" +
                                "</div>";
                            //$('.js_edit_wrap_top').append(imgObj);
                            $('.js_edit_wrap_top').html(imgObj);
                            $('.button-wrap').before("<br/><br/><br/><br/>")
                        }
                    });
                }else{
                    $.alert({
                        title: '重复删除，无效',
                        //title: '已恢复到上一级修改的状态',
                        confirmButtonClass: 'btn-success',
                        content: '该用户已删除不能再删，返回成绩管理',
                        //content: false,
                        animationBounce: 1.5, // default is 1.2 whereas 1 is no bounce.
                        onAction: function(action){
                            // action is either 'confirm', 'cancel' or 'close'
                            setTimeout(function(){
                                $state.go('index.score');
                            },100);
                        }
                    });
                }
            };
}]);

// 学生注册
routerCtrls.controller('signupCtrl' , ['$rootScope','$scope','$state','allStudentsInfo','SUBJFac',
        function($rootScope,$scope,$state,allStudentsInfo,SUBJFac){
            // 链接 http://www.tuicool.com/articles/2Qbiqi
            // 链接 http://www.cnblogs.com/rohelm/p/4033513.html
            $scope.signUpInfo = {}; // 新注册的用户信息对象
            $scope.signUpInfo.totalScore = '';
            $scope.signUpInfo.name = '';
            $scope.signUpInfo.sex = '男'; // 性别radio单选框，默认为man
            $scope.signUpInfo.no = ''; // 学号
            $scope.signUpInfo.className = '高三(1)班'; // 班级
            $scope.signUpInfo.teacher; // 班级对应的老师
            $scope.signUpInfo.birthday = ''; // 生日
            $scope.signUpInfo.nativePlace = ''; // 籍贯
            $scope.signUpInfo.tel = ''; // 电话
            $scope.signUpInfo.classType; // 班级类型-1/2/3/4班
            $scope.signUpInfo.index = '2'; // 通过数组长度计算
            // 默认头像
            $scope.signUpInfo.avatar = 'http://www.qq1234.org/uploads/allimg/150113/1AI02408-17.jpg';

            $scope.selectClassTypeAndTeacher = function(){ // 选择学生的班级和对应老师
                if($scope.signUpInfo.className == '高三(1)班'){
                    $scope.signUpInfo.teacher = '吴老师';
                    $scope.signUpInfo.classType = '1';
                }else if($scope.signUpInfo.className == '高三(2)班'){
                    $scope.signUpInfo.teacher = '刘老师';
                    $scope.signUpInfo.classType = '2';
                }else if($scope.signUpInfo.className == '高三(3)班'){
                    $scope.signUpInfo.teacher = '薛老师';
                    $scope.signUpInfo.classType = '3';
                }else{
                    $scope.signUpInfo.teacher = '孔老师';
                    $scope.signUpInfo.classType = '4';
                }
            };


            $scope.isShowBar = false; // 是否显示进度条
            $scope.scoreAlertFn = function(strTip,callBack){ // 清空分数inp，并获取焦点
                $.alert({
                    title: strTip.title,
                    //title: '已恢复到上一级修改的状态',
                    confirmButtonClass: 'btn-success',
                    content: strTip.content,
                    //content: false,
                    animationBounce: 1.5, // default is 1.2 whereas 1 is no bounce.
                    onAction: function(action){ // 点击确定之后的回调
                        // action is either 'confirm', 'cancel' or 'close'
                        if(callBack && callBack != null){
                            callBack();
                        }
                    }
                });
            };

            // 点击提交注册信息
            $scope.saveFormClick = function(){
                var strTip = {};
                if($scope.signUpInfo.totalScore == ''){
                    strTip.title = '1. 分数';
                    strTip.content = '请填写分数';
                    $scope.scoreAlertFn(strTip);
                }else if($scope.signUpInfo.name == ''){
                    strTip.title = '2. 姓名';
                    strTip.content = '请填写姓名';
                    $scope.scoreAlertFn(strTip);
                }else if($scope.signUpInfo.no == ''){
                    strTip.title = '4. 学号';
                    strTip.content = '请填写学号';
                    $scope.scoreAlertFn(strTip);
                }else if($scope.signUpInfo.birthday == ''){
                    strTip.title = '5. 生日';
                    strTip.content = '请填写生日';
                    $scope.scoreAlertFn(strTip);
                }else if($scope.signUpInfo.nativePlace == ''){
                    strTip.title = '6. 籍贯';
                    strTip.content = '请填写籍贯';
                    $scope.scoreAlertFn(strTip);
                }else if($scope.signUpInfo.tel == ''){
                    strTip.title = '7. 电话';
                    strTip.content = '请填写电话';
                    $scope.scoreAlertFn(strTip);
                }else{ // 注册成功
                    $scope.selectClassTypeAndTeacher(); // 提交时，选中老师名字和对应的班级类型
                    $scope.isShowBar = !$scope.isShowBar; // 出现进度条
                    allStudentsInfo.info.push($scope.signUpInfo); // 将新用户追加到原来的数组最后

                    // 全局计算不同班级老师和学生对应的个数
                    var studentNumData = SUBJFac.countClassTeacherAndStudentsNum(allStudentsInfo);
                    angular.forEach(studentNumData , function(data,index){ // 将计算出的各班人数，赋值给全局变量 $rootScope.classInfos
                        $rootScope.classInfos[index].studentNum = data;
                    });
                    $scope.alertProgressBarSuccessBackFn = function(){
                        $.alert({
                            title: $scope.signUpInfo.name + ' 成功注册',
                            //title: '已恢复到上一级修改的状态',
                            confirmButtonClass: 'btn-success',
                            content: '该用户已经成功注册',
                            //content: false,
                            animationBounce: 1.5, // default is 1.2 whereas 1 is no bounce.
                            confirm: function(){
                                //alert('更换成功注册之后的相亲视图');
                                $scope.isShowBar = !$scope.isShowBar; // 隐藏进度条
                                $.alert({
                                    title: '跳转页面',
                                    //title: '已恢复到上一级修改的状态',
                                    confirmButtonClass: 'btn-info',
                                    content: '进入学生详情页面',
                                    //content: false,
                                    animationBounce: 1.5,
                                    onAction: function(action){ // 点击确定之后的回调，跳转到学生详情
                                        setTimeout(function(){
                                            if($rootScope.editStudentsInfo == 'undefined' || $rootScope.editStudentsInfo == null){
                                                $rootScope.editStudentsInfo = allStudentsInfo.info[allStudentsInfo.info.length-1];
                                            }
                                            $state.go('index.usermng.detail'); // 学生详情
                                            SUBJFac.selectTopBarActive(1);// 班级管理 topbar-1
                                        },50);
                                    }
                                });
                            }
                        });
                    };
                    var progressLen = 20;
                    var timer = setInterval(function(){
                        progressLen += 30;
                        $('.js_bar_len').css({
                            'width' : progressLen + '%'
                        });
                        if(progressLen >= 100){ // 进度条到达100%，
                            clearInterval(timer);
                            setTimeout(function(){
                                $scope.alertProgressBarSuccessBackFn(); // 回调弹窗视图的逻辑
                            },1100);
                        }
                    },100);
                }
            };

            // 分数输入框失去焦点
            $scope.onBlurScore = function(){
                $scope.callBackFn = function(){
                    setTimeout(function(){
                        $scope.signUpInfo.totalScore = '';
                        $('.js_score_inp').focus();
                    },100);
                };
                var strTip = {};
                if($scope.signUpInfo.totalScore == ''){
                    strTip.title = '分数tip1';
                    strTip.content = '并没有输入分数，请重输';
                    $scope.scoreAlertFn(strTip,$scope.callBackFn);
                }else if($scope.signUpInfo.totalScore < 0){
                    strTip.title = '分数tip2';
                    strTip.content = '分数小于0分，重修';
                    $scope.scoreAlertFn(strTip,$scope.callBackFn);
                }else if($scope.signUpInfo.totalScore > 750){
                    strTip.title = '分数tip3';
                    strTip.content = '超过满分750了，你可以上常青藤，不科学';
                    $scope.scoreAlertFn(strTip,$scope.callBackFn);
                }
            };

            // 返回成绩列表
            $scope.returnScoreListClick = function(){
                $state.go('index.score');
                SUBJFac.selectTopBarActive(2); // 成绩管理 topbar-2
            };
            // 返回班级列表
            $scope.returnClassListClick = function(){
                $state.go('index.usermng.allstudents');
                SUBJFac.selectTopBarActive(1);// 班级管理 topbar-1
            };
}]);

// 个人中心
routerCtrls.controller('userInfoCtrl',['$rootScope','$scope','$timeout',
   function($rootScope,$scope,$timeout){
   //$scope.userFilter = function(data){ // 过滤器
   //    return data.totalScore > 450; // 分数>500的结果保留
   //};
   $scope.myKeyup = function(e){
       var keycode = window.event?e.keyCode:e.which;
       if(keycode==13){ // 回车键键值为13
           //alert('你按下的回车键' + keycode);
           alert($scope.selectName);
       }
   };
  /**/
  $scope.selectName;
  var timer; // 监听输入框值的变化
  $scope.$watch('selectName',function(selectName){//selectName->输入框中的值
       if(selectName){
          if(timer){
              $timeout.cancel(timer); // 防止页面重复请求
          }
          timer = $timeout(function(){
              angular.forEach($rootScope.students,function(data,value){
                 if(data.totalScore){
                     //data.totalScore = Number(data.totalScore);
                     //selectName = Number(selectName);
                 }
              });
              $scope.selectName = selectName;
          },400);
       }
  });
  
}]);

});