const gulp = require('gulp');

// 0.任务前先清除目录
const del = require('del');
gulp.task('clean', function(cb){
  return del (['./dist'], cb)
})

// 注意：
// 每个任务都返回一个stream, 将会保证clean在任一个任务开始之前完成
// clean并不会被执行两次，尽管它被作为依赖调用了两次

// 1.html
const htmlmin = require('gulp-htmlmin');
gulp.task('html', ['clean'], function () {
  return gulp
    .src('./index.html')
    .pipe(
      htmlmin({
        // collapseWhitespace: true, // 去掉空格
        removeAttributeQuotes: true, // 删除属性的引号
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// 2.静态文件
gulp.task('images', ['clean'], function () {
  return gulp.src('img/**/*.*').pipe(gulp.dest('dist/images'));
});

// 3.copy多个文件到一个目录
// ! 可以排除一些文件
gulp.task('data', ['clean'], function () {
  return gulp
    .src(['json/*.json', 'xml/*.xml', '!xml/old.xml'])
    .pipe(gulp.dest('dist/data/'));
});

// 4.添加插件  sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', ['clean'], function () {
  return gulp
    .src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

// 5.压缩css插件 及重命名
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('cssmin', ['sass', 'clean'], function () {
  return gulp
    .src('./dist/css/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css/'));
});

// 6.处理js文件
// 合并文件 压缩js文件
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('js', ['clean'], function () {
  return gulp
    .src('js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

// 7.inject 把压缩后的css和js注入到html中
var inject = require('gulp-inject');
gulp.task(
  'inject', ['html', 'images', 'data', 'cssmin', 'js', 'clean'],
  function () {
    return gulp
      .src('./dist/index.html') // 获取该文件的数据
      .pipe(
        inject(
          gulp.src(['./dist/js/index.min.js', './dist/css/index.min.css'], {
            // 让获取的流被 inject 操作一次：把指定文件注入到流文件中
            read: false, // 该参数默认为ture,此处fasle也就是并不会去读取文件
          }),
          {
            relative: true, // Injecting files relative to target files
          }
        )
      )
      .pipe(gulp.dest('./dist/'));
  }
)

// inject说明：
// 1.在html中需要标记插入位及文件类型
//   < !--inject: css-- >
//   <!-- endinject-->


// 8.任务监听
// 文件改变，会自动执行任务
const livereload = require('gulp-livereload');
gulp.task('watch', ['inject'], function () {
  // 开启监听
  livereload.listen()
  // 确认监听目标及绑定相应任务
  gulp.watch('index.html', ['html'])
  gulp.watch('style/**/*.scss', ['sass', 'cssmin'])
  gulp.watch('img/**/*', ['images']);
  gulp.watch(['json/*.json', 'xml/*.xml', '!xml/old.xml'], ['data']);
  gulp.watch('js/*.js', ['js'])
})

// 9.启动服务器
const connect = require('gulp-connect');
gulp.task('server', ['inject'], function () {
  connect.server({
    root: 'dist/',
    port: 9001,
    livereload: true, // 实时刷新
    open: true // 自动打开浏览器
  })
})

const browserSync = require('browser-sync');
gulp.task('browserSync', ['inject'], function () {
  browserSync.init({
    server: './',
    port: 9002,
    files: ['/dist/**/*.*'],
  });
});
