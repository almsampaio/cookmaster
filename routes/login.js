const express = require('express');

const router = express.Router();
const loginValidations = require('../middlewares/loginValidations');
const loginController = require('../controllers/loginController');

router.post('/',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginController);

module.exports = router;