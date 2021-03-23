const express = require('express');
const router = express.Router();

const API_PATH = '/api/v1';



module.exports = function (app) {
    app.use(API_PATH + '/auth', require('../api/auth/auth.router'))
}
