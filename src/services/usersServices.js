const usersModels = require('../models/usersModels');

const createUser = async (name, email, password) => {
  const createNewUser = await usersModels.createUser(name, email, password);
  return createNewUser;
};

module.exports = {
  createUser,
};
