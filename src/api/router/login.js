const { Router } = require('express');

const {
  validateLogin,
} = require('../middlewares/validateUsers');

const {
  createTokenController,
} = require('../controller/users');

const router = Router();

router.post(
  '/',
  validateLogin,
  createTokenController,
);

module.exports = router;