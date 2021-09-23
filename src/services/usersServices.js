const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const validations = require('./userValidations');

const SECRET = 'supersenhaativar1234';
const jwtConfig = {
  expiresIn: '3d',
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
  const errorMessage = await validations.validateTokenCreation1(email, password);
  if (errorMessage) return errorMessage;

  const errorMessage2 = await validations.validateTokenCreation2(email, password);
  if (errorMessage2) return errorMessage2;

  const errorMessageEmail = await validations.validateEmail(email);
  if (errorMessageEmail) return errorMessageEmail;

  const errorMsgEmailEmpty = await validations.validateEmailEmpty(email);
  if (errorMsgEmailEmpty) return errorMsgEmailEmpty;

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
