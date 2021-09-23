const { Router } = require('express');

const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../../middlewares/validations/users/validates');

const {
  createController,
} = require('../../controllers/users/usersController');

const router = Router();

router.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  createController,
);

module.exports = router;