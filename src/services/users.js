const jwt = require('jsonwebtoken');
const model = require('../models/users');

const SECRET = 'secret';

const createUser = async ({ name, email, password }) => {
  const alreadyExists = await model.findUserByEmail(email);

  if (alreadyExists) return { error: { code: 409, message: 'Email already registered' } };

  const user = await model.createUser({ name, email, password });
  return user;
};

const findUserByCredentials = async ({ email, password }) => {
  const user = await model.findUserByEmail(email);

  if (!user || user.password !== password) {
    return { error: { code: 401, message: 'Incorrect username or password' } };
  }

  const { password: _, ...userInfo } = user;

  const token = jwt.sign(userInfo, SECRET, { expiresIn: '15m' });

  return token;
};

module.exports = {
  createUser,
  findUserByCredentials,
};
