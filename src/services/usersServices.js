const { registersUser, findByEmail } = require('../models/usersModel');

const serviceCreateUser = async (userData) => {
  const { password: _, ...registeredUser } = await registersUser(userData);
  return registeredUser;
};

const serviceFoundByEmail = async (email) => {
  const userFound = await findByEmail(email);
  console.log(userFound);
  return userFound;
};

module.exports = {
  serviceCreateUser,
  serviceFoundByEmail,
};