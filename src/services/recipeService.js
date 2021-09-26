const recipeModel = require('../models/recipeModel');

const create = async (recipe) => {
  const recipeCreated = await recipeModel.create(recipe);
  return { status: 201, data: recipeCreated };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return { status: 200, data: recipes };
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  if (!recipe) return { status: 404, error: { message: 'recipe not found' } };
  return { status: 200, data: recipe };
};

const update = async (id, recipe, userId) => {
  const recipeToUpdate = await recipeModel.update(id, recipe, userId);
  return { status: 200, data: recipeToUpdate };
};

const exclude = async (id) => {
  await recipeModel.exclude(id);
  return { status: 204 };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
