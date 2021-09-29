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

const errorRecipesNotFound = {
  status: 404,
  error: {
    message: 'recipe not found',
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

const validateRecipes = (recipes) => {
  if (!recipes) throw errorRecipesNotFound;
};

module.exports = {
  validateRequire,
  validateToken,
  validateRecipes,
};
