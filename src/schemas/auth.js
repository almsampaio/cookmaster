const jwt = require('jsonwebtoken');
const usersAuth = require('../models/users');

const SECRET = 'tryber';

const jwtError = {
  errorCode: 401,
  errorInfo: { message: 'jwt malformed' },
};

const missingToken = {
  errorCode: 401,
  errorInfo: { message: 'missing auth token' },
};

const validateToken = async (token) => {
  console.log('token aqui', token);
  if (!token || token === undefined) return missingToken;
  try {
    const jwtVerify = jwt.verify(token, SECRET);
    const user = await usersAuth.getUserByEmail(jwtVerify.email);
    if (!user) { 
      return jwtError;
    }
    const { _id } = user;
    return {
      id: _id,
    };
  } catch (err) {
     return {
        errorCode: 401,
        errorInfo: { message: err.message },
     };
  }
};

module.exports = {
  validateToken,
};