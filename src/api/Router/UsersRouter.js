const express = require('express');

const { usersController } = require('../../MSC/CONTROLLERS');

const router = express.Router();

router.post('/', usersController.register);

module.exports = router;
