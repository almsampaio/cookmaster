const express = require('express');

const router = express.Router();

const { validateSignupForm } = require('../middlewares');
const userController = require('../controllers/userController');

router.post('/', [
  validateSignupForm,
  userController.signUp,
]);

router.use((_err, _req, res, _next) => (
  res.status(400).json({ message: 'Invalid entries. Try again.' })));

module.exports = router;