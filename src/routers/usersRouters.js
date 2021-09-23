const express = require('express');

const controllers = require('../controllers/usersController');

const router = express.Router();

router.post('/', controllers.create);

module.exports = router;