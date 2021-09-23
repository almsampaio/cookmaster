const express = require('express');
const validations = require('../middlewares/validations');
const loginValidations = require('../middlewares/loginValidations');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/',
  validations.validateName,
  validations.validateEmail,
  validations.validatePassword,
  validations.validateEmailIsUnique,
  userController.create);

router.post('/admin',
  validations.validateAuth,
  loginValidations.validateAdmin,
  validations.validateName,
  validations.validateEmail,
  validations.validatePassword,
  validations.validateEmailIsUnique,
  userController.createAdmin);

module.exports = router;