const userModel = require('../model/usersModel');

const createUser = async (name, email, password) => {
  const createdUser = await userModel.createUser(name, email, password);
  return createdUser;
};

module.exports = {
  createUser,
}
