const express = require('express');
const UserController = require('../Controller/UsersController');
const { emailValidated } = require('../middlewares/emailValidated');
const nameValidated = require('../middlewares/nameValidated');
const passwordValidated = require('../middlewares/passwordValidated');

const Userrouter = express.Router();
const Authentication = express.Router();

const userValidated = [nameValidated, emailValidated, passwordValidated];
// const authValidated = [emailValidated, passwordValidated];
// Requisito 1 - Cadastro de Usuários
Userrouter.post('/', userValidated, UserController.userRegistration);
// Requisito 2 - 
Authentication.post('/', UserController.login);
module.exports = { Userrouter, Authentication };