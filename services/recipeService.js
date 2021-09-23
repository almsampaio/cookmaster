const recipeModel = require('../models/recipeModel');

const createNewRecipe = async (recipe, id) => {
  const result = await recipeModel.createRecipe(recipe, id);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipeModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await recipeModel.getRecipeById(id);
  return result;
};

const updateRecipe = async (id, recipe) => {
  const result = await recipeModel.updateRecipe(id, recipe);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await recipeModel.deleteRecipe(id);
  return result;
};

const setImage = async (id, image) => {
  const imageName = `localhost:3000/src/uploads/${image}`;
  const result = await recipeModel.setImage(id, imageName);
  return result;
};

module.exports = { 
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  setImage,
};