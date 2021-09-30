const { StatusCodes } = require('http-status-codes');
const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.create(name, ingredients, preparation, userId);
  return { status: StatusCodes.CREATED, data: { recipe: newRecipe } };
};

module.exports = {
  create,
};