const usersModel = require('../models/usersModel');

const getAll = async () => {
  const users = await usersModel.getAll();

  return users;
};

module.exports = { getAll };
