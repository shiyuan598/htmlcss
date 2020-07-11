const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');

// 注册任务-js
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js') // 找到目标文件，读取到内存中
    .pipe(concat('build.js')) // 临时合并
    .pipe(gulp.dest('./dist/js/')) // 输出目录
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'))
})

// 注册任务-less
gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css/'))
})

// 注册任务-css
gulp.task('css', function () {
  return gulp
    .src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssClean({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'))
})


// 注册默认任务
gulp.task(
  'default',
  gulp.series('js', async () => {
    await console.log('Done!');
  })
);

// 常用插件
// gulp-concat  js / css 合并
// gulp-uglify  压缩js
// gulp-rename 重命名
// gulp-less 编译less
// gulp-clean-css 压缩css
// gulp-livereload 实时自动编译刷新

// 重要API
// src 源文件夹
// dest 目标文件夹
// task 注册任务
// watch 监听文件
