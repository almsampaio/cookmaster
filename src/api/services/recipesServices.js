const recipesModel = require('../model/recipesModel');
const { CREATED, OK, NOT_FOUND, NO_CONTENT } = require('../utils/status');

const create = async (recipe) => {
  const createRecipe = await recipesModel.create(recipe);
  return {
    status: CREATED,
    message: createRecipe,
  };
};

const get = async () => {
  const recipes = await recipesModel.get();
  return {
    status: OK,
    message: recipes,
  };
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);

  if (recipe === null) {
    return {
      status: NOT_FOUND,
      message: { message: 'recipe not found' },
    };
  }

  return {
    status: OK,
    message: recipe,
  };
};

const destroy = async (id) => {
  await recipesModel.destroy(id);
  return {
    status: NO_CONTENT,
  };
};

module.exports = { create, get, getById, destroy };
