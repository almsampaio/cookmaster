const userModel = require('../models/usersModel');

const login = async (email) => {
  const result = await userModel.findOnebyEmail(email);
  return result;
};

module.exports = {
  login,
};
