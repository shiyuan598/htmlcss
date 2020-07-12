const gulp = require('gulp');

// 0.任务前先清除目录
const del = require('del');
gulp.task('clean', function(cb){
  return del(['./dist'], cb)
})

// 注意：
// 每个任务都返回一个stream, 将会保证clean在任一个任务开始之前完成
// clean并不会被执行两次，尽管它被作为依赖调用了两次

// 1.html
const htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
  return gulp
    .src('./src/index.html')
    .pipe(
      htmlmin({
        // collapseWhitespace: true, // 去掉空格
        removeAttributeQuotes: true, // 删除属性的引号
      })
    )
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
});

// 2.静态文件
gulp.task('images', function () {
  return gulp
    .src('./srcimg/**/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

// 3.copy多个文件到一个目录
// ! 可以排除一些文件
gulp.task('data', function () {
  return gulp
    .src(['./src/json/*.json', './src/xml/*.xml', '!./src/xml/old.xml'])
    .pipe(gulp.dest('dist/data/'))
    .pipe(connect.reload());
});

// 4.添加插件  sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp
    .src('./src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'))
    .pipe(connect.reload());
});

// 5.压缩css插件 及重命名
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('cssmin', ['sass'], function () {
  return gulp
    .src('./src/css/*.css')
    .pipe(concat('index.css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

// 6.处理js文件
// 合并文件 压缩js文件
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp
    .src('./src/scripts/*.js')
    .pipe(concat('index.js'))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});



// 7.inject 把压缩后的css和js注入到html中
var inject = require('gulp-inject');
gulp.task(
  'inject', ['html', 'images', 'data', 'cssmin', 'js'],
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
      .pipe(gulp.dest('./dist/'))
      .pipe(connect.reload());
  }
)

// inject说明：
// 1.在html中需要标记插入位及文件类型
//   < !--inject: css-- >
//   <!-- endinject-->


// default 默认任务
gulp.task(
  'default', ['inject'],
  function () {
    return gulp.src('./dist/**/*.*')
  }
)

// default 默认任务
gulp.task('build', ['clean', 'default'], function () {
  console.info('build done!')
});

// 8.任务监听
// 启动服务器
const connect = require('gulp-connect');
const open = require('open');
gulp.task('server', ['default'], function () {
  connect.server({
    root: 'dist/',
    port: 9001,
    livereload: true, // 实时刷新
  });
  // 注意：需要在各个子任务中添加connect配合

  // 打开浏览器
  open('http://localhost:9001/');

  // 监听文件
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/style/**/*.scss', ['sass', 'cssmin']);
  gulp.watch('./src/img/**/*', ['images']);
  gulp.watch(['./src/json/*.json', './src/xml/*.xml', '!./src/xml/old.xml'], ['data']);
  gulp.watch('./src/scripts/*.js', ['js']);
});
