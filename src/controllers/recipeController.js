const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const id = req.user;

  const { recipe, code, message } = await recipeService
  .createRecipe(name, ingredients, preparation, id);
  if (message) return res.status(code).json(message);
  return res.status(201).json({ recipe });
};

const updateRecipe = async (req, res) => {
  const recipe = req.body;
  const { id } = req.params;
  const userId = req.user;

  const changedRecipe = await recipeService.updateRecipe(id, recipe, userId);
  return res.status(200).json(changedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.deleteRecipe(id);
  return res.status(204).json(recipe);
};

const updateImgRecipe = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const image = `localhost:3000/${path}`;
  const recipeUpdate = await recipeService.updateImgRecipe(id, image);
  return res.status(200).json(recipeUpdate);
};

const listRecipes = async (_req, res) => {
  const list = await recipeService.listRecipes();
  return res.status(200).json(list);
};

const recipeId = async (req, res) => {
  const { id } = req.params;

  const { recipe, code, message } = await recipeService.recipeId(id);
  if (message) return res.status(code).json(message);
  return res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  listRecipes,
  recipeId,
  updateRecipe,
  deleteRecipe,
  updateImgRecipe,
};