const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const ROOT_PATH = process.cwd();
const filename = process.env.NODE_ENV === 'production' ? './index.min.js' : './index.js';


module.exports = {
  entry: './src/index.js',

  devtool: 'source-map',

  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: filename,
    library: package.name,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

