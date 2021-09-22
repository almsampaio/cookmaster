const { sign } = require('jsonwebtoken');
const userModel = require('../models/user');

const SECRET = 'senhahipermegaultrasecreta';

const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const createUser = async (name, password, email) => {
  const User = await userModel.createUser(name, password, email);
  return User;
};

const genToken = (email) => {
  const token = sign({ data: email }, SECRET, jwtConfig);
  return token;
};

module.exports = {
  createUser,
  genToken,
};