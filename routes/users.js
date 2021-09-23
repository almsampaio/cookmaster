const express = require('express');
const validations = require('../middlewares/validations');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/',
  validations.validateName,
  validations.validateEmail,
  validations.validatePassword,
  validations.validateEmailIsUnique,
  userController.create);

module.exports = router;