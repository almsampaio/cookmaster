const recipeModel = require('../models/recipesModel');

const newRecipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return ({ status: 400, message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipeModel.newRecipe(name, ingredients, preparation);

  return recipe;
};

const getRecipes = async () => recipeModel.getRecipes();

const getRecipe = async (id) => recipeModel.getRecipe(id);

const editRecipe = async (id, body) => recipeModel.editRecipe(id, body);

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
};
