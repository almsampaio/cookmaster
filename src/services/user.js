const models = require('../models/users');

const create = async (name, email, password) => {
  const registerUser = await models.create(name, email, password);
  return registerUser;
};

const find = async (email) => {
  const searchEmail = await models.find(email);
  return searchEmail;
};

module.exports = { create, find };
