const { registersUser } = require('../models/usersModel');

const serviceCreateUser = async (userData) => {
  const { password: _, ...registeredUser } = await registersUser(userData);
  return registeredUser;
};

module.exports = {
  serviceCreateUser,
};