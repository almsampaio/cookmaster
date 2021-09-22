const recipeModel = require('../models/recipeModel');

const create = async (recipe) => {
  const recipeCreated = await recipeModel.create(recipe);
  return { status: 201, data: recipeCreated };
};

module.exports = {
  create,
};
