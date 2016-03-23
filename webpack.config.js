const path = require('path');
const webpack = require('webpack');

// function getEntrySources(sources) {
//   if (process.env.NODE_ENV !== 'production') {
//     sources.push('webpack-hot-middleware/client');
//   }
//
//   return sources;
// }

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: './src/index',
  },
  output: {
    publicPath: '/dist/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: process.env.NODE_ENV !== 'production' ?
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] :
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
    ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader!cssnext-loader',
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ],
  }
};
