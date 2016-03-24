/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const winston = require('winston');

const config = require('./webpack.config');
const compiler = webpack(config);
const PORT = process.env.PORT || 8080;
// const DOMAIN = process.env.ROOT_URL || 'localhost';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/dist', express.static('public/dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }
});
