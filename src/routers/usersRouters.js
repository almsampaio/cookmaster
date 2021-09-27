const express = require('express');

const controllers = require('../controllers/usersController');

const { validateAdminCreator } = require('../controllers/loginController');

const router = express.Router();

router.post('/', controllers.create);

router.post('/admin', validateAdminCreator, controllers.create);

module.exports = router;