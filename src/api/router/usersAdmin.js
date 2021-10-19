const { Router } = require('express');

const {
  validateName,
  validateEmail,
  validatePassword,
  validateAdminToken,
} = require('../middlewares/validateUsers');

const {
  createAdminController,
} = require('../controller/users');

const router = Router();

router.post(
  '/admin',
  validateName,
  validateEmail,
  validatePassword,
  validateAdminToken,
  createAdminController,
);

module.exports = router;