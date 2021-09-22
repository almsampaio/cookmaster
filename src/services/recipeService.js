const recipeModel = require('../models/recipeModel');

const create = async (recipe) => {
  const recipeCreated = await recipeModel.create(recipe);
  return { status: 201, data: recipeCreated };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return { status: 200, data: recipes };
};

module.exports = {
  create,
  getAll,
};
