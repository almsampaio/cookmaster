const models = require('../models');
const { recipeValidation } = require('../schemas');
const { tokenValidation } = require('./tokenValidation');

const { validateId } = require('../schemas');
const { 
  HTTP_OK_STATUS,
  CREATED_STATUS,
  REQUEST_INVALID_ENTRIES,
  NOT_FOUND_RECIPE,
  NO_CONTENT,
} = require('../helpers');

// REQUISITO 3
const createRecipe = async (newRecipe, authorization) => {
  const { error } = recipeValidation.validate(newRecipe);
  if (error) return REQUEST_INVALID_ENTRIES;

  const { status, err, data } = await tokenValidation(authorization);
  if (err) return { status, err };

  const { _id: userId } = data;
  const recipe = newRecipe;
  recipe.userId = userId;

  const addRecipes = await models.recipesModel.createRecipes(recipe);
  return { status: CREATED_STATUS, addRecipes };
};

// REQUISITO 4
const getAllRecipes = async () => {
  const recipes = await models.recipesModel.getAllRecipes();
  return { status: HTTP_OK_STATUS, recipes };
};

// REQUISITO 5

const getRecipeById = async (id) => {
  if (!validateId(id)) return NOT_FOUND_RECIPE;

  const recipe = await models.recipesModel.getRecipeById(id);
  if (!recipe) return NOT_FOUND_RECIPE;

  return { status: HTTP_OK_STATUS, recipe };
};

// REQUISITO 7
const updateRecipe = async (id, recipe, authorization) => {
  const { status, err } = await tokenValidation(authorization);
  if (err) return { status, err };

  const updateRecipes = await models.recipesModel.updateRecipe(id, recipe);

  return { status: HTTP_OK_STATUS, updateRecipes };
};

// REQUISITO 8
const deleteRecipe = async (id, authorization) => {
  const { status, err } = await tokenValidation(authorization);
  if (err) return { status, err };

  const deletedRecipe = await models.recipesModel.deleteRecipe(id);

  if (!deletedRecipe) return { status: NO_CONTENT };
};

module.exports = {
  tokenValidation,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};