const userModel = require('../model/usersModel');

const createUser = async (name, email, passWord) => {
  const createdUser = await userModel.createUser(name, email, passWord);
  const { password, ...user } = createdUser;
  return user;
};

module.exports = {
  createUser,
};
