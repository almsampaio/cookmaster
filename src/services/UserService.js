const jwt = require('jsonwebtoken');
const { validateUser, validateLogin } = require('./auth/validateUser');
const { HTTP_BAD_REQUEST, HTTP_CONFLICT, HTTP_UNAUTHORIZED } = require('../utils/utils');
const model = require('../models/UsersModel');

const JWT_SECRET = 'segredoentrenois';

const createUser = async (body) => {
  const { error } = validateUser(body);

  if (error) {
    return {
      error,
      status: HTTP_BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }
  return false;
};

const emailExists = async (email) => {
  const user = await model.findUser(email);

  if (user) {
    return {
      emailRegister: true,
      status: HTTP_CONFLICT,
      message: 'Email already registered',
    };
  }
  return false;
};

const isLoged = async (body) => {
  const { error } = validateLogin(body);

  if (error) {
    return {
      error,
      status: HTTP_UNAUTHORIZED,
      message: 'All fields must be filled',
    };
  }
  return false;
};

const createToken = (user) => {
  const payload = { user, role: 'user' };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const isUser = async (email, password) => {
  const user = await model.findUser(email);
  if ((user && user.email) !== email || user.password !== password) {
    return {
      error: true,
      status: HTTP_UNAUTHORIZED,
      message: 'Incorrect username or password',
    };
  }

  const token = createToken(user);
  return { token, user };
};

module.exports = {
  createUser,
  emailExists,
  isLoged,
  isUser,
};
