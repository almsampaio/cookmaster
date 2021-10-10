const { ObjectId } = require('mongodb');
const recipes = require('../models/recipesModel');
const recipeSchema = require('../schema/recipesSchema');

const addRecipe = async (recipeInfo) => {
 // console.log(recipeInfo);
  const { error } = recipeSchema.validate(recipeInfo);
  if (error) {
 return {
    err: {
      message: 'Invalid entries. Try again.',
      status: 400,
    },
  }; 
}

  const newRecipe = await recipes.addRecipe(recipeInfo);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipesList = await recipes.getAllRecipes();
  return recipesList;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return { err: { message: 'recipe not found', status: 404 } }; 

  const recipeById = await recipes.getRecipeById(id);

if (!recipeById) return { err: { message: 'recipe not found', status: 404 } }; 

  return recipeById; 
};

const updateRecipe = async (id, newRecipeInfo, userId) => {
  await recipes.updateRecipe(id, newRecipeInfo, userId);

  const updatedRecipe = { _id: id, ...newRecipeInfo, userId };

  return updatedRecipe;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};