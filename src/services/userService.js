const userModel = require('../models/userModel');

const ERROR_INVALID_ENTRIES = { error: { status: 400, message: 'Invalid entries. Try again.' } };
const ERROR_EMAIL_EXISTS = { error: { status: 409, message: 'Email already registered' } };

const entriesValidation = (name, email, password) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!name || !email || !password || emailRegex.test(email) === false) return true;
  return false;
};

const createUser = async (name, email, password) => {
  if (entriesValidation(name, email, password)) return ERROR_INVALID_ENTRIES;

  const findUserByEmail = await userModel.findUserByEmail(email);
  if (findUserByEmail) return ERROR_EMAIL_EXISTS;

  const user = await userModel.createUser(name, email, password);
  return user;
};

module.exports = {
  createUser,
};
