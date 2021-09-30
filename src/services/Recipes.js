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

const getById = async (id) => {
  const recipe = await Recipes.getById(id);

  console.log(recipe);
  if (!recipe) {
    return { status: StatusCodes.NOT_FOUND, message: 'recipe not found' };
  }

  return { status: StatusCodes.OK, data: recipe };
};

module.exports = {
  create,
  getAll,
  getById,
};