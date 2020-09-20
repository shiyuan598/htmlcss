const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const inject = require('gulp-inject');

// 2.注册任务-less
gulp.task('less', function () {
  return gulp
    .src('src/less/**/*.less')
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
gulp.task('html', function (done) {
  return gulp
    .src('./src/index.html')
    .pipe(
      htmlmin({
        // collapseWhitespace: true,
        removeAttributeQuotes: false
      })
    )
    .pipe(gulp.dest('./dist/'))
})

gulp.task('inject', () => {
  return gulp
    .src('./dist/index.html')
    .pipe(
      inject(gulp.src(['./dist/css/*.min.css'], { read: false }), {
        relative: true,
      })
    )
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', gulp.series(['html', gulp.series(['less', 'css']), 'inject']), (done) => {
  done()
})

// // 6.inject 把压缩后的css和js注入到html中
// gulp.task(
//   'inject',
//   gulp.series('clean', gulp.parallel(['js', gulp.series(['less', 'css']), 'html', 'image']), function () {
//     return gulp
//       .src('./dist/index.html') // 获取该文件的数据
//       .pipe(
//         inject(
//           gulp.src(['./dist/js/build.min.js', './dist/css/style.min.css'], {
//             // 让获取的流被 inject 操作一次：把指定文件注入到流文件中
//             read: false, // 该参数默认为ture,此处fasle也就是并不会去读取文件
//           }),
//           {
//             relative: true, // Injecting files relative to target files
//           }
//         )
//       )
//       .pipe(gulp.dest('./dist/'))
//   })
// );


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
