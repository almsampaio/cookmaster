const { ObjectId } = require('mongodb');
const recipesService = require('../services/recipes');
const { successResponses, clientErrors } = require('../utils/httpStatusCodes');

const errorNotFound = { statusCode: clientErrors.notFound, message: 'recipe not found' };

const createRecipe = async (req, res, _next) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  const createdRecipe = await recipesService
    .createRecipe(userId, name, ingredients, preparation);
  res.status(successResponses.created).json(createdRecipe);
};

const getRecipes = async (_req, res, _next) => {
  const recipes = await recipesService.getRecipes();
  return res.status(successResponses.ok).json(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  // Adelino Júnior help me here, I forgot the return on line 28
  // https://github.com/AdelinoJnr

  if (!ObjectId.isValid(id)) {
    return next(errorNotFound);
  }
  const recipe = await recipesService.getRecipeById(id);
  if (!recipe) return next(errorNotFound);
  return res.status(successResponses.ok).json(recipe);
};

const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  if (!ObjectId.isValid(id)) {
    return next(errorNotFound);
  }

  const updatedRecipe = await recipesService.updateRecipe(id, name, ingredients, preparation);

  if (!updatedRecipe) return next(errorNotFound);

  return res.status(successResponses.ok).json(updatedRecipe);
};

const deleteRecipeById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return next(errorNotFound);
  await recipesService.deleteRecipeById(id);

  return res.status(successResponses.noContent).send();
};

const addRecipeImageById = async (req, res, _next) => {
  const { id } = req.params;
  const recipeWithImage = await recipesService.addRecipeImageById(id);
  return res.status(successResponses.ok).json(recipeWithImage);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipeById,
  addRecipeImageById,
};