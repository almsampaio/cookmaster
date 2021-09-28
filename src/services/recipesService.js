const recipesModel = require('../models/recipesModel');
const ERRORS = require('../utils/errorRecipes');

const create = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return ERRORS.INVALID_ENTRIES;
  const recipe = await recipesModel.create(name, ingredients, preparation);

  if (!recipe) return ERRORS.INVALID_ENTRIES;

  return {
    recipe,
  };
};

module.exports = {
  create,
};
