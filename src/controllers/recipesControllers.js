const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipe = req.body;
  const { userId } = req;
  const recipeCreated = await recipesService.create(recipe, userId);
  return res.status(recipeCreated.status).json(recipeCreated.message);
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(recipes.status).json(recipes.message);
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const recipe = await recipesService.getById(_id);
  return res.status(recipe.status).json(recipe.message);
};

module.exports = {
  create,
  getAll,
  getById,
};
