const jwt = require('jsonwebtoken');

const { findByEmail } = require('../models/usersModel');

const secret = 'opedopedroehpreto';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return { 
      user: data,
      isValid: true,
     };
  } catch (error) {
    return {
      errorMessage: error.message,
      isValid: false,
    };
  }
};

const createToken = (user) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

const askLogin = async (email, password) => {
  const user = await findByEmail(email);
  if (!user || user.password !== password) {
    return {
      response: {
        message: 'Incorrect username or password',
      },
      status: 401,
    };
  }
  const { name, role, _id } = user;
  return {
    response: { token: createToken({ name, email, role, userId: _id }) },
    status: 200,
  };
};

module.exports = {
  validateToken,
  askLogin,
};