const path = require('path');

module.exports = {
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './'
  // },
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
