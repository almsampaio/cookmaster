const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').post(userController.create);
router.route('/admin').post(authController.verify,
  authController.verifyAdmin,
  userController.createAdmin);

module.exports = router;
