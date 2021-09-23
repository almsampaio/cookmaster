const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const { _id: userId } = req.user;
  const { status, message, recipe } = await recipesService
    .create(userId, name, ingredients, preparation, authorization);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const { status, recipes } = await recipesService.getAllRecipes();
  res.status(status).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { status, recipe } = await recipesService.getRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  res.status(status).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipeDetails = ({ id, name, ingredients, preparation, userId });
  const { status, recipe } = await recipesService
    .updateRecipe(recipeDetails);
  res.status(status).json(recipe);
};

const removeRecipe = async (req, res) => {
  const { status, findRecipe } = await recipesService.removeRecipe(req.params.id);
  if (!findRecipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  res.status(status).json(findRecipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
};