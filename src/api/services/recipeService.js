const recipeModel = require('../models/recipeModel');

const exceptions = {
    recipeNotFound: {
      message: 'recipe not found',
      code: 404,
    },
};

const create = async (recipe) => recipeModel.create(recipe);

const getById = async (id) => {
  const result = await recipeModel.getById(id);

  if (!result) return { error: exceptions.recipeNotFound };

  return result;
};

const getAll = async () => recipeModel.getAll();

module.exports = { create, getAll, getById };