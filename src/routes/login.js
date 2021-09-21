const express = require('express');

const loginRouter = express.Router();
const { login } = require('../controllers/login');
const { loginValidation } = require('../middlewares/login');

loginRouter.post('/', loginValidation, login);

module.exports = loginRouter;