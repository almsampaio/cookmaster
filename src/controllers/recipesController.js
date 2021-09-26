const recipesService = require('../services/recipesService');

const addRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const { status, result } = await recipesService.addRecipe(authorization, req.body);
  return res.status(status).json(result);
};

const getAllRecipes = async (_req, res) => {
  const { status, allRecipes } = await recipesService.getAllRecipes();
  return res.status(status).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { status, recipe } = await recipesService.getRecipeById(id);
  return res.status(status).json(recipe);
};

module.exports = { addRecipe, getAllRecipes, getRecipeById };