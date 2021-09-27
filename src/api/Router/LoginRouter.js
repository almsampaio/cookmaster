const express = require('express');

const { loginController } = require('../../MSC/login/loginController');

const router = express.Router();

router.post('/', loginController);

module.exports = router;
