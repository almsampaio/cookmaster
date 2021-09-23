const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers');
const middlewares = require('../utils');

const router = express.Router();

router.post('/users', middlewares.registerProducts, rescue(controller.create));

module.exports = router;
