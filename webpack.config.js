var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'frontend.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {test: /\/node_modules\/rx\/$/, loaders: ['imports?define=>false']},
      {test: /\.js$/, exclude: [/\/node_modules\//], loaders: ['babel']},
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    filename: 'frontend.js',
    publicPath: '/',
  },
}
