const Joi = require('joi');

const recipesModel = require('../models/recipes');

const INVALID_ENTRIES = { message: 'Invalid entries. Try again.', status: 400 };
const RECIPE_NOT_FOUND = { message: 'recipe not found', status: 404 };

const validateRecipe = Joi.object({
  name: Joi.string().min(5).required(),
  ingredients: Joi.string().min(5).required(),
  preparation: Joi.string().min(5).required(),
});

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { value, error } = validateRecipe.validate({ name, ingredients, preparation });

  if (error) return { error: INVALID_ENTRIES };

  value.userId = userId;

  const recipe = await recipesModel.createRecipe(value);

  return { result: { recipe } };
};

const getRecipes = async () => {
  const result = await recipesModel.getRecipes();

  return result;
};

const getRecipeById = async (id) => {
  const result = await recipesModel.getRecipeById(id);

  if (!result) return { error: RECIPE_NOT_FOUND };

  return { result };
};

const editRecipeById = async (recipeId, { id, name, ingredients, preparation, role }) => {
  const { value, error } = validateRecipe.validate({ name, ingredients, preparation });

  if (error) return { error: INVALID_ENTRIES };

  const { result: { userId } } = await getRecipeById(recipeId);

  if (userId !== id && role !== 'admin') {
    return { error: INVALID_ENTRIES };
  }

  const result = await recipesModel.editRecipeById(recipeId, value);

  if (!result) return { error: RECIPE_NOT_FOUND };

  return { result };
};

const deleteRecipeById = async (id) => {
  const result = await recipesModel.deleteRecipeById(id);

  if (!result) return { error: RECIPE_NOT_FOUND };

  return { result };
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
};
