const RecipesModel = require('../models/Recipes');
const { recipeValidator } = require('../middlewares/RecipeValidator');

const createNewRecipe = async (name, ingredients, preparation) => {
  const checkRecipe = await recipeValidator(name, ingredients, preparation);

  if (checkRecipe !== true) return checkRecipe;

  const newRecipe = await RecipesModel.createNewRecipe(name, ingredients, preparation);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const result = await RecipesModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await RecipesModel.getRecipeById(id);

  if (!result) {
    return {
      error: true,
      message: 'recipe not found',
      status: 404,
    };
  }
  return result;
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
};