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

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);
  return res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const edit = await recipeService.editRecipe(id, name, ingredients, preparation);
  return res.status(200).json(edit);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const deleted = await recipeService.deleteRecipe(id);
  return res.status(204).json(deleted);
};

const addImageRecipe = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const addImage = await recipeService.addImageRecipe(id, filename);
  return res.status(200).json(addImage);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};