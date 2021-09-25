const express = require('express');
const { createUser } = require('../controllers/UserController');
const validateUser = require('../middlewares/validateUser');
const validate = require('../schemas/validate');

const userRouter = express.Router();

userRouter.post('/', validate('createUser'), validateUser, createUser);

module.exports = { userRouter };
