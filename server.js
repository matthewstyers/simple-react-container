/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const winston = require('winston');

const config = require('./webpack.config');
const compiler = webpack(config);
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.ROOT_URL || 'localhost';

if (process.env.NODE_ENV === 'development') {
  const webpackDevServer = require('webpack-dev-server');


  const server = new webpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      poll: true
    }
  });

  server.listen(PORT, (err) => {
    if (err) {
      winston.error(err);
      return;
    }
  });
  // app.use(require('webpack-hot-middleware')(compiler));
  winston.info(`Listening at http://${ DOMAIN }:${ PORT }`);
} else {
  const app = express();
  app.use('/dist', express.static('dist'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, (err) => {
    if (err) {
      winston.error(err);
      return;
    }
  });
}
