
seajs.config({
  base : './js/common/', // 公共模块或插件路径
  alias : {
      'jquery' : 'jquery.2.1.3.min',
      'subj' : 'subj',
      'bootstrap' : 'bootstrap.min',
      'jquery-confirm' : 'jquery-confirm.min',
      'angular' : 'angular-1.3.0',
      'backbone' : 'backbone',
      'swiper' : 'swiper.3.3.0.min'
  },
  debug : true,
  charset: 'utf-8'
});