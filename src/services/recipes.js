const model = require('../models/recipes');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const recipe = await model.createRecipe({ name, ingredients, preparation, userId });
  return recipe;
};

module.exports = {
  createRecipe,
};
