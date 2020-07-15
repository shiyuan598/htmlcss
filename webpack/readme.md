#webpack
安装
`cnpm i webpack webpack-cli -D`
###1.基本配置
  1. 命令行使用
  `npx webpack --entry=./src/index.js --output-filename=bundle.js --mode=development`
  *由于是本地安装，所以需要使用npx命令*
  *默认入口文件为src/index.js，因此可以省略--entry=./src/index.js *
  2. **package.json**中使用,默认输出目录为/dist
  `"scripts": {
    "build": "webpack --output-filename=bundle.js --mode=development"
  }`
  3. 使用配置文件
  webpack.config.js
  4. webpack-dev-server
  **package.json**中增加dev配置
  `"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  }`
  **webpack.config.js**中增加配置
  `devServer: {
    publicPath: './dist'
  }`
###2.loader
  1. css-loader、style-loader
  **css-loader**处理css,**style-loader**把结果载入页面
  loader从右往左执行，也可以使用**enforce**配置，如pre、post
  2. babel-loader
  `cnpm i babel-loader @babel/core @babel/preset-env -D`
  **webpack.config.js**中增加配置
  `{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['@babel/env', {
              modules: false
            }]
          ]
        }
      }]
    }`
  3. html-loader、handlebars-loader
  4. file-loader、url-loader
  打包文件类型的资源,如图片
  url-loader的作用相同，但可以设置文件大小阈值，不超过阈值返回base64编码
  5. vue-loader
###3.样式处理
  1.分离样式文件
    专门用于提取样式到CSS文件的插件：
    **mini-css-extract-plugin**用于webpack4.0及以上
    **extract-text-webpack-plugin**用于webpack4.0以下
  2.样式预处理
    sass-loader
    less-loader
  3.PostCSS
    **postcss-loader**需要添加postcss.config.js配置文件
    **postcss-loader**配合插件使用:
    3.1**autoprefixer** 自动前缀
    3.2**stylelint** 检查css
    3.3**postcss-cssnext** 解析新语法
    *postcss.config.js*配置文件内容如下:
    `const autoprefixer = require('autoprefixer');
    const stylelint = require('stylelint');
    const postcssCssnext = require('postcss-cssnext');
    module.exports = {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'not ie <= 8',
            'iOS >= 8',
            'Firefox >= 20',
            'Android > 4.4'
          ]
        }),
        stylelint({
          config: {
            rules: {
              'declaration-no-important': true
            }
          }
        }),
        postcssCssnext({
          browsers: [
            '> 1%',
            'last 2 versions'
          ]
        })
      ]
    }`
###4.代码分片code splitting