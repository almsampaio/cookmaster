const recipeModel = require('../models/recipeModel');

const errors = {
  INVALID_DATA: 'Invalid entries. Try again.',
  NOT_FOUND: 'recipe not found',
};
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const verifyEntries = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return true;
};

const validateRecipe = (recipeData) => {
  const { name, ingredients, preparation } = recipeData;
  switch (true) {
    case verifyEntries(name, ingredients, preparation): return {
      status: BAD_REQUEST, message: errors.INVALID_DATA,
    };
    default: return {};
  }
};

const validateGetRecipe = async (id) => {
  const recipe = await recipeModel.getById(id);  
  if (!recipe) return { status: NOT_FOUND, message: errors.NOT_FOUND };
  return {};
};

module.exports = {
  validateRecipe,
  validateGetRecipe,
};