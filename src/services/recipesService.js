const recipeModel = require('../models/recipesModel');

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const create = async (obj) => {
  const { recipe: { name, ingredients, preparation }, user: { _id } } = obj;
  const recipe = { name, ingredients, preparation, userId: _id };
  const result = await recipeModel.create(recipe);
  return { recipe: result };
};

module.exports = {
  getAll,
  create,
};
