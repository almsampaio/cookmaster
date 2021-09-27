const path = require('path');
const errors = require('../errors');
const RecipesService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipesService.createRecipe({
    name,
    ingredients,
    preparation,
    userId: _id,
  });

  res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipesService.getAllRecipes();

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesService.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({ message: errors.recipeNotFound });
  }

  res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.editRecipe(id, {
    name,
    ingredients,
    preparation,
  });

  if (!recipe) {
    return res.status(404).json({ message: errors.recipeNotFound });
  }

  res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesService.deleteRecipe(id);

  if (!recipe) {
    return res.status(404).json({ message: errors.recipeNotFound });
  }

  res.status(204).send();
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { path: pathImg } = req.file;

  res.setHeader('Content-Type', 'multipart/form-data');

  const recipe = await RecipesService.editRecipe(id, {
    image: `localhost:3000/${pathImg}`,
  });

  res.status(200).json(recipe);
};

const renderImage = (req, res) => {
  const fullfilepath = path.join(__dirname, '..', `uploads${req.path}`);
  return res.sendFile(fullfilepath);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
  renderImage,
};
