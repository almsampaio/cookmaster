const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  recipesModel.createRecipe(name, ingredients, preparation, userId)
);

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) {
    const error = {
      message: 'recipe not found',
      status: 404,
    };
    return { error };
  }
  return recipe;
};

const deleteRecipe = async (id) => recipesModel.deleteRecipe(id);

const editRecipe = async (id, name, ingredients, preparation) => {
  const editedRecipe = await recipesModel.editRecipe(id, name, ingredients, preparation);
  return editedRecipe;
};

module.exports = { 
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
 }; 
