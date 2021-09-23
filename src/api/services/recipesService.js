const recipesModel = require('../models/recipesModel');
const { requiredFialdsRecipes } = require('../shemes/validationShemes');

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };
  
  return { recipe };
};

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  const { message, code } = requiredFialdsRecipes(name, ingredients, preparation);

  if (message) return { message, code };
  return { recipe };
};

module.exports = { create, getAll, getById };
