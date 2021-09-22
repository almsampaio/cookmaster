const recipesService = require('../services/recipesService');
const { recipeError } = require('../utils/errors');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  const { error, recipe } = await recipesService
  .createRecipe(name, ingredients, preparation, userId);
  if (error) return res.status(error.status).json({ message: error.message });
  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req_, res) => {
  const recipes = await recipesService.getAllRecipes();
  return res.status(200).json(recipes);
};

const getOneRecipe = async (req, res) => {
  const { error } = recipeError;
  const { id } = req.params;
  const recipe = await recipesService.getOneRecipe(id);
  if (!recipe) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(200).json(recipe);
};

const editOneRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = await recipesService.editOneRecipe(id, name, ingredients, preparation);
  return res.status(200).json(editedRecipe);
};

const deleteOneRecipe = async (req, res) => {
  const { id } = req.params;
  await recipesService.deleteOneRecipe(id);
  return res.status(204).json({});
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipe = await recipesService.getOneRecipe(id);
  res.status(200).json({ ...recipe, image: `localhost:3000/${path}` });
};

const showImage = async (req, res) => {
  res.status(200).render('file', { path: req.file.path });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
  addImage,
  showImage,
};