const usersModel = require('../models/Users');

const createUser = async (name, email, password, role) => {
  const exists = await usersModel.findByEmail(email);

  if (exists) return;

  const { password: _, ...user } = await usersModel.createUser(name, email, password, role);

  return user;
};

module.exports = {
  createUser,
};
