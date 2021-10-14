const usersModel = require('../models/Users');
const { createToken } = require('../utils/token');
const { userLoginValidation } = require('../middlewares/Users');

const createUser = async (name, email, password, role) => {
  const exists = await usersModel.findUser(email);

  if (exists) return;

  const { password: _, ...user } = await usersModel.createUser(name, email, password, role);

  return user;
};

const login = async (email, password) => {
  const user = await usersModel.findUser(email, password);
  userLoginValidation(user);
  const token = createToken(user);
  return token;
};

module.exports = {
  createUser,
  login,
};
