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

module.exports = {
  createRecipe,
  getAllRecipes,
};