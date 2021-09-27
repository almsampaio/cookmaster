const recipeModel = require('../models/recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  return { data: recipe.ops[0] };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const update = async (id, body, userId) => {
  const recipe = await recipeModel.update(id, body, userId);
  return recipe;
};

const exclude = async (id, role) => {
  if (role === 'admin') {
    return recipeModel.exclude(id);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};