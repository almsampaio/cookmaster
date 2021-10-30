const { HTTP_BAD_REQUEST } = require('../utils/utils');
const { validateRecipes } = require('./auth/validateRecipes');

const createRecipes = async (body) => {
  const { error } = validateRecipes(body);
  if (error) {
    return {
      error: true,
      status: HTTP_BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }
  return false;
};

module.exports = {
  createRecipes,
};
