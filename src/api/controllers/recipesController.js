const rescue = require('express-rescue');

const recipeService = require('../services/recipesService');
const upload = require('../utils/upload');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId,
  };

  const recipe = await recipeService.createRecipe(newRecipe);

  res.status(201).json({ recipe });
});

const getRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getRecipes();

  res.status(200).json(recipes);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipeService.getById(id);

  if (recipe.code) return next(recipe);

  res.status(200).json(recipe);
});

const editRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const newData = { id, name, ingredients, preparation };

  const edited = await recipeService.editRecipe(newData);

  if (edited.code) return next(edited);

  res.status(200).json(edited);
});

const vaporizeRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const deleted = await recipeService.vaporizeRecipe(id);

  if (deleted.code) return next(deleted);

  res.sendStatus(204);
});

const putImage = [upload.single('image'),
  (req, res) => recipeService.putImage(req.params.id, req.file.path)
    .then(({ data }) => res.status(200).json({ ...data, userId: req.params.id }))];

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  editRecipe,
  vaporizeRecipe,
  putImage,
};