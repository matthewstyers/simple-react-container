module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

// const path = require('path');
// // const webpack = require('webpack');
//
// function getEntrySources(sources) {
//   if (process.env.NODE_ENV !== 'production') {
//     sources.push('webpack-hot-middleware/client');
//   }
//
//   return sources;
// }
//
// module.exports = {
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//     port: 8080,
//   },
//   entry: {
//     bundle: getEntrySources(['./src/index']),
//   },
//   output: {
//     publicPath: '/dist/',
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist'),
//   },
//   // plugins: process.env.NODE_ENV !== 'production' ?
//   //   [
//   //     new webpack.HotModuleReplacementPlugin(),
//   //     new webpack.NoErrorsPlugin(),
//   //   ] :
//   //   [
//   //     new webpack.optimize.OccurenceOrderPlugin(),
//   //     new webpack.DefinePlugin({
//   //       'process.env': {
//   //         'NODE_ENV': JSON.stringify('production'),
//   //       },
//   //     }),
//   //     new webpack.optimize.UglifyJsPlugin({
//   //       compressor: {
//   //         warnings: false,
//   //       },
//   //     }),
//   //   ],
//   module: {
//     // preLoaders: [
//     //   {
//     //     test: /\.js$/,
//     //     loader: 'source-map-loader',
//     //   },
//     // ],
//     loaders: [
//       {
//         test: /\.js$/,
//         loaders: ['react-hot', 'babel-loader', 'eslint-loader'],
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader',
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|svg)$/,
//         loader: 'url-loader?prefix=img/&limit=5000',
//       },
//       {
//         test: /\.(woff|woff2|ttf|eot)$/,
//         loader: 'url-loader?prefix=font/&limit=5000',
//       },
//     ],
//   },
// };
