const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    return {
      message: 'jwt malformed',
    };
  }
};

module.exports = verifyToken;
