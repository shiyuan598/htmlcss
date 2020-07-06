// commonJS规范
// 1.require()导入模块
// 2.使用模块上的命令


// 控制台，gulp task名 运行任务

const gulp = require('gulp');

// 编写任务，参数：名称，回调函数
gulp.task('hello', function () {
  console.info('Hello WOrld!')
})

// gulp.src() // 找到资源文件
// gulp.dist() // 目的文件
// pipe() // 运行管道

// 1.html
gulp.task('copy-html', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
})

// 2.静态文件
gulp.task('images', function () {
  // return gulp.src('img/*.{jpg,png,ico}').pipe(gulp.dest('dist/images'))
  return gulp.src('img/**/*').pipe(gulp.dest('dist/images'));
})

// 3.copy多个文件到一个目录
// ! 可以排除一些文件
gulp.task('data', function () {
  return gulp.src(['json/*.json', 'xml/*.xml', '!xml/old.xml'])
  .pipe(gulp.dest('dist/data'))
})

// 4.一次执行多个任务
gulp.task('build', ['copy-html', 'images', 'data'], function () {
  console.info('任务执行完毕！')
})

// 5.任务监听
// 文件改变，会自动执行任务
gulp.task('watch', function () {
  gulp.watch('index.html', ['copy-html'])
  gulp.watch('img/**/*', ['images']);
  gulp.watch(['json/*.json', 'xml/*.xml', '!xml/old.xml'], ['data']);
})

// 6.添加插件  sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp
    .src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

// 7.压缩css插件 及重命名
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('sass-min', function () {
  return gulp
    .src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

// 8.处理JS文件
// 合并文件 压缩JS文件
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('JS', function () {
  return gulp.src('js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('dist/js'))
})

// 5.任务监听
// 文件改变，会自动执行任务
gulp.task('watch', function () {
  gulp.watch('index.html', ['copy-html'])
  gulp.watch('img/**/*', ['images']);
  gulp.watch(['json/*.json', 'xml/*.xml', '!xml/old.xml'], ['data']);
  gulp.watch('js/*.js', ['JS'])
})

// 9.启动服务器
const connect = require('gulp-connect');
gulp.task('server', function () {
  connect.server({
    root: 'dist',
    port: 9001,
    livereload: true // 实时刷新
  })
})

// 10.默认任务，cmd中不需写任务名
gulp.task('default', ['watch', 'server'])



