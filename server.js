/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const winston = require('winston');

const app = express();

const config = require('./webpack.config');
const compiler = webpack(config);
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.HOSTNAME || '0.0.0.0';

if (process.env.NODE_ENV === 'development') {
  winston.info('Bundling webpack... Please wait.');

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    poll: 1000 // poll files once per second
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  winston.info(`Listening at http://${ DOMAIN }:${ PORT }`);
}

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
