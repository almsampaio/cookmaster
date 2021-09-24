const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const NOT_FOUND_STATUS = 404;
const BAD_REQUEST_STATUS = 400;
const CREATED_STATUS = 201;
const OK_STATUS = 200;
const NO_CONTENT_STATUS = 204;

const msg400 = 'Invalid entries. Try again.';
const ERROR_404 = 'recipe not found';

const schemaRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const register = async (recipe, userId) => {
  const validateRecipe = schemaRecipes.validate(recipe);

  if (validateRecipe.error) {
    return { status: BAD_REQUEST_STATUS, result: { message: msg400 } };
  }

  const resultRecipe = await recipesModel
    .recipesSubmit(recipe, userId);

  return {
    status: CREATED_STATUS, result: resultRecipe,
  };
};

const getRecipesServices = async () => {
  const result = await recipesModel.getRecipesModels();
  return {
    status: OK_STATUS, result,
  };
};

const getByIdRecipeServices = async (id) => {
  const result = await recipesModel.getByIdRecipeModels(id);
  if (!result) {
    return { status: NOT_FOUND_STATUS, result: { message: ERROR_404 } };
  }
  return { status: OK_STATUS, result };
};

const editRecipeServices = async (id, newRecipe) => {
  const result = await recipesModel.editRecipeModels(id, newRecipe);
  return { status: OK_STATUS, result };
};

const deleteRecipeServices = async (id) => {
  const result = await recipesModel.delRecipeModels(id);
  return { status: NO_CONTENT_STATUS, result };
};

const addImageServices = async (id, image) => {
  const result = await recipesModel.addImageModels(id, image);
  return { status: OK_STATUS, result };
};

module.exports = {
  register,
  getRecipesServices,
  getByIdRecipeServices,
  editRecipeServices,
  deleteRecipeServices,
  addImageServices,
};
