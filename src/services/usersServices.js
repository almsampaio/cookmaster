const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const validations = require('./validations');

const SECRET = 'supersenhaativar1234';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getAllUsers = async () => {
  const users = await usersModel.getAllUsers();
  return users;
};

const getByEmail = async (email) => {
  const userEmail = await usersModel.getByEmail(email);

  return userEmail;
};

const createUser = async (name, email, password, role) => {
  const errorMessage = await validations.validateUserCreation(name, email, password);
  if (errorMessage) return errorMessage;

  const emailerrorMessage = await validations.validateUserEmail(email);
  if (emailerrorMessage) return emailerrorMessage;

  const createdUser = await usersModel.createUser(name, email, password, role);
  return { createdUser };
};

const loginUser = async (email, password) => {
  const errorMessage = await validations.validateToken1(email, password);
  if (errorMessage) return errorMessage;

  const errorMessage2 = await validations.validateToken2(email, password);
  if (errorMessage2) return errorMessage2;

  const errorMessageEmail = await validations.validateEmail(email);
  if (errorMessageEmail) return errorMessageEmail;

  const errorMessageEmailEmpty = await validations.validateEmailEmpty(email);
  if (errorMessageEmailEmpty) return errorMessageEmailEmpty;

  await usersModel.loginUser(email, password);

  const token = jwt.sign({ email }, SECRET, jwtConfig);

  return { token };
};

module.exports = {
  getAllUsers,
  getByEmail,
  createUser,
  loginUser,
};
