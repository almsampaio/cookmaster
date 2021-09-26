const recipesModel = require('../models/recipesModel');
const recipeValidations = require('../validations/recipeValidations');

const addRecipe = async (token, { name, ingredients, preparation }) => {
  recipeValidations.validateName(name);
  recipeValidations.validateIngredients(ingredients);
  recipeValidations.validatePreparation(preparation);
  const decoded = recipeValidations.validateToken(token);
  const result = await recipesModel.addRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, result };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return { status: 200, allRecipes };
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  console.log(recipe);
  recipeValidations.recipeExists(recipe);
  return { status: 200, recipe };
};

const editRecipe = async (id, token, { name, ingredients, preparation }) => {
  recipeValidations.validateAuthentication(token);
  recipeValidations.validateToken(token);
  const recipe = await recipesModel.editRecipe(id, name, ingredients, preparation);
  return { status: 200, recipe };
};

const deleteRecipe = async (id, token) => {
  recipeValidations.validateAuthentication(token);
  console.log('service recipes token ', token);
  await recipesModel.deleteRecipe(id);
  return { status: 204 };
};

const addRecipeImage = async (id, token, filename) => {
  recipeValidations.validateAuthentication(token);
  const path = `localhost:3000/src/uploads/${filename}`;
  const result = await recipesModel.addRecipeImage(id, path);
  return { status: 200, result };
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};
