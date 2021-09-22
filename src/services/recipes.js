const model = require('../models/recipes');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const recipe = await model.createRecipe({ name, ingredients, preparation, userId });
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
