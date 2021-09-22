const express = require('express');

const makeLogin = require('../controllers/loginController');

const router = express.Router();

router.post('/', makeLogin);

module.exports = router;