const recipesService = require('../services/recipesService');

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getRecipes();
  res.status(200).json(recipes);
};

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userID = req.user;
  const create = await recipesService.createRecipe(name, ingredients, preparation, userID);
  return res.status(201).json(create);
};

module.exports = {
  createRecipe,
  getRecipes,
};