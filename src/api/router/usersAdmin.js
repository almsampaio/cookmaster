const { Router } = require('express');

const {
  validateName,
  validateEmail,
  validatePassword,
  validateAdminToken,
} = require('../../middlewares/validations/users/validates');

const {
  createAdminController,
} = require('../../controllers/users/usersController');

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