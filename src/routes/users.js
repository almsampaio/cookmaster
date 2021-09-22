const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers');

const router = express.Router();

router.get('/ping', rescue(controller.user.ping));

module.exports = router;