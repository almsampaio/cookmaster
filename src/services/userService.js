const usersModels = require('../models/userModel');

const create = async (name, email, password) => {
  const createNewUser = await usersModels.create(name, email, password);
  return createNewUser;
};

module.exports = {
  create,
};