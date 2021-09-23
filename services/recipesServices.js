const recipesModel = require('../models/recipesModel');

const getAll = async () => {
  const users = await recipesModel.getAll();
  return users;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

module.exports = {
  getAll,
  create,
  getById,
};