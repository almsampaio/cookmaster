const express = require('express');

const router = express.Router();

const ControllerUsers = require('../controllers/ControllerUsers');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validLogin, ControllerUsers.login);

module.exports = router;
