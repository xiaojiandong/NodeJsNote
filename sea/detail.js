
define(function(require,exports,module){
    /**
     * sea.js遵循CMD规范
     * 按需引入模块
     * 公共模块：subj.jquery
     */
    var $ = require('jquery');
    //var $ = require('./js/common/jquery.2.1.3.min.js');
    require('swiper');
    /**
     * jquery插件依赖问题
     * 文档：https://segmentfault.com/q/1010000002408487
     * 解决方案：
     *    在本地的jquery.min.js源码的后面加上
     *    首先找到这段： "function"==typeof define&&define.amd&&define("jquery",[],function(){return n})
     *    并且在这段后面加上："function"==typeof define&&define.cmd&&define("jquery",[],function(){return n})
     */
    setTimeout(function(){

    },20);
    require('jquery-confirm'); // jquery插件

    var subj = require('subj'); //工具类
    console.log('按需引入模块 - '+subj.subjStr);

    console.log($); // 有效打印

    // 测试jquery和jquery-confirm
    $('.js_test').on('click',function(){
        $.alert({
            title: '点击了',
            content: '这里是jquery-confirm插件的内容',
            confirmButtonClass: 'btn-primary',
            confirmButton: '好的呢'
            //confirm: function(){
            //    $.alert('Confirmed!'); // shorthand.
            //}
        });
    });

});