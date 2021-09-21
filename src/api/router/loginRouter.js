const express = require('express');

const router = express.Router();

const { validateLoginForm } = require('../middlewares/validateLoginForm');
const loginController = require('../controllers/loginController');

router.post('/', [
  validateLoginForm,
  loginController.signIn,
]);

router.use((_err, _req, res, _next) => (
  res.status(401).json({ message: 'All fields must be filled' })));

module.exports = router;