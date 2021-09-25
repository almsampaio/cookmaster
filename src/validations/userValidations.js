const userModel = require('../models/usersModel');

const BAD_REQUEST = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const CONFLICT = {
  status: 409,
  error: {
    message: 'Email already registered',
  },
};

const validateName = (name) => {
  console.log('validate Name');
  if (!name) throw BAD_REQUEST;
};

const emailExists = async (email) => {
  console.log('validate email exists');
  const user = await userModel.getUserByEmail(email);
  if (user) throw CONFLICT;
};

const validateEmail = (email) => {
  console.log('validate email');
  const emailIsValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!emailIsValid) {
    throw BAD_REQUEST;
  }
};

const validatePassword = (password) => {
  console.log('validate password');
  if (!password) throw BAD_REQUEST;
};

module.exports = {
  validateName,
  emailExists,
  validateEmail,
  validatePassword,
};
