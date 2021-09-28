const model = require('../model/modUsers');

const invalidEntries = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const emailRegistered = {
  status: 409,
  error: {
    message: 'Email already registered',
  },
};

const validateName = (name) => {
  if (!name) throw invalidEntries;
};

const emailExists = async (email) => {
  const userEmail = await model.getUserByEmail(email);
  if (userEmail) throw emailRegistered;
};

const validatePassword = (password) => {
  if (!password) throw invalidEntries;
};

const validateEmail = (email) => {
  const parseEmail = /\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;
  if (!parseEmail.test(email)) {
    throw invalidEntries;
  }
};

const createUser = async (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await emailExists(email);
  const response = await model.createUser(name, email, password);
  delete response.user.password;
  return { status: 201, response };
};

module.exports = {
  createUser,
};