const Recipe = require('../models/Recipe');
const AppError = require('../utils/AppError');

exports.create = async ({ name, ingredients, preparation }) => {
  const recipe = await Recipe.create({ name, ingredients, preparation });

  return recipe;
};
