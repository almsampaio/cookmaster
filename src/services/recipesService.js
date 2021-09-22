// const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

const errInvalidEntries = { status: 400, message: 'Invalid entries. Try again.' };

const create = async (userId, name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return errInvalidEntries;
  const createRecipe = await recipesModel.create(userId, name, ingredients, preparation);
  return ({ status: 201, recipe: createRecipe });
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return ({ status: 200, recipes });
};

module.exports = {
  create,
  getAllRecipes,
};