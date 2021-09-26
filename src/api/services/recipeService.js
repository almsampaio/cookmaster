const recipeModel = require('../models/recipeModel');

const BAD_REQUEST = 400;
const STATUS_CREATED = 201;

const INVALID_ENTRIES = 'Invalid entries. Try again.';

const createRecipe = async (recipeData, userId) => {
  const { name, ingredients, preparation } = recipeData;

  if (!name || !ingredients || !preparation) {
    return { status: BAD_REQUEST, message: INVALID_ENTRIES };
  }

  const recipe = await recipeModel.createRecipe(recipeData, userId);

  return { status: STATUS_CREATED, recipe };
};

module.exports = {
  createRecipe,
};
