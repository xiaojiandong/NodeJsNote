

var gulp = require('gulp');
var less = require('gulp-less'); // 编译.less文件
var htmlmin = require('gulp-htmlmin'); // 压缩html
var minifycss = require('gulp-minify-css'); // 压缩.css
var uglify = require('gulp-uglify'); // 压缩.js
var del = require('del'); // 清除之前的文件
var imagemin = require('gulp-imagemin');// 图片压缩
var livereload = require('gulp-livereload'); //文件监听

// 压缩编译less文件
gulp.task('cssmin' , function(){
   gulp.src('./css/*.less')
   .pipe(less())
   .pipe(minifycss())
   .pipe(gulp.dest('./lib/css'))
   .pipe(livereload({start:true})); // 文件监听
});

// 压缩/监听html文件
gulp.task('htmlmin',function(){
 gulp.src(['./tpls/*.html','index.html'])
     .pipe(htmlmin())
     .pipe(gulp.dest('./lib/html'))
     .pipe(livereload({start:true}));
});


//监听js文件
gulp.task('jsmin',function(){
  //gulp.src('./js/**/*.js')
    gulp.src(['./js/controllers.js',
        './js/services.js',
        'index.js'
    ])
      .pipe(uglify())
      .pipe(gulp.dest('./lib/js'))
      .pipe(livereload({start:true}));
});

// 创建任务clean，用于清除之前生成的文件
gulp.task('clean' , function(cb){
    //del(['lib/css','lib/js'] , cb)  // 之前生成的各种文件
  return del(['./lib'],cb); // 同步加载clean任务，删除lib里面全部的文件
}) ;

gulp.task('default',['clean'],function(){
  gulp.start(['cssmin','jsmin','htmlmin']);
});

gulp.task('watch' , function(){
    livereload.listen();
    // 监听开发路径文件的变化，并执行该任务style
    gulp.watch('./css/*.less',['cssmin']);
    gulp.watch('.js/**/*.js',['jsmin']);
    gulp.watch(['./tpls/*.html','index.html'],['htmlmin']);
});