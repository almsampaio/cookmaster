const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');

const login = require('../controllers/login-controller');

router.post('/users', userController.createUser);
router.post('/login', login.loginController);

module.exports = router;
