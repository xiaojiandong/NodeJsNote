
require.config({
   //'baseUrl' : '../bargain/js/', // 开发环境放开
   'baseUrl' : './lib/js/', // 压缩环境放开
   'paths' : {
     'jquery' : 'http://cdn.bootcss.com/jquery/2.1.3/jquery.min',
     'jquery_confirm' : 'http://cdn.bootcss.com/jquery-confirm/2.0.0/jquery-confirm.min',
     'bootstrap' : 'http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min',
     'angular' : 'angular-1.3.0',
     'angular_animate' : 'angular-animate',
     'router' : 'angular-ui-router',
     'base' : 'base',
     'controllers' : 'controllers',
     'services' : 'services'
   },
   'shim' : {
      'jquery' : {
          'exports' : 'jquery'
      },
      'jquery_confirm' : {
          'deps' : ['jquery'],
          'exports' : 'jquery_confirm'
      },
      'bootstrap' : {
          'deps' : ['jquery'],
          'exports' : 'bootstrap'
      },
      'angular_animate' : {
          'deps' : ['angular'],
          'exports' : 'angular_animate'
      },
      'router' : { // router依赖angular
          'deps' : ['angular'],
          'exports' : 'router'
      }
   },
    urlArgs: "bust=" + (new Date()).getTime() // 防止读取缓存，调试用
});

require(
    [   'jquery',
        'jquery_confirm',
        'bootstrap',
        'angular',
        'angular_animate',
        'router',
        'base',
        'controllers',
        'services'
    ],
    function(
        jquery,
        jquery_confirm,
        bootstrap,
        angular,
        angular_animate,
        router,
        base,
        controllers,
        services){
});