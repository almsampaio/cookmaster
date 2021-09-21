const userModel = require('../models/user');

const createUser = async (name, password, email) => {
  const User = await userModel.createUser(name, password, email);
  return User;
};

module.exports = {
  createUser,
};