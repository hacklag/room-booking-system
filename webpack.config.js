var path = require('path');
var packageJSON = require('./package.json');
var webpack = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

var config =  {
  target: 'web',
  cache: true,
  entry: {
    app: [path.resolve(__dirname, './src/app.jsx')],
    vendors: Object.keys(packageJSON.dependencies)
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {},
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl']
  },
  module: {
    noParse: [],
    preLoaders: [
      {test: /\.js(|x)$/, loader: 'eslint-loader', exclude: [/node_modules/]}
    ],
    loaders: [
      {test: /\.js(|x)$/, exclude:[/node_modules/], loader: 'babel', query: {presets: ['react','es2015']}},
      {test: /\.(scss|css)$/, loaders: ['style-loader', 'css?sourceMap', 'sass?sourceMap']}
    ],
    loader: 'react-hot-loader'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    configFile: '.eslintrc',
    quiet: true
  }
};

module.exports = config;