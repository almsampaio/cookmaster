const RecipesServices = require('../services/recipes');
const RecipesModels = require('../models/recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await RecipesServices.create(name, ingredients, preparation, req.user);
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await RecipesModels.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipesServices.getById(id);
  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
  res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const recipeObj = { name, ingredients, preparation, _id: id };
  
  const updatedRecipe = await RecipesServices.updateRecipe(recipeObj);
  res.status(updatedRecipe.code).json(updatedRecipe.recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipesServices.deleteRecipe(id);
  res.status(204).send();
};

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
