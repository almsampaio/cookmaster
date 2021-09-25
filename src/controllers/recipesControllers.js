const rescue = require('express-rescue');

const {
  STATUS_OK,
  STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');

const { serviceCreateRecipe,
  getAllRecipes,
  findRecipeById } = require('../services/recipesServices');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const createdRecipe = await serviceCreateRecipe({ name, ingredients, preparation, userId });
  const { _id } = createdRecipe;
  console.log(`id da receita:${_id}`);
  if (createdRecipe) {
    return res.status(STATUS_CREATE).json({ recipe: createdRecipe });
  }
  return res.status(STATUS_UNAUTHORIZED).json({ message: 'Unknown error.' });
});

const listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  if (recipes) {
    return res.status(STATUS_OK).json(recipes);
  }
  return res.status(STATUS_UNPROCESSABLE).json({ message: 'Recipes not found' });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;
  const recipe = await findRecipeById(id);
  if (recipe) {
    return res.status(STATUS_OK).json(recipe);
  }
  return res.status(STATUS_NOT_FOUND).json({ message: 'recipe not found' });
};
module.exports = {
  createRecipe,
  listRecipes,
  recipeDetails,
};