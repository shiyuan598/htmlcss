const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const postcssCssnext = require('postcss-cssnext');
module.exports = {
  plugins: [
    // autoprefixer({
    //   overrideBrowserslist: [
    //     '> 1%',
    //     'last 2 versions',
    //     'not ie <= 8',
    //     'iOS >= 8',
    //     'Firefox >= 20',
    //     'Android > 4.4'
    //   ]
    // }),
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
}