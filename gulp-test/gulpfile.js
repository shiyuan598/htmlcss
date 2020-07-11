const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const livereload = require('gulp-livereload');

// 1.注册任务-js
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js') // 找到目标文件读取到内存中，**/* 遍历子目录
    .pipe(concat('build.js')) // 临时合并
    .pipe(gulp.dest('./dist/js/')) // 输出目录
    .pipe(uglify()) // 压缩文件
    .pipe(rename({ suffix: '.min' })) // 重命名，suffix后缀名
    .pipe(gulp.dest('./dist/js/'))
})

// 2.注册任务-less
gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css/')) // 因为后面要合并及压缩，所以输出到src/css目录
})

// 3.注册任务-css
gulp.task('css', function () {
  return gulp
    .src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'))
})

// 4.注册任务-html
gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }))
    .pipe(gulp.dest('./dist/'))
})

// 5.注册默认任务
gulp.task(
  'default',
  gulp.series(['js', 'less', 'css', 'html'], async () => {
    await console.log('Done!');
  })
);

// 6.注册监听任务
gulp.task('watch', gulp.series(['default']), function () {
  livereload.listen();
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/css/**/*.css', ['css'])
  gulp.watch('./src/index.html', ['html'])
});






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
