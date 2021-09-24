const express = require('express');
const rescue = require('express-rescue');
const { userControllers } = require('../controllers');
const { middlewaresUsers } = require('../utils');

const router = express.Router();

router.post('/users', middlewaresUsers.registerUser, rescue(userControllers.create));
router.post('/login', middlewaresUsers.loginUser, rescue(userControllers.login));

module.exports = router;
