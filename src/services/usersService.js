const usersModel = require('../models/usersModel');
const validations = require('./validations');

async function register(user) {
  validations.isNameValid(user.name);
  await validations.isEmailValid(user.email, usersModel.getByEmail);

  const newUserId = await usersModel.register(user);

  return newUserId;
}

module.exports = {
  register,
};
