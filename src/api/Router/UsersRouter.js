const express = require('express');

const { userRegisterController } = require('../../MSC/users');

const router = express.Router();

router.post('/', userRegisterController);

module.exports = router;
