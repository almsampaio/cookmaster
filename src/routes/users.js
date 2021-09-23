const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers');
const middlewares = require('../utils');

const router = express.Router();

router.post('/users', middlewares.registerUser, rescue(userControllers.create));
router.post('/login', middlewares.loginUser, rescue(userControllers.login));

module.exports = router;
