const usersModel = require('../models/users');

const createUser = async (name, email, password, role = 'user') => {
  const getUser = await usersModel.getUser(email);

  if (getUser) return { code: 409, message: 'Email already registered' };

  const { password: _, ...user } = await usersModel
    .createUser(name, email, password, role);

  return {
    user,
  };
};

module.exports = {
  createUser,
};
