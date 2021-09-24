const express = require('express');

const Router = express.Router();

const createUser = require('../useCases/createUser/createUserControlle');

const { userValidate } = require('../middlewares/user');

Router.post('/', userValidate, createUser);

module.exports = Router;
