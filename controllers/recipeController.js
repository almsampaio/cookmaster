const { StatusCodes: { CREATED, OK } } = require('http-status-codes');
const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const recipe = await recipeService.createNewRecipe(req.body, userId);
  res.status(CREATED).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(OK).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};