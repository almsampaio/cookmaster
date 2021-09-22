const usersModel = require('../models/users');
const { clientErrors } = require('../utils/httpStatusCodes');

const existsEmail = async (email) => {
  const isRegistered = await usersModel.existsEmail(email);
  if (isRegistered) {
    return {
      statusCode: clientErrors.conflict, message: 'Email already registered',
    };
  }
  return isRegistered;
};

const getUserById = async (id) => usersModel.getUserById(id);

const createUser = async (name, email, password, role) => {
  // const role = 'user';
  const newUser = await usersModel.createUser(name, email, password, role);
  return newUser;
};
module.exports = { existsEmail, createUser, getUserById };