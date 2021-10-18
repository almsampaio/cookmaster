const { Router } = require('express');

const {
  validateLogin,
} = require('../../middlewares/validations/users/validates');

const {
  createTokenController,
} = require('../../controllers/users/usersController');

const router = Router();

router.post(
  '/',
  validateLogin,
  createTokenController,
);

module.exports = router;