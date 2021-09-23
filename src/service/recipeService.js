const recipeModel = require('../models/recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  return { data: recipe.ops[0] };
};

module.exports = {
  create,
};