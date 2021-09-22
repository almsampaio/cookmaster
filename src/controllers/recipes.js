const Recipes = require('../services/recipes');

const create = async (req, res) => {
  const { _id } = req.user;
  const { status, data, err } = await Recipes.create(req.body, _id);
  if (err) return res.status(status).json(err);
  res.status(status).json(data);
};

const getAllRecipes = async (_req, res) => {
  const { status, data } = await Recipes.getAllRecipes();
  res.status(status).json(data);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, data, err } = await Recipes.getRecipeById(id);
  if (err) return res.status(status).json(err);
  return res.status(status).json(data);
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};