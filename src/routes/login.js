const express = require('express');
const rescue = require('express-rescue');
const LoginUserController = require('../controllers/users/LoginUserController');
const authLogin = require('../middlewares/users/authLogin');

const router = express.Router();

router.post('/', rescue(authLogin), rescue(LoginUserController.handle));

module.exports = router;
