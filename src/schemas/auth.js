const jwt = require('jsonwebtoken');
const usersAuth = require('../models/users');

const SECRET = 'tryber';

const jwtError = {
  code: 401,
  errorInfo: { message: 'jwt malformed' },
};

const validateToken = async (token) => {
  if (!token) return jwtError;
  try {
    const jwtVerify = jwt.verify(token, SECRET);
    const user = await usersAuth.getUserByEmail(jwtVerify.email);
    console.log(user);
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