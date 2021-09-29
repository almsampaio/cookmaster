const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userValidations = require('../validations/userValidations');

const SECRET = 'secretCookmaster';

const createUser = async (name, email, password, role) => {
  const validations = await userValidations.validate(name, email, password);
  if (validations.message) return validations;

  const user = await userModel.createUser(name, email, password, role);
  return { user };
};

const authorizeLogin = async (email, password) => {
  const validations = await userValidations.validateLogin(email, password);
  if (validations.message) return validations;

  const user = await userModel.findUserEmail(email);

  const { password: _, ...userPayload } = user;
  const token = jwt.sign(userPayload, SECRET);

  return { token };
};

module.exports = { 
  createUser,
  authorizeLogin,
};