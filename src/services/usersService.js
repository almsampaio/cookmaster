const usersModels = require('../models/usersModels');
const usersValidations = require('./validations/usersValidations');

const addUsers = async (name, email, password) => {
  usersValidations.validateRequire(name, email, password);
  usersValidations.validateRequire(name, email, password);
  usersValidations.validateEmail(email);
  await usersValidations.validateEmailExist(email);
  const result = await usersModels.addUsers(name, email, password);
  delete result.user.password;
  return { status: 201, result };
};

module.exports = {
  addUsers,
};
