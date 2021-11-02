const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 该插件可以在component之前自定义属性，所以直接引用插件页面，用户自行注册，不编译入口js
  entry: process.env.NODE_ENV === 'production' ?  './src/views/vueEditorMdWrap.vue' : '../src/main.js',
  output: {
    path: path.resolve(__dirname, '../src'),
    // publicPath: '/src/',
    filename: 'vueEditorMdWrap.js',
    library: 'VueEditorMdWrap',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  ]
}