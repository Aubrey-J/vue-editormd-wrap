const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: process.env.NODE_ENV === 'production' ?  './src/index.js' : '../src/main.js',
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: '/src/',
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