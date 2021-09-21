const userModel = require('../models/userModel');

const createNewUser = async (user) => {
  const result = await userModel.createUser(user);
  return result;
};

module.exports = {
  createNewUser,
};