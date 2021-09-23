const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET || 'secretPassword';

const { usersModel } = require('../models');

module.exports = async (email, password) => {
  const user = await usersModel.getUser(email, password);

  if (!user || user.length === 0) {
    throw new Error('Incorrect username or password');
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const payload = {
    email,
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};
