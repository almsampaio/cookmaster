const usersModel = require('../models/usersModel');

async function register(user) {
  const newUserId = await usersModel.register(user);

  return newUserId;
}

module.exports = {
  register,
};
