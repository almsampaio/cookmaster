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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { status, data, err } = await Recipes.updateRecipe(id, req.body, _id);
  if (err) return res.status(status).json(err);
  return res.status(status).json(data);
};

const removeRecipe = async (req, res) => {
  const { id } = req.params;
  const { status, data, err } = await Recipes.removeRecipe(id);
  if (err) return res.status(status).json(err);
  res.status(status).json(data);
};

const addRecipeImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { status, data, err } = await Recipes.addRecipeImage(id, filename);
  if (err) return res.status(status).json(err);
  return res.status(status).json(data);
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  addRecipeImage,
};