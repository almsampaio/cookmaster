const express = require('express');

const Router = express.Router();

const loginController = require('../useCases/login/loginController');
const authLogin = require('../middlewares/authLogin');

Router.post('/', authLogin, loginController);

module.exports = Router;
