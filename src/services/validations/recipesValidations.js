const jwt = require('jsonwebtoken');

const secret = 'eumoronojambalai';

const errorValidateRequire = {
  status: 400,
    error: {
      message: 'Invalid entries. Try again.',
    },
};

const errorValidateToken = {
  status: 401,
  error: {
    message: 'jwt malformed',
  },
};

const validateRequire = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) throw errorValidateRequire;
};

const validateToken = (token) => {
  try {
    const tokenVerify = jwt.verify(token, secret);
    return tokenVerify;
  } catch (err) {
    throw errorValidateToken;
  }
};

module.exports = {
  validateRequire,
  validateToken,
};
