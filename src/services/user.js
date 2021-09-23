const userModels = require('../models/users');
const auth = require('../auth/jwtFunctions');

const create = async (name, email, password) => {
  const registerUser = await userModels.create(name, email, password);
  return registerUser;
};

const find = async (email) => {
  const searchEmail = await userModels.find(email);
  return searchEmail;
};

const login = async (email) => {
  const user = await userModels.login(email);
  const token = auth.create(user);
  return token;
};

module.exports = { create, find, login };
