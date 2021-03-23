const express = require('express');
const app = express();
require('./config/express')(app);

module.exports = app;