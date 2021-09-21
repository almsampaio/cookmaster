const userModel = require('../models/userModel');

const createUser = async (name, email, password, role) => {
  const user = await userModel.createUser(name, email, password, role);
  return user;
};

module.exports = { createUser };