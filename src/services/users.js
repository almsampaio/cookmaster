const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { UNAUTHORIZED, CONFLICT } = require('../utils/statusCodes');

const validateError = (status, message) => ({
  status,
  message,
});

const getAll = () => {
  console.log('user-service');
  return Users.getAll().then((res) => res);
};

const getByEmail = (email) => Users.getByEmail(email)
  .then((result) => result);

const create = async (name, email, password, role) => {
  const emailIsSingle = await getByEmail(email);
  if (emailIsSingle) throw validateError(CONFLICT, 'Email already registered');
  if (!role || role === 'user') {
    return Users
    .create(name, email, password, role || 'user')
    .then((result) => result);
  }
  throw validateError(UNAUTHORIZED, 'Invalid role ');
};

const createToken = (payload) => {
  const SECRET = 'supersecret';
  const token = jwt.sign(payload, SECRET);
  return { token };
};
const validateUserAccess = (user, email, password) => {
  if (user === null) throw validateError(UNAUTHORIZED, 'Incorrect username or password');

  if (user.email !== email || user.password !== password) {
    throw validateError(UNAUTHORIZED, 'Incorrect username or password');
  }
};

const login = async (email, password) => {
  const user = await getByEmail(email);
  validateUserAccess(user, email, password);
  const { password: _, ...userPlayload } = user;
  const token = createToken(userPlayload);
  return token;
};

module.exports = {
  getAll,
  create,
  login,
};