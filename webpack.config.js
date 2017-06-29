var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [
    //use template.ejs file to generate index.html file in dist folder
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/template.ejs`
    }),
    // copy libs folder from src to dist
    new TransferWebpackPlugin([
      { from: 'libs', to: 'libs' }
    ], path.join(__dirname, '/react-client/src'))
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};