const express = require('express');

const router = express.Router();
const validations = require('../middlewares/validations');
const userController = require('../controllers/userController');

router.post('/',
  validations.validateName,
  validations.validateEmail,
  validations.validatePassword,
  validations.validateEmailIsUnique,
  userController.create);

module.exports = router;