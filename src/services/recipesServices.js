const recipesModel = require('../models/recipesModel');
const validationsR = require('./recipesValidations');

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    const errorMessage = validationsR.validateRecipeId();
    return { errorMessage };
  }
  return { recipe };
};

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  const errorMessage = await validationsR.validateRecipeCreation(name, ingredients, preparation);
  if (errorMessage) return errorMessage;

  const createdRecipe = await recipesModel.createRecipe(recipe, userId);
  return { createdRecipe };
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  await recipesModel.updateRecipe(id, name, ingredients, preparation);
  
  const updatedRecipe = await recipesModel.getRecipeById(id);

  return { updatedRecipe };
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await recipesModel.deleteRecipe(id);
  return deletedRecipe;
};

const uploadImage = async (id, image) => {
  const result = await recipesModel.uploadImage(id, image);
  return { result };
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
