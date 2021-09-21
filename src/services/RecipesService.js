const Recipes = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation);
  return { status: 201, data: newRecipe };
};

module.exports = {
  createRecipe,
};
