const express = require('express');

const router = express.Router();

const ControllerUsers = require('../controllers/ControllerUsers');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validUser, ControllerUsers.create);

module.exports = router;
