const userModel = require('../models/user-model');

const createUser = async (name, email, password) => {
  const creteadUser = await userModel.createUser(name, email, password);

  return creteadUser;
};

const findEmail = async (email) => userModel.findEmail(email);

module.exports = {
  createUser,
  findEmail,
};
