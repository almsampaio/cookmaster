const recipesModel = require('../models/recipesModel');

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
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