const express = require('express');
const loginValidations = require('../middlewares/loginValidations');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginController);

module.exports = router;