const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const ERROR_INVALID_ENTRIES = { error: { status: 400, message: 'Invalid entries. Try again.' } };
const ERROR_EMAIL_EXISTS = { error: { status: 409, message: 'Email already registered' } };
const ERROR_LOGIN = { error: { status: 401, message: 'All fields must be filled' } };
const ERROR_CREDENTIALS = { error: { status: 401, message: 'Incorrect username or password' } };
const SECRET = 'meusupersegredo';

const userLogin = async (email, password) => {
  if (!email || !password) {
    return ERROR_LOGIN;
  }
  const userSearch = await userModel.findUserByEmail(email);
  if (!userSearch || userSearch.password !== password) {
    return ERROR_CREDENTIALS;
  }

  const { password: _, ...userPayload } = userSearch;
  const token = jwt.sign(userPayload, SECRET);
  return { token };
};

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
  userLogin,
};
