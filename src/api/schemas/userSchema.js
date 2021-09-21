const userModel = require('../models/userModel');

const errors = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_CONFLICT: 'Email already registered',
  INVALID_FIELD: 'All fields must be filled',
  INVALID_CREDENTIALS: 'Incorrect username or password',
};
const status = 400;

const verifyEntries = (name, email, password) => {
  const regex = /\S+@\S+\.\S+/;
  if (!name || !email || !password) return true;
  if (!regex.test(String(email).toLowerCase())) return true;
};
const checkEmail = async (email) => {
  const userFound = await userModel.findByCredentials(email);
  if (userFound) return true;
};

const verifyLogin = (email, password) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email || !password) return true;
  if (!regex.test(String(email).toLowerCase())) return true;
};
const validateEmail = async (email, password) => {
  const user = await userModel.findByCredentials(email);
  if (!user || user.password !== password) return true;
};

const createUser = async (name, email, password) => {
  const conflict = 409;
  switch (true) {
    case verifyEntries(name, email, password): return { status, message: errors.INVALID_ENTRIES };
    case (await checkEmail(email)): return { status: conflict, message: errors.EMAIL_CONFLICT };
    default: return {};
  }
};

const validateLogin = async (email, password) => {
  const unauthorized = 401;

  switch (true) {
    case verifyLogin(email, password): return {
      status: unauthorized, message: errors.INVALID_FIELD,
    };
    case (await validateEmail(email, password)): return {
      status: unauthorized, message: errors.INVALID_CREDENTIALS,
    };
    default: return {};
  }
};

module.exports = {
  createUser,
  validateLogin,
};