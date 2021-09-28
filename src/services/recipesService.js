const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const ERRORS = require('../utils/errorRecipes');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return ERRORS.INVALID_ENTRIES;
  const recipe = await recipesModel.create(name, ingredients, preparation, userId);

  if (!recipe) return ERRORS.INVALID_ENTRIES;

  return {
    recipe,
  };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();

  return recipes;
};

const getByid = async (id) => {
  if (!ObjectId.isValid(id)) return ERRORS.NOT_FOUND;

  const recipe = await recipesModel.getById(id);

  if (!recipe) return ERRORS.NOT_FOUND;

  return recipe;
};

module.exports = {
  create,
  getAll,
  getByid,
};
