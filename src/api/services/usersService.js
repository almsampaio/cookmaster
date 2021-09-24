const userModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const result = await userModel.createUser(name, email, password);
  return result;
};

const createAdmin = async (name, email, password) => {
  const result = await userModel.createAdmin(name, email, password);
  return result;
};

module.exports = {
  createUser,
  createAdmin,
};
