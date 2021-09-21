const express = require('express');
const rescue = require('express-rescue');
const RegisterUserController = require('../controllers/users/RegisterUserController');

const authAdmin = require('../middlewares/authAdmin');
const authUser = require('../middlewares/users/authUser');
const authToken = require('../middlewares/authToken');
const RegisterAdminController = require('../controllers/users/RegisterAdminController');

const router = express.Router();

router.post('/', rescue(authUser), rescue(RegisterUserController.handle));

router.post(
  '/admin',
  rescue(authToken),
  rescue(authAdmin),
  rescue(authUser),
  rescue(RegisterAdminController.handle),
);

module.exports = router;
