const { Router } = require('express');

const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validateUsers');

const {
  createController,
} = require('../controller/users');

const router = Router();

router.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  createController,
);

module.exports = router;