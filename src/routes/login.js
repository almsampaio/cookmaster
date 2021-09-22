const express = require('express');
const rescue = require('express-rescue');

const route = express.Router();

const { validateLoginPayload } = require('../middlewares/login');
const loginController = require('../controllers/login');

route.post('/', validateLoginPayload, rescue(loginController.login));

module.exports = route;