const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controllers = require('../controllers');

router.post('/', rescue(controllers.usersControllers.createUsers));

module.exports = router;
