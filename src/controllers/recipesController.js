const recipesService = require('../services/recipesService');

const addRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const { status, result } = await recipesService.addRecipe(authorization, req.body);
  res.status(status).json(result);
};

const getAllRecipes = async (req, res) => {
  const { status, allRecipes } = await recipesService.getAllRecipes();
  return res.status(status).json(allRecipes);
};

module.exports = { addRecipe, getAllRecipes };