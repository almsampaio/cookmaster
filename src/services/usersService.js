const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SECRET = 'loginsecret';

const CREATED_STATUS = 201;
const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const CONFLICT_STATUS = 409;
const UNAUTHORIZED_STATUS = 401;
const msg400 = 'Invalid entries. Try again.';
const msg409 = 'Email already registered';
const LOGIN_FIELD_ERROR = 'All fields must be filled';
const ENTRIES_ERROR = 'Incorrect username or password';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (user) => {
  const validateEmail = await usersModel.findByEmail(user);
  const validateUser = userSchema.validate(user);

  if (validateUser.error) {
    return { status: BAD_REQUEST_STATUS, result: { message: msg400 } };
  }

  if (validateEmail) {
    return { status: CONFLICT_STATUS, result: { message: msg409 } };
  }

  const result = await usersModel.userRegistration(user);

  return { status: CREATED_STATUS, result };
};

const loginUser = async (login) => {
  const validateLogin = loginSchema.validate(login);
  if (validateLogin.error) {
    return { status: UNAUTHORIZED_STATUS, result: { message: LOGIN_FIELD_ERROR } };
  }

  const user = await usersModel.findByEmail(login);
  if (!user || user.password !== login.password) {
    return { status: UNAUTHORIZED_STATUS, result: { message: ENTRIES_ERROR } };
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, SECRET);
  return { status: OK_STATUS, result: { token } };
};

module.exports = {
  register,
  loginUser,
};
