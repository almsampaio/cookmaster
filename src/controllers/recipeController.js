const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const id = req.user;

  const { recipe, code, message } = await recipeService
  .createRecipe(name, ingredients, preparation, id);

  if (message) return res.status(code).json(message);

  return res.status(201).json({ recipe });
};

const listRecipes = async (_req, res) => {
  const list = await recipeService.listRecipes();

  return res.status(200).json(list);
};

module.exports = {
  createRecipe,
  listRecipes,
};