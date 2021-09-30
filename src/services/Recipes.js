const { StatusCodes } = require('http-status-codes');
const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.create(name, ingredients, preparation, userId);

  return { status: StatusCodes.CREATED, data: { recipe: newRecipe } };
};

const getAll = async () => {
  const recipes = await Recipes.getAll();

  return { status: StatusCodes.OK, data: recipes };
};

module.exports = {
  create,
  getAll,
};