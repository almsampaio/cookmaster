const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  recipesModel.createRecipe(name, ingredients, preparation, userId)
);

const getAllRecipes = async () => recipesModel.getAllRecipes();

module.exports = { 
  createRecipe,
  getAllRecipes,
 }; 
