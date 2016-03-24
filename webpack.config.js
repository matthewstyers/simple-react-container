const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: process.env.NODE_ENV === 'development' ?
    'cheap-module-eval-source-map' : '',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader',
    }, ],
    loaders: [{
      test: /\.scss$/,
      loader: 'style-loader',
    }, {
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  plugins: process.env.NODE_ENV === 'development' ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({}),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  quiet: false,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  stats: {
    color: true
  }
};
