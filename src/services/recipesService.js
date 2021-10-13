const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipesModel.create(name, ingredients, preparation, userId);

  return { createdRecipe };
};

const getRecipes = async () => {
  const recipes = await recipesModel.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  
  if (!recipeById) return { message: 'recipe not found' };

  return { recipeById };
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  await recipesModel.updateRecipe(id, name, ingredients, preparation);

  const { recipeById } = await getRecipeById(id);

  // console.log(recipeById);

  return { recipeById };
};

const deleteRecipe = async (id, userId, role) => {
  const { recipeById } = await getRecipeById(id);

  if (!recipeById) return null;

  if (role !== 'admin' || userId !== recipeById.userId) return null;

  const result = await recipesModel.deleteRecipe(id);

  return result;
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
