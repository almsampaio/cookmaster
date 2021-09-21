const recipeModel = require('../models/recipesModel');

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const create = async (recipe) => {
  const result = await recipeModel.create(recipe);
  return result;
};

module.exports = {
  getAll,
  create,
};
