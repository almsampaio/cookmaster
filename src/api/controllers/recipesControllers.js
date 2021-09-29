const recipesServices = require('../services/recipesServices');

const create = async (req, res) => {
  const createRecipe = await recipesServices.create(req.body);
  return res.status(createRecipe.status).json(createRecipe.message);
};

const get = async (_req, res) => {
  const recipes = await recipesServices.get();
  return res.status(recipes.status).json(recipes.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getById(id);
  return res.status(recipe.status).json(recipe.message);
};

module.exports = { create, get, getById };
