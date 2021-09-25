const usersModel = require('../models/users');

const login = async (email, password) => {
  const getUser = await usersModel.getUserLogin(email, password);

  if (!getUser) return ({ code: 401, message: 'Incorrect username or password' });

  return getUser;
};

module.exports = {
  login,
};
