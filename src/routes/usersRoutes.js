const express = require('express');

const router = express.Router();
// importar controllers
const { registerUser } = require('../controllers/usersControllers');
// importar middlewares de validação
const { checksEmptyFields,
  checksValidEmail,
  checksUniqueEmail } = require('../middlewares/usersMiddlewares');

router.post('/', checksEmptyFields, checksValidEmail, checksUniqueEmail, registerUser);

module.exports = router;
