const usersModel = require('../models/usersModel');
const validations = require('./validations');

const getAllUsers = async () => {
  const users = await usersModel.getAllUsers();
  return users;
};

const createUser = async (name, email, password, role) => {
  const errorMessage = await validations.validateUserCreation(name, email, password);
  if (errorMessage) return errorMessage;

  const emailerrorMessage = await validations.validateUserEmail(email);
  if (emailerrorMessage) return emailerrorMessage;

  const createdUser = await usersModel.createUser(name, email, password, role);
  return { createdUser };
};

module.exports = {
  getAllUsers,
  createUser,
};
