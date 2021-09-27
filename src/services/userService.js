const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'palavrasecreta';

const validateEntries = (name, email, password) => {
  const invalidEntriesError = { err: { code: 400, message: 'Invalid entries. Try again.' } };
  const regex = /\S+@\S+\.\S+/;
  if (!name || !email || !password || regex.test(email) === false) {
  return invalidEntriesError;
}
  return null;
};

const checkEmail = async (email) => {
  const unavailableEmailError = { err: { code: 409, message: 'Email already registered' } };
  const sameEmail = await userModel.findEmail(email);
  if (sameEmail) return unavailableEmailError;
  return null;
};

const create = async (name, email, password) => {
  const invalidEntries = validateEntries(name, email, password);
  if (invalidEntries) return invalidEntries;
  const unavailableEmail = await checkEmail(email);
  if (unavailableEmail) return unavailableEmail;
  const insertedUser = await userModel.create(name, email, password);
  const HTTP_CREATED_STATUS = 201;
  return { newUser: insertedUser, status: HTTP_CREATED_STATUS };
};

const validateLogin = (email, password) => {
  const emptyFildsError = { err: { code: 401, message: 'All fields must be filled' } };
  if (!email || !password) return emptyFildsError;
  return null;
};

const login = async (email, password) => {
  const invalidLogin = { err: { code: 401, message: 'Incorrect username or password' } };
  const emptyFields = validateLogin(email, password);
  if (emptyFields !== null) return emptyFields;
  const userPayload = await userModel.login(email, password);
  if (!userPayload) return invalidLogin;
  const token = jwt.sign({ userPayload }, SECRET);
  return { token };
};

module.exports = {
  create,
  login,
};
