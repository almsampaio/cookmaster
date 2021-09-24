const Recipe = require('../models/Recipe');
const AppError = require('../utils/AppError');

exports.create = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    throw new AppError(400, 'Invalid entries. Try again.');
  }

  const recipe = await Recipe.create({ name, ingredients, preparation, userId });

  return recipe;
};
