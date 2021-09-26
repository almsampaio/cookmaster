const jwt = require('jsonwebtoken');

const privateKey = 'Seb#2021';

const BAD_REQUEST_INVALID_ENTRIES = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const UNAUTHORIZED_INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'jwt malformed',
  },
};

const NOT_FOUND_RECIPE = {
  status: 404,
  error: {
    message: 'recipe not found',
  },
};

const UNAUTHORIZED_MISSING_TOKEN = {
  status: 401,
  error: {
    message: 'missing auth token',
  },
};

const validateName = (name) => {
  if (!name) throw BAD_REQUEST_INVALID_ENTRIES;
};

const validateIngredients = (ingredients) => {
  if (!ingredients) throw BAD_REQUEST_INVALID_ENTRIES;
};

const validatePreparation = (preparation) => {
  if (!preparation) throw BAD_REQUEST_INVALID_ENTRIES;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw UNAUTHORIZED_INVALID_TOKEN;
  }
};

const recipeExists = (recipe) => {
  if (!recipe) throw NOT_FOUND_RECIPE;
};

const validateAuthentication = (token) => {
  if (!token) throw UNAUTHORIZED_MISSING_TOKEN;
};

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  recipeExists,
  validateAuthentication,
};
