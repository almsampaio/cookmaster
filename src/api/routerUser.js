const express = require('express');
const UserController = require('../Controller/UsersController');
const { emailValidated } = require('../middlewares/emailValidated');
const nameValidated = require('../middlewares/nameValidated');
const passwordValidated = require('../middlewares/passwordValidated');

const router = express.Router();

const userValidated = [nameValidated, emailValidated, passwordValidated];

// Requisito 1 - Cadastro de Usuários
router.post('/', userValidated, UserController.userRegistration);

module.exports = router;