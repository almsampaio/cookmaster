const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretPassword';

const { usersModel } = require('../models');

const getToken = async (email, password) => {
  const user = await usersModel.getUser(email, password);
  console.log(user);

  if (!user || user.length === 0) {
    throw new Error('Incorrect username or password');
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, SECRET, jwtConfig);

  return token;
};

module.exports = { getToken };
