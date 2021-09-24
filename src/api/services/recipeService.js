const Recipe = require('../models/Recipe');
const AppError = require('../utils/AppError');

exports.create = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    throw new AppError(400, 'Invalid entries. Try again.');
  }

  const recipe = await Recipe.create({ name, ingredients, preparation, userId });

  return recipe;
};

exports.getAll = async () => {
  const recipes = await Recipe.getAll();

  return recipes;
};

exports.getById = async (id) => {
  const recipe = await Recipe.getById(id);

  if (!recipe) throw new AppError(404, 'recipe not found');

  return recipe;
};
