const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');
const pngquant = require('gulp-pngquant');
const changed = require('gulp-changed');
const inject = require('gulp-inject');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');

// 0.删除
gulp.task('clean', function (cb) {
  return del(['dist/*', '!dist/images'], cb);
});

// 1.注册任务-js
gulp.task('js', function () {
  return gulp
    .src('src/js/**/*.js') // 找到目标文件读取到内存中，**/* 遍历子目录
    .pipe(concat('build.js')) // 临时合并
    .pipe(gulp.dest('./dist/js/')) // 输出目录
    .pipe(uglify()) // 压缩文件
    .pipe(rename({ suffix: '.min' })) // 重命名，suffix后缀名
    .pipe(gulp.dest('./dist/js/'))
    .pipe(reload({ stream: true }));
})

// 2.注册任务-less
gulp.task('less', function () {
  return gulp
    .src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css/')) // 因为后面要合并及压缩，所以输出到src/css目录
    .pipe(reload({ stream: true }));
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
    .pipe(reload({ stream: true }));
})

// 4.注册任务-html
gulp.task('html', function () {
  return gulp
    .src('./src/index.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      })
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true }));
})

// 5.压缩图片
gulp.task('image', function () {
  return gulp
    .src('./src/images/*.*')
    .pipe(
      imageMin({
        progressive: true, // 无损压缩JPG图片
        svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
        use: [pngquant()], // 使用pngquant插件进行深度压缩
      })
    )
    .pipe(gulp.dest('dist/images'))
    .pipe(reload({ stream: true }));
})

// 6.inject 把压缩后的css和js注入到html中
gulp.task('inject', gulp.series(['js', 'less', 'css', 'html', 'image'], function () {
  return gulp
    .src('./dist/index.html') // 获取该文件的数据
    .pipe(
      inject(
        gulp.src(['./dist/js/build.min.js', './dist/css/style.min.css'], {
          // 让获取的流被 inject 操作一次：把指定文件注入到流文件中
          read: false, // 该参数默认为ture,此处fasle也就是并不会去读取文件
        }),
        {
          relative: true, // Injecting files relative to target files
        }
      )
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true }));
    }
    
  )
)

// 7.注册监听任务
// 启动服务器
gulp.task('serve', gulp.series('inject', function () {
  browserSync({
    port: 9001,
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('./src/js/**/*.js', gulp.series('js')); //监控文件变化，自动更新
  gulp.watch('./src/less/**/*.less', gulp.series('less'));
  gulp.watch('./src/css/**/*.css', gulp.series('css'));
  gulp.watch('./src/index.html', gulp.series('html'));
  gulp.watch('./src/images/*.*', gulp.series('image'));
}));


// // 8.注册默认任务
// gulp.task('default', ['server']);





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
