const recipeService = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const id = req.user;

  const recipe = await recipeService.createRecipe(name, ingredients, preparation, id);

  return res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const getAll = await recipeService.getAllRecipes();
  return res.status(200).json(getAll);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};