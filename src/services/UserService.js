const UserModel = require('../models/UserModel');

const createUser = async (userData) => {
  const user = await UserModel.createUser(userData);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await UserModel.findUserByEmail(email);
  return user;
};

module.exports = { createUser, findUserByEmail };