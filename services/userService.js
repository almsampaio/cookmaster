const userModel = require('../models/userModel');

const createNewUser = async (user) => {
  const emailAlreadyExists = await userModel.findOnebyEmail(user.email);
  if (emailAlreadyExists) {
    throw new Error();
  }
  const result = await userModel.createUser(user);
  return result;
};

module.exports = {
  createNewUser,
};