const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const users = await userModel.create(name, email, password);
  return users;
};

module.exports = { createUser };
